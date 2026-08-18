import { API_BASE } from "../hooks/liveMetrics";

const SESSION_KEY = 'gs_admin_session';
const SESSION_DURATION_MS = 30 * 60 * 1000 //min-sec-ms. clears on tab/browser close but with this refreshes after implemented duration

interface StoredSession{
    token: string;
    expiresAt: number;
}
    
export function getAdminToken(): string | null {
    return readSession()?.token ?? null;
}

export function isSessionValid(): boolean {
    return getAdminToken() !== null;
}

export function clearSession(): void {
    sessionStorage.removeItem(SESSION_KEY);
}

function readSession(): StoredSession | null {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if(!raw) return null;

    try{
        const session: StoredSession = JSON.parse(raw);
        if(session.expiresAt <= Date.now()){
            clearSession();
            return null;
        }
        return session;
    }
    catch{
        clearSession();
        return null;
    }

}

export async function loginAdmin( username: string, password: string): Promise<void> {
    const res = await fetch(`${API_BASE}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    if(!res.ok) throw new Error('Invalid username or password');

    const data = await res.json();
    const session: StoredSession = {token: data.token, expiresAt: Date.now() + SESSION_DURATION_MS};
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}