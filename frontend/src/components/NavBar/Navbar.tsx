import Stack from "@mui/material/Stack";

import { useTheme } from "@mui/material/styles";

import LogoDark from "../../assets/logos/mainLogoDark.svg?react";
import LogoLight from "../../assets/logos/mainLogoLight.svg?react";

import BackButton from "../../components/NavBar/BackButton";
import ThemeButton from "./ThemeButton";
import { BackgroundColors } from "../../assets/themes/colors";

function Navbar() {
    const theme = useTheme();

    const Logo = theme.palette.mode === 'dark' ? LogoDark : LogoLight;


    return (
        <Stack direction="row" sx={{
            width: '35%',
            maxWidth: theme.fluid.elementMaxWidth,
            height: theme.fluid.navbarHeight,

            position: 'fixed',
            top: 0,
            right: 0,
            paddingLeft: theme.fluid.edgeOffset,
            paddingRight: '40px',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 1000,

            backgroundColor: theme.palette.mode === 'dark' ? BackgroundColors.DarkThemeBackground : BackgroundColors.LightThemeBackground,
            borderLeft: theme.palette.mode === 'dark' ? '3.5px solid rgba(0, 0, 0, 0.75)' : '3.5px solid rgba(255, 255, 255, 0.75)',
            borderRight: theme.palette.mode === 'dark' ? '3.5px solid rgba(0, 0, 0, 0.75)' : '3.5px solid rgba(255, 255, 255, 0.75)',
            borderBottom: theme.palette.mode === 'dark' ? '3.5px solid rgba(0, 0, 0, 0.75)' : '3.5px solid rgba(255, 255, 255, 0.75)',
            borderBottomLeftRadius: '32px',
            borderBottomRightRadius: '32px',
        }}>
            <Stack direction='row' sx={{
                alignItems: 'center',
                gap: '12px',
            }}>
                <BackButton />
                <ThemeButton />
            </Stack>
            <Logo sx={{ height: '60%' }} />
        </Stack>
    )
};

export default Navbar;