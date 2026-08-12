import { forwardRef, } from 'react';

import { Stack, Box, Typography, useTheme } from '@mui/material';
import { TextColors, regionColors } from '../../assets/themes/colors';

const LEGEND_CONFIG = [
    { label: 'Active - Routing Now', color: regionColors.active },
    { label: 'Available - Standby', color: regionColors.available },
    { label: 'Unavailable', color: regionColors.unavailable },
    { label: 'Offline / Error', color: regionColors.offline },
] as const;

interface RegionStatusProps {
    top: number;
    left: number;
}

function StatusDot({ color, size }: { color: string; size?: string }) {
    return (
        <Box sx={{
            width: size,
            height: size,
            borderRadius: '50%',
            backgroundColor: color,
            flexShrink: 0,
        }} />
    )
}

function LegendRow({ label, color }: { label: string; color: string; }) {
    return (
        <Stack direction='row' sx={{
            alignItems: 'center',
            width: '100%',
            gap: '10px',
        }}>
            <StatusDot color={color} size='12px' />
            <Typography sx={{
                fontSize: '13px',
                color: TextColors.OverviewContent
            }}>
                {label}
            </Typography>
        </Stack>
    );
}

export const RegionStatus = forwardRef<HTMLDivElement, RegionStatusProps>(({ top, left, }, ref) => {
    const theme = useTheme();

    return (
        <Stack
            ref = {ref}
            sx={{
                position: 'fixed',
                top: `${top}px`,
                left: `${left}px`,
                zIndex: 900,

                gap: '10px',
                width: '360px',
                padding: '16px 18px',
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
                fontSize: '13px',
                fontWeight: 600,
                color: TextColors.DarkThemeText
            }}>
                REGION STATUS
            </Typography>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '10px',
            }}>
                {LEGEND_CONFIG.map(({ label, color }) => (
                <LegendRow key={label} label={label} color={color} />
            ))}
            </Box>
            
        </Stack>
    )
});