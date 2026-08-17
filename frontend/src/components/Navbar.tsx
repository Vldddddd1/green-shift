import { useState } from "react";
import { Stack, Box, IconButton, Menu, MenuItem } from "@mui/material";
import { useTheme, } from "@mui/material/styles";

import { Link } from "react-router";

import { useColorMode } from "../assets/themes/ThemeProvider";

import BackButton from "../components/BackButton";
import ThemeButton from "./ThemeButton";
import AdminButton from "./AdminButton";

import { BrandColors } from "../assets/themes/colors";

import { Logo } from "./Logo";
import MenuIcon from '../assets/icons/menu.svg?react';

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

    // const menuItemSx = {
    //     fontFamily: 'Sora',
    //     fontSize: '14px',
    //     color: theme.palette.text.primary,
    //     borderRadius: '8px',
    //     margin: '4px',
    //     '&:hover': { backgroundColor: alpha(BrandColors.MainPrimary, 0.14) },
    // }

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
                <IconButton
                    onClick={handleMenuButtonClick}
                    sx={{
                        backgroundColor: BrandColors.MainPrimary,
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                    }}
                >
                    <MenuIcon width={16} height={16} style={{ color: theme.custom.themeIconColor }} />
                </IconButton>
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
                                borderLeft: '3.5px solid transparent',
                                borderRight: '3.5px solid transparent',
                                borderBottom: '3.5px solid transparent',
                                backgroundImage: `linear-gradient(${theme.palette.background.default}, ${theme.palette.background.default}), ${theme.custom.navBorderGradient}`,
                                backgroundOrigin: 'border-box',
                                backgroundClip: 'padding-box, border-box',
                                boxShadow: theme.custom.cardShadow,
                                borderRadius: '12px',
                                transition: 'background-color 0.5s ease, color 0.5s ease',
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