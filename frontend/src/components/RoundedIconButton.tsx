import type { ReactNode, MouseEvent } from "react";
import { Button, IconButton } from "@mui/material";
import { Link } from "react-router";
import { BrandColors } from "../assets/themes/colors";

interface RoundedIconButtonProps {
    icon: ReactNode;
    to?: string;
    onClick?: (e: MouseEvent<HTMLElement>) => void;
}

const roundSx = {
    backgroundColor: BrandColors.MainPrimary,
    minWidth: 0,
    width: '32px',
    height: '32px',
    padding: 0,
    borderRadius: '50%',
};

function RoundedIconButton({ icon, to, onClick}: RoundedIconButtonProps){
    if(to){
        return(
            <Button
                variant = "contained"
                component = {Link}
                to = {to}
                sx = {roundSx}
            >
                {icon}
            </Button>
        );
    }
    return(
        <IconButton
            onClick = {onClick}
            sx = {roundSx}
        >
            {icon}
        </IconButton>
    );
}

export default RoundedIconButton;