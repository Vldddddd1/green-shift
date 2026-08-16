import { API_BASE } from "../hooks/liveMetrics";

let cachedToken: string | null = null;

export async function getAdminToken(): Promise<string> {
    if(cachedToken) return cachedToken;
    const res = await fetch(`${API_BASE}/admin/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: 'admin', password: 'greenshift2026'}),
    });

    if(!res.ok) throw new Error('Admin login unsuccessful');
    const data = await res.json();
    cachedToken = data.token;
    return cachedToken!;
}

async function postAdmin<T>(path: string, body: unknown): Promise<T> {
    const token = await getAdminToken();
    const res = await fetch(`${API_BASE}/admin/${path}`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
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
    const token = await getAdminToken();
    const res = await fetch(`${API_BASE}/admin/${path}`,{
        method: 'PATCH',
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });
    if(!res.ok) throw new Error(`Failed to update ${path}`);
}

export function updateCarbonScore(zone: string, server: string, carbon_score: number) {
    return patchAdmin('carbon-score', { zone, server, carbon_score });
}