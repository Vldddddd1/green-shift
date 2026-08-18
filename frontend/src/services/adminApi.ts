import { API_BASE } from "../hooks/liveMetrics";
import { getAdminToken } from "./authSession";

function authHeaders(): Record<string, string>{
    const token = getAdminToken();
    if(!token) throw new Error("Admin session expired. Sign in again");
    return { Authorization: `Bearer ${token}` };
}

async function postAdmin<T>(path: string, body: unknown): Promise<T> {
    const res = await fetch(`${API_BASE}/admin/${path}`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            ...authHeaders(),
        },
        body: JSON.stringify(body),
    });
    if(!res.ok) throw new Error(`Failed to POST ${path}`);
    return res.json();
}

export interface SimulateResult{
    simulated: number;
    results: {zone: string; server: string}[];
}

export function simulateRequests(count: number, zone: string): Promise<SimulateResult>{
    return postAdmin('simulate', {count, zone});
}

export function resetSimulation(): Promise<{status: string}> {
    return postAdmin('reset', {});
}

async function patchAdmin(path: string, body: unknown): Promise<void> {
    const res = await fetch(`${API_BASE}/admin/${path}`,{
        method: 'PATCH',
        headers:{
            'Content-Type': 'application/json',
            ...authHeaders(),
        },
        body: JSON.stringify(body),
    });
    if(!res.ok) throw new Error(`Failed to update ${path}`);
}

export function updateCarbonScore(zone: string, server: string, carbon_score: number) {
    return patchAdmin('carbon-score', { zone, server, carbon_score });
}

export function updateLoad(zone: string, server: string, current_load: number) {
    return patchAdmin('load', { zone, server, current_load });
}

export function updateLatency(zone: string, server: string, latency: number) {
    return patchAdmin('latency', { zone, server, latency });
}

export function updateStatus(zone: string, server: string, status: string) {
    return patchAdmin('status', { zone, server, status });
}

export function releaseOverride(zone: string, server: string, status: string): Promise<{status: string}> {
    return postAdmin('release-override', { zone, server, status });
}
