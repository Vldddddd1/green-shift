import { useEffect, useState, } from 'react';

export type APIStatus = 'healthy' | 'degraded' | 'offline';

export interface ServerStatus{
    id: string;
    region: string;
    online: boolean;
    isActive: boolean;
    carbonIntensity: number | null; //gCO2/kWh
}

export interface RouteSwitch{
    id: string;
    time: string; // "hh:mm"
    region: string;
}

export interface LiveMetricsPayload{
    servers: ServerStatus[];
    carbonSavedKg: number | null;
    savingsMultiplier: number | null;
    apiHealth: APIStatus | null;
    lastUpdate: string | null;
    recentSwitches: RouteSwitch[];
}

export interface LiveMetrics{
    activeRegion: string | null;
    carbonSavedKg: number | null;
    savingsMultiplier: number | null;
    apiHealth: APIStatus | null;
    lastUpdate: string | null;
    recentSwitches: RouteSwitch[];
}

const INITIAL_METRICS: LiveMetrics = {
    activeRegion: null,
    carbonSavedKg: null,
    savingsMultiplier: null,
    apiHealth: null,
    lastUpdate: null,
    recentSwitches: [],
}


//SINGLE SOURCE OF TRUTH - ONLY PLACE LOGIC LIVES!!
function toLiveMetrics(payload: LiveMetricsPayload) : LiveMetrics {
    const active = payload.servers.find(server => server.isActive);

    return {
        activeRegion: active?.region ?? null,
        carbonSavedKg: payload.carbonSavedKg,
        savingsMultiplier: payload.savingsMultiplier,
        apiHealth: payload.apiHealth,
        lastUpdate: payload.lastUpdate,
        recentSwitches: payload.recentSwitches,
    };
}

export function useLiveMetrics(): {metrics: LiveMetrics; connected: boolean} {
    const [metrics, setMetrics] = useState<LiveMetrics>(INITIAL_METRICS);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        //TODO WIRE BACKEND-FRONTEND!!!!! 
    }, []);

    return {metrics, connected, };
}