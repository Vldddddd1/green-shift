import { Box } from '@mui/material';
import { useTheme } from '@mui/material';
import { Outlet } from 'react-router';

import AdminNavbar from '../../components/AdminPanel/AdminNavbar';

function AdminPage(){
    const theme = useTheme();

    return(
        <>
            <AdminNavbar/>
            <Box sx={{ marginLeft: theme.fluid.sidebarWidth}}>
                <Outlet/>
            </Box>
        </>
    )
}

export default AdminPage;