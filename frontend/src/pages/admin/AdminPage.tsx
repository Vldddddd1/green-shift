import { Box } from '@mui/material';
import { useTheme } from '@mui/material';
import { Outlet } from 'react-router';

import AdminNavbar from '../../components/AdminPanel/AdminNavbar';
import { LiveMetricsProvider } from '../../hooks/LiveMetricsProvider';

function AdminPage(){
    const theme = useTheme();

    return(
        <LiveMetricsProvider>
            <AdminNavbar/>
            <Box sx={{ 
                minHeight: '100svh',
                marginLeft: {xs: 0, sm: theme.fluid.sidebarWidth},
                paddingTop: {xs: theme.fluid.navbarHeight, sm: 0},
            }}>
                <Outlet/>
            </Box>
        </LiveMetricsProvider>
    )
}

export default AdminPage;