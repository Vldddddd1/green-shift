import { useState } from 'react';
import { Stack, Box, Typography, IconButton, Drawer } from '@mui/material';
import { useTheme, alpha } from '@mui/material';
import { NavLink } from 'react-router';

import { Logo } from '../Logo';

import BackButton from '../BackButton';
import ThemeButton from '../ThemeButton';
import DashboardButton from '../DashboardButton';
import MenuIcon from "../../assets/icons/menu.svg?react";

import { BrandColors, regionMarkerStates } from '../../assets/themes/colors';
import { useLiveMetricsContext } from '../../hooks/liveMetrics';

interface NavItem {
    label: string;
    to: string;
}

const MONITORING_ITEMS: NavItem[] = [
    { label: 'Overview', to: '/admin' },
    { label: 'Regions', to: '/admin/regions' },
    { label: 'Simulation', to: '/admin/simulation' },
];

const SYSTEM_ITEMS: NavItem[] = [
    { label: 'Settings', to: '/admin/settings' },
];

function SectionLabel({ children }: { children: string }) {
    const theme = useTheme();

    return (
        <Typography sx={{
            width: '100%',
            fontFamily: 'Sora',
            fontWeight: 600,
            fontSize: '11px',
            letterSpacing: '1px',
            color: theme.palette.text.secondary,
            textTransform: 'uppercase'
        }}>
            {children}
        </Typography>
    );
}

function SidebarNavItem({ label, to, onNavigate }: NavItem & { onNavigate?: () => void }) {
    const theme = useTheme();

    return (
        <Box
            component={NavLink}
            to={to}
            end={to === '/admin'}
            onClick={onNavigate}
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                height: '44px',
                borderRadius: '10px',
                padding: '11px 16px',
                borderLeft: '3px solid transparent',
                textDecoration: 'none',
                '&.active': {
                    backgroundColor: alpha(BrandColors.MainPrimary, 0.14),
                    borderLeftColor: BrandColors.MainPrimary,
                },
            }}
        >
            <Box sx={
                (theme) => ({
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: theme.custom.adminSidebarMutedText,
                    '.active &': { backgroundColor: BrandColors.MainPrimary },
                })
            } />
            <Typography sx={{
                fontFamily: 'Sora',
                fontWeight: 600,
                fontSize: '16px',
                color: theme.custom.adminSidebarMutedText,
                '.active &': { color: theme.palette.text.primary }
            }}>
                {label}
            </Typography>
        </Box>
    )
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
    const theme = useTheme();

    const { connected } = useLiveMetricsContext();
    const apiStatus: 'online' | 'offline' = connected ? 'online' : 'offline';

    return (
        <Stack
            sx={{
                width: theme.fluid.sidebarWidth,
                height: '100%',
                alignItems: 'center',
                gap: '4px',
                paddingTop: '28px',
                paddingBottom: '24px',
                paddingX: '20px',
                backgroundColor: theme.custom.adminSidebarBackground,
                borderRight: `1px solid ${theme.custom.adminSidebarBorder}`,
                transition: 'background-color 0.5s ease, color 0.5s ease',
            }}>
            <Box sx={{
                height: '35px',
                '& svg': { height: '100%', width: 'auto' }
            }}>
                <Logo />
            </Box>

            <Stack
                direction='row'
                sx={{
                    width: '100%',
                    height: '65px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                }}>
                <BackButton />
                <ThemeButton />
                <DashboardButton />
            </Stack>

            <Typography sx={{
                width: '100%',
                fontFamily: 'Sora',
                fontWeight: 600,
                fontSize: '11px',
                letterSpacing: '1.2px',
                color: theme.custom.adminSidebarMutedText,
                textTransform: 'uppercase',
            }}>
                Admin Console
            </Typography>

            <Box sx={{ height: '18px', width: '100%' }} />

            <SectionLabel>
                Montioring
            </SectionLabel>

            <Box sx={{
                height: '8px',
                width: '100%',
            }} />

            <Stack sx={{
                width: '100%',
                gap: '4px',
            }}>
                {MONITORING_ITEMS.map((item) => (
                    <SidebarNavItem key={item.to} {...item} onNavigate={onNavigate} />
                ))}
            </Stack>

            <Box sx={{ height: '22px', width: '100%' }} />

            <SectionLabel>
                System
            </SectionLabel>

            <Box sx={{
                height: '8px',
                width: '100%',
            }} />

            <Stack sx={{
                width: '100%',
                gap: '4px',
            }}>
                {SYSTEM_ITEMS.map((item) => (
                    <SidebarNavItem key={item.to} {...item} />
                ))}
            </Stack>

            <Box sx={{ flexGrow: 1 }} />

            <Stack
                direction='row'
                sx={{
                    width: '100%',
                    alignItems: 'center',
                    gap: '8px',
                }}
            >
                <Box sx={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: apiStatus === 'online' ? regionMarkerStates.active.fill : regionMarkerStates.offline.fill
                }} />
                <Typography sx={{
                    fontFamily: 'Sora',
                    fontSize: '12px',
                    color: theme.custom.adminSidebarMutedText
                }}>
                    API connection {apiStatus === 'online' ? 'healthy' : 'unavailable'}
                </Typography>
            </Stack>
        </Stack>
    );
}

function AdminNavbar() {
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            {/* DESKTOP + TABLET */}
            <Box sx={{
                display: { xs: 'none', sm: 'block' },
                position: 'fixed',
                top: 0,
                left: 0,
                bottom: 0,
                width: theme.fluid.sidebarWidth,
                zIndex: 9000,
                borderRight: `1px solid ${theme.custom.adminSidebarBorder}`,
                transition: 'background-color 0.5s ease, color 0.5s ease',
            }}>
                <SidebarContent />
            </Box>

            {/* MOBILE */}
            <Stack
                direction='row'
                sx={{
                    display: { xs: 'flex', sm: 'none' },
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: theme.fluid.navbarHeight,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingX: theme.fluid.edgeOffset,
                    borderLeft: '3.5px solid transparent',
                    borderRight: '3.5px solid transparent',
                    borderBottom: '3.5px solid transparent',
                    backgroundImage: `linear-gradient(${theme.palette.background.default}, ${theme.palette.background.default}), ${theme.custom.navBorderGradient}`,
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box',
                    transition: 'background-color 0.5s ease, color 0.5s ease',
                    borderBottomLeftRadius: '32px',
                    borderBottomRightRadius: '32px',
                    zIndex: 9000,
                }}>
                <BackButton />

                <Box sx={{
                    height: '28px',
                    '& svg': {
                        height: '100%',
                        width: 'auto',
                    }
                }}>
                    <Logo />
                </Box>

                <IconButton
                    onClick={() => setMobileOpen(true)}
                    sx={{
                        backgroundColor: BrandColors.MainPrimary,
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                    }}>
                    <MenuIcon
                        width={16}
                        height={16}
                        style={{
                            color: theme.custom.themeIconColor,
                        }}
                    />
                </IconButton>
            </Stack>

            <Drawer
                anchor='left'
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                sx={{
                    zIndex: 9999,
                }}
                slotProps={{
                    paper: {
                        sx: {
                            backgroundColor: theme.custom.adminSidebarBackground,
                            backgroundImage: 'none',
                        }
                    }
                }}>
                <SidebarContent onNavigate={() => setMobileOpen(false)} />
            </Drawer>
        </>
    )

}

export default AdminNavbar;