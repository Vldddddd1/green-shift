import { useState } from "react";
import { Stack, Box, Menu, MenuItem } from "@mui/material";
import { useTheme, } from "@mui/material/styles";

import { Link } from "react-router";

import { useColorMode } from "../assets/themes/ThemeProvider";

import BackButton from "../components/BackButton";
import ThemeButton from "./ThemeButton";
import AdminButton from "./AdminButton";


import { Logo } from "./Logo";
import MenuIcon from '../assets/icons/menu.svg?react';
import RoundedIconButton from "./RoundedIconButton";
import { gradientBorderSx, gradientTopBarSx } from "../assets/themes/sharedStyles";

interface NavbarProps {
    onToggleOverview?: () => void;
}

function Navbar({ onToggleOverview }: NavbarProps) {
    const theme = useTheme();
    const { toggleColorMode } = useColorMode();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const closeMenu = () => setAnchorEl(null);

    const handleMenuButtonClick = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(prev => (prev ? null : e.currentTarget));
    };

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
            justifyContent: { xs: 'space-between', md: 'none' },
            gap: '12px',
            zIndex: 10000,
            touchAction: 'none',
            ...gradientTopBarSx(theme),
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

            {/* //DESKTOP + TABLET*/}
            <Box sx={{
                order: { xs: 2, md: 1 },
                marginRight: 0,
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                gap: '12px',
            }}>
                <ThemeButton />
                <AdminButton />
            </Box>

            {/* //MOBILE */}
            <Box sx={{
                order: { xs: 2, md: 1 },
                display: { xs: 'flex', md: 'none' },
                zIndex: 10000,
            }}>
                <RoundedIconButton
                    onClick={handleMenuButtonClick}
                    icon = {<MenuIcon width={16} height={16} style={{ color: theme.custom.themeIconColor }} />}
                />

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={closeMenu}
                    sx = {{
                        zIndex: 10000,
                    }}
                    slotProps={{
                        paper: {
                            sx: {
                                marginTop: '8px',
                                minWidth: '200px',
                                ...gradientBorderSx(theme),
                                boxShadow: theme.custom.cardShadow,
                                borderRadius: '12px',
                            }
                        }
                    }}>
                    <MenuItem onClick={() => { toggleColorMode(); closeMenu(); }}>
                        Toggle Theme
                    </MenuItem>
                    <MenuItem component={Link} to='/admin' onClick={closeMenu}>
                        Admin Panel
                    </MenuItem>
                    <MenuItem onClick={() => { onToggleOverview?.(); closeMenu(); }}>
                        Live Routing Overview
                    </MenuItem>
                </Menu>
            </Box>
        </Stack>
    )
};

export default Navbar;