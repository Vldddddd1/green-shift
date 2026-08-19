import { useCallback, useEffect, useState, createContext, useContext } from "react";
import { isSessionValid, clearSession, loginAdmin } from "../services/authSession";

const SESSION_CHECK_INTERVAL_MS = 15 * 1000;

export function useAuthSessionState(){
    const [isAuthenticated, setIsAuthenticated] = useState(isSessionValid);

    useEffect(() => {
        const interval = setInterval(() => setIsAuthenticated(isSessionValid()), SESSION_CHECK_INTERVAL_MS);
        return () => clearInterval(interval);
    }, []);

    const login = useCallback(async (username: string, password: string) => {
        await loginAdmin(username, password);
        setIsAuthenticated(true);
    }, []);

    const logout = useCallback(() => {
        clearSession();
        setIsAuthenticated(false);
    }, []);

    return {isAuthenticated, login, logout};
}

export const AuthContext = createContext<ReturnType <typeof useAuthSessionState> | null>(null);

export function useAuthContext(){
    const ctx = useContext(AuthContext);
    if(!ctx) throw new Error("useAuthContext must be used within an AuthProvider");
    return ctx;
}