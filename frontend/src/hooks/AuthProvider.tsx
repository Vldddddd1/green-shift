import { useAuthSessionState, AuthContext } from "./useAuthSession";

export function AuthProvider({ children }: { children: React.ReactNode}){
    const value = useAuthSessionState();
    return(
        <AuthContext.Provider value = {value}>
            {children}
        </AuthContext.Provider>
    )
}