import { Stack, Box, Typography } from '@mui/material';
import { useTheme, alpha } from '@mui/material';
import { NavLink } from 'react-router';

import { Logo } from '../Logo';

import BackButton from '../BackButton';
import ThemeButton from '../ThemeButton';

import { BrandColors, regionMarkerStates } from '../../assets/themes/colors';
import { use } from 'react';

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

function SidebarNavItem({ label, to }: NavItem) {
    const theme = useTheme();

    return (
        <Box
            component={NavLink}
            to={to}
            end={to === '/admin'}
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

function AdminNavbar() {
    const theme = useTheme();

    const apiStatus: 'online' | 'offline' = 'online';

    return (
        <Stack
            sx={{
                width: theme.fluid.sidebarWidth,
                height: '100svh',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 9000,
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
                    <SidebarNavItem key={item.to} {...item} />
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

            <Box sx={{ flexGrow: 1 }}/>

            <Stack 
            direction = 'row' 
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
                }}/>
                <Typography sx={{
                    fontFamily: 'Sora',
                    fontSize: '12px',
                    color: theme.custom.adminSidebarMutedText
                }}>
                    API connection {apiStatus === 'online' ? 'healthy' : 'unavailable'}
                </Typography>
            </Stack>
        </Stack>
    )
}

export default AdminNavbar;