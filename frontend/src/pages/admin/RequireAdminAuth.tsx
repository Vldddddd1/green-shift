import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuthContext } from "../../hooks/useAuthSession";

function RequireAdminAuth({ children }: {children: ReactNode}) {
    const { isAuthenticated } = useAuthContext();
    const location = useLocation();

    if(!isAuthenticated){
        return <Navigate to = '/admin/login' replace state = {{from: location.pathname}}/>;
    }

    return <>
        {children}
    </>
}

export default RequireAdminAuth;