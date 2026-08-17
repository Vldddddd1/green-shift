import { useTheme, } from "@mui/material";
import RoundedIconButton from "./RoundedIconButton";
import DashboardIcon from "../assets/icons/dashboard.svg?react";

function DashboardButton(){
    const theme = useTheme();

    return(
        <RoundedIconButton
            to = '/dashboard'
            icon = {<DashboardIcon width = {16} height = {16} style = {{color: theme.custom.backIconColor}}/>}
        />
    );
}

export default DashboardButton;