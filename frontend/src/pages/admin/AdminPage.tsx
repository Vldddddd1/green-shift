import { Box } from '@mui/material';
import { useTheme } from '@mui/material';
import { Outlet } from 'react-router';

import AdminNavbar from '../../components/AdminPanel/AdminNavbar';
import { LiveMetricsProvider } from '../../hooks/LiveMetricsProvider';

function AdminPage(){
    const theme = useTheme();

    return(
        <LiveMetricsProvider>
            <Box sx={{
                display: {xs: 'block', sm: 'flex'},
                height: '100svh',
                overflow: 'hidden',
            }}>
                <AdminNavbar/>
                <Box sx={{ 
                    flex: {sm: '1 1 0'},
                    minWidth: 0,
                    height: '100%',
                    overflowY: 'auto',
                    overscrollBehaviorY: 'contain',
                    paddingTop: {xs: theme.fluid.navbarHeight, sm: 0},
                }}>
                    <Outlet/>
                </Box>
            </Box>
        </LiveMetricsProvider>
    )
}

export default AdminPage;