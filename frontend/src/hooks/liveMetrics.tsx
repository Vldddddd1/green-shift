import { useEffect, useRef, useState, createContext, useContext } from 'react';

const API_BASE = 'http://127.0.0.1:8000';
const POLL_INTERVAL_MS = 3000;
const MAX_RECENT_SWITCHES = 5;

export type APIStatus = 'healthy' | 'degraded' | 'offline';

interface ServerData {
    carbon_score: number;
    current_load: number;
    latency: number;
    status: string;
    last_selected: string | null;
}

export interface ServerStatus {
    id: string;
    region: string;
    online: boolean;
    isActive: boolean;
    carbonIntensity: number | null; //gCO2/kWh
    requests: number | null;
    percent: number | null;
    lastSelected: string | null;
}

export interface RouteSwitch {
    id: string;
    time: string; // "hh:mm"
    region: string;
}

export interface LiveMetricsPayload {
    servers: ServerStatus[];
    carbonSavedKg: number | null;
    savingsMultiplier: number | null;
    apiHealth: APIStatus | null;
    lastUpdate: string | null;
    recentSwitches: RouteSwitch[];
    totalRequests: number | null;
    averageLatencyMs: number | null;
    carbonReductionPercent: number | null;
}

export interface LiveMetrics {
    activeRegion: string | null;
    servers: ServerStatus[];
    carbonSavedKg: number | null;
    savingsMultiplier: number | null;
    apiHealth: APIStatus | null;
    lastUpdate: string | null;
    recentSwitches: RouteSwitch[];
    totalRequests: number | null;
    averageLatencyMs: number | null;
    carbonReductionPercent: number | null;
}

const INITIAL_METRICS: LiveMetrics = {
    activeRegion: null,
    servers: [],
    carbonSavedKg: null,
    savingsMultiplier: null,
    apiHealth: null,
    lastUpdate: null,
    recentSwitches: [],
    totalRequests: null,
    averageLatencyMs: null,
    carbonReductionPercent: null,
}


//SINGLE SOURCE OF TRUTH - ONLY PLACE LOGIC LIVES!!
function toLiveMetrics(payload: LiveMetricsPayload): LiveMetrics {
    const active = payload.servers.find(server => server.isActive);

    return {
        activeRegion: active?.region ?? null,
        servers: payload.servers,
        carbonSavedKg: payload.carbonSavedKg,
        savingsMultiplier: payload.savingsMultiplier,
        apiHealth: payload.apiHealth,
        lastUpdate: payload.lastUpdate,
        recentSwitches: payload.recentSwitches,
        totalRequests: payload.totalRequests,
        averageLatencyMs: payload.averageLatencyMs,
        carbonReductionPercent: payload.carbonReductionPercent,
    };
}

interface ServerData {
    carbon_score: number;
    current_load: number;
    latency: number;
    status: string;
}

interface CarbonZonesResponse {
    zones: Record<string, Record<string, ServerData>>;
}

interface RouteApiResponse {
    selected_zone: string;
    selected_server: string;
    server_response: Record<string, unknown>;
    carbon_saved_kg: number;
    savings_multiplier: number;
}

interface StatsApiResponse {
    total_requests: number;
    requests_per_zone: Record<string, number>;
    requests_per_server: Record<string, number>;
    co2_saved: number;
    average_latency_ms: number | null;
    carbon_reduction_percent: number | null;
}

function formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function serversFromCarbonResponse(carbonData: CarbonZonesResponse, selectedServer: string, requestsPerServer: Record<string, number> = {}, totalRequests: number = 0): ServerStatus[] {
    return Object.entries(carbonData.zones).flatMap(([zoneName, zoneServers]) =>
        Object.entries(zoneServers).map(([serverId, data]) => {
            const requests = requestsPerServer[serverId] ?? 0;
            return {
                id: serverId,
                region: zoneName,
                online: data.status === 'online',
                isActive: serverId === selectedServer,
                carbonIntensity: data.carbon_score,
                requests,
                percent: totalRequests > 0 ? Math.round((requests / totalRequests) * 1000) / 10 : 0,
                lastSelected: data.last_selected ? formatTime(new Date(data.last_selected)) : null,
            };
        })
    );
}

export function onlineAzCountByRegion(servers: ServerStatus[]): Record<string, number> {
    return servers.reduce<Record<string, number>>((acc, s) => {
        if (s.online) acc[s.region] = (acc[s.region] ?? 0) + 1;
        return acc;
    }, {});
}

export function useLiveMetrics(): { metrics: LiveMetrics; connected: boolean } {
    const [metrics, setMetrics] = useState<LiveMetrics>(INITIAL_METRICS);
    const [connected, setConnected] = useState(false);

    const lastZoneRef = useRef<string | null>(null);
    const switchesRef = useRef<RouteSwitch[]>([]);

    useEffect(() => {
        let cancelled = false;

        const poll = async () => {
            let carbonRes: Response;
            let routeRes: Response;
            let statsRes: Response;

            try {
                [carbonRes, routeRes, statsRes] = await Promise.all([
                    fetch(`${API_BASE}/servers`),
                    fetch(`${API_BASE}/route`),
                    fetch(`${API_BASE}/stats`),
                ]);
            } catch {
                if (cancelled) return;
                setConnected(false);
                setMetrics(prev => ({ ...prev, apiHealth: 'offline' }));
                return;
            }

            if (cancelled) return;

            if (!carbonRes.ok || !routeRes.ok || !statsRes.ok) {
                setConnected(false);
                setMetrics(prev => ({ ...prev, apiHealth: 'degraded' }));
                return;
            }

            const carbonData: CarbonZonesResponse = await carbonRes.json();
            const routeData: RouteApiResponse = await routeRes.json();
            const statsData: StatsApiResponse = await statsRes.json();

            if (cancelled) return;

            const servers = serversFromCarbonResponse(carbonData, routeData.selected_server, statsData.requests_per_server, statsData.total_requests);

            if (lastZoneRef.current !== null && lastZoneRef.current !== routeData.selected_zone) {
                switchesRef.current = [
                    { id: `${Date.now()}`, time: formatTime(new Date()), region: routeData.selected_zone },
                    ...switchesRef.current,
                ].slice(0, MAX_RECENT_SWITCHES);
            }
            lastZoneRef.current = routeData.selected_zone;

            setMetrics(toLiveMetrics({
                servers,
                carbonSavedKg: routeData.carbon_saved_kg,
                savingsMultiplier: routeData.savings_multiplier,
                apiHealth: 'healthy',
                lastUpdate: formatTime(new Date()),
                recentSwitches: switchesRef.current,
                totalRequests: statsData.total_requests, // null - nu sunt trimise de backend inca
                averageLatencyMs: statsData.average_latency_ms,
                carbonReductionPercent: statsData.carbon_reduction_percent,
            }));
            setConnected(true);
        };

        poll();
        const interval = setInterval(poll, POLL_INTERVAL_MS);

        return () => {
            cancelled = true;
            clearInterval(interval);
        };
    }, []);

    return { metrics, connected, };
}

const LiveMetricsContext = createContext<{ metrics: LiveMetrics; connected: boolean } | null>(null);

export function LiveMetricsProvider({ children }: { children: React.ReactNode }) {
    const value = useLiveMetrics();
    return (
        <LiveMetricsContext.Provider value={value}>
            {children}
        </LiveMetricsContext.Provider>
    );
}

export function useLiveMetricsContext() {
    const ctx = useContext(LiveMetricsContext);
    if (!ctx) throw new Error('useLiveMetricsContext must be used within a LiveMetricsProvider');
    return ctx;
}