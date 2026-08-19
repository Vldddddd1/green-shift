import { forwardRef, } from 'react';

import { Stack, Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { regionMarkerStates, TextColors, } from '../../assets/themes/colors';
import { floatingPanelSx } from '../../assets/themes/sharedStyles';
import StatusDot from '../StatusDot';

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

function LegendRow({ label, state, dotSize }: { label: string; state: RegionMarkerState; dotSize?: string;}) {
    const {fill, stroke} = regionMarkerStates[state];
    
    return (
        <Stack direction='row' sx={{
            alignItems: 'center',
            width: '100%',
            gap: '10px',
        }}>
            <StatusDot color = {fill} stroke = {stroke} size={dotSize} />
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
                ...floatingPanelSx(theme),
        }}>

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