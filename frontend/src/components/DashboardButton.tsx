import { useTheme, Button } from "@mui/material";
import { Link } from "react-router";

import { BrandColors } from "../assets/themes/colors";

import DashboardIcon from "../assets/icons/dashboard.svg?react";

function DashboardButton(){
    const theme = useTheme();

    return(
        <Button 
            variant = 'contained'
            component = {Link}
            to = '/dashboard'
            sx = {{
                backgroundColor: BrandColors.MainPrimary,
                minWidth: 0,
                width: '32px',
                height: '32px',
                padding: 0,
                borderRadius: '50%',
        }}>
            <DashboardIcon width = {16} height = {16} style = {{color: theme.custom.backIconColor}}/>
        </Button>
    );
}

export default DashboardButton;