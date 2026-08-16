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
            <Box sx={{ marginLeft: theme.fluid.sidebarWidth}}>
                <Outlet/>
            </Box>
        </LiveMetricsProvider>
    )
}

export default AdminPage;