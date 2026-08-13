import { Stack, Box } from "@mui/material";

import { useTheme } from "@mui/material/styles";

import { Logo } from "../Logo";
import BackButton from "../../components/NavBar/BackButton";
import ThemeButton from "./ThemeButton";

function Navbar() {
    const theme = useTheme();

    return (
        <Stack direction="row" sx={{
            width: { xs: '100%', md: '35%' },
            maxWidth: { xs: 'none', md: theme.fluid.elementMaxWidth },
            height: theme.fluid.navbarHeight,

            position: 'fixed',
            top: { xs: 0, md: 0 },
            right: 0,
            paddingLeft: theme.fluid.edgeOffset,
            paddingRight: { xs: theme.fluid.edgeOffset, md: '40px' },
            alignItems: 'center',
            justifyContent: {xs: 'space-between', md: 'none'},
            gap: '12px',
            zIndex: 9000,

            borderLeft: '3.5px solid transparent',
            borderRight: '3.5px solid transparent',
            borderBottom: '3.5px solid transparent',
            backgroundImage: `linear-gradient(${theme.palette.background.default}, ${theme.palette.background.default}), ${theme.custom.navBorderGradient}`,
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
            transition: 'background-color 0.5s ease, color 0.5s ease',
            borderBottomLeftRadius: '32px',
            borderBottomRightRadius: '32px',
        }}>
            <BackButton />

            <Box sx={{
                order: { xs: 1, md: 2 },
                marginLeft: { xs: 0, md: 'auto' },
                height: { xs: '28px', md: '32px' },
                '& svg': { height: '100%', width: 'auto' },
            }}>
                <Logo />
            </Box>

            <Box sx={{ order: { xs: 2, md: 1 }, marginRight: 0 }}>
                <ThemeButton />
            </Box>
        </Stack>
    )
};

export default Navbar;