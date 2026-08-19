import {Box, Stack, useTheme} from '@mui/material';
import { Navigate, useLocation, useNavigate } from 'react-router';

import { Logo } from '../../components/Logo';
import LoginCard from '../../components/AdminPanel/LoginCard';
import { useAuthContext } from '../../hooks/useAuthSession';

function AdminLoginPage(){
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const {isAuthenticated, login} = useAuthContext();

    if(isAuthenticated){
        const redirectTo = (location.state as { from?: string } | null)?.from ?? '/admin';
        return <Navigate to = {redirectTo} replace/>
    }

    async function handleLogin(username: string, password: string){
        await login(username, password);
        navigate('/admin', {replace: true});
    }

    return(
        <Stack sx={{
            minHeight: '100svh',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '32px',
            backgroundColor: theme.palette.background.default,
            padding: theme.fluid.edgeOffset,
        }}>
            <Box sx = {{
                height: '35px',
                '& svg': {
                    height: '100%', 
                    width: 'auto'}
            }}>
                <Logo/>
            </Box>

            <LoginCard onLogin={handleLogin}/>
        </Stack>
    )
}

export default AdminLoginPage;