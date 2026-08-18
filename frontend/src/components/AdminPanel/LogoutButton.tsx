import { Box, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../hooks/useAuthSession";

function LogoutButton(){
    const theme = useTheme();
    const navigate = useNavigate();
    const { logout } = useAuthContext();
    
    function handleClick(){
        logout();
        navigate('/admin/login', {replace: true});
    }

    return(
        <Box
            component = "button"
            onClick = {handleClick}
            sx = {{
                width: '100%',
                marginTop: '16px',
                padding: '10px, 16px',
                borderRadius: '10px',
                border: `1px solid ${theme.custom.adminSidebarBorder}`,
                backgroundColor: 'transparent',
                cursor: 'pointer',
                textAlign: 'center',
        }}>
            <Typography sx = {{
                fontWeight: 600,
                fontSize: '14px',
                color: theme.custom.adminSidebarMutedText,
            }}>
                Log out
            </Typography>
        </Box>
    );
}

export default LogoutButton;