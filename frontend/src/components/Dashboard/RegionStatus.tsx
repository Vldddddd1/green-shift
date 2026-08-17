import { forwardRef, } from 'react';

import { Stack, Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { TextColors, regionMarkerStates } from '../../assets/themes/colors';

import type { RegionMarkerState } from '../../assets/themes/colors';

const LEGEND_CONFIG: {label: string; state: RegionMarkerState}[] = [
    { label: 'Active - Routing Now', state: 'active' },
    { label: 'Available - Standby', state: 'available' },
    { label: 'Unavailable', state: 'unavailable' },
    { label: 'Offline / Error', state: 'offline' },
] as const;

interface RegionStatusProps {
    top: number;
    left: number;
}

function StatusDot({ state, size = '12px' }: { state: RegionMarkerState; size?: string }) {
    const { fill, stroke } = regionMarkerStates[state];
    
    return (
        <Box sx={{
            width: size,
            height: size,
            borderRadius: '50%',
            backgroundColor: fill,
            border: `2px solid ${stroke}`,
            boxSizing: 'border-box',
            flexShrink: 0,
        }} />
    )
}

function LegendRow({ label, state, dotSize }: { label: string; state: RegionMarkerState; dotSize?: string;}) {
    return (
        <Stack direction='row' sx={{
            alignItems: 'center',
            width: '100%',
            gap: '10px',
        }}>
            <StatusDot state={state} size={dotSize} />
            <Typography sx={{
                fontSize: {xs: '10px', md: '12px'},
                color: TextColors.OverviewContent
            }}>
                {label}
            </Typography>
        </Stack>
    );
}

export const RegionStatus = forwardRef<HTMLDivElement, RegionStatusProps>(({ top, left, }, ref) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    
    return (
        <Stack
            ref = {ref}
            sx={{
                position: 'fixed',
                top: `${top}px`,
                left: `${left}px`,
                zIndex: 900,

                gap: {xs: '8px', md: '10px'},
                width: {xs:'240px', md:'360px'},
                padding: {xs: '10px 12px', md: '16px 18px'},
                borderRadius: '18px',
                boxShadow: '0px 10px 24px 0px rgba(0,0,0,0.25)',

                borderTop: '3.5px solid transparent',
                borderLeft: '3.5px solid transparent',
                borderRight: '3.5px solid transparent',
                borderBottom: '3.5px solid transparent',
                backgroundImage: `linear-gradient(rgba(32, 32, 32, 0.8), rgba(32, 32, 32, 0.8)), ${theme.custom.navBorderGradient}`,
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
                transition: 'background-color 0.5s ease, color 0.5s ease',

                userSelect: 'none',
                touchAction: 'none',
                cursor: 'grab',
                '&:active': { cursor: 'grabbing' }
            }}
        >
            <Typography sx={{
                fontSize: {xs:'12px', md: '14px'},
                fontWeight: 600,
                color: TextColors.DarkThemeText
            }}>
                REGION STATUS
            </Typography>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: {xs: '1fr', md: 'repeat(2, 1fr)'},
                gap: {xs: '6px', md: '10px'},
            }}>
                {LEGEND_CONFIG.map(({ label, state }) => (
                <LegendRow key={label} label={label} state={state} dotSize={isMobile ? '9px' : '12px'} />
            ))}
            </Box>
            
        </Stack>
    )
});