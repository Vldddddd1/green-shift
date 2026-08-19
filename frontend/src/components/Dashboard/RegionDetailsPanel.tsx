import { forwardRef } from 'react';
import { Stack, Box, Typography, useTheme, } from '@mui/material'
import { BrandColors, TextColors, regionMarkerStates } from '../../assets/themes/colors'
import type { RegionMarkerState } from '../../assets/themes/colors'
import StatusDot from '../StatusDot';

interface RegionDetailsPanelProps {
    region: { id: string; name: string; geography: string };
    left: number;
    top: number;
    onClose: () => void;
    state?: RegionMarkerState;
    carbonIntensity?: number | null;
    lastRoutingDecision?: string;
}

function Badge({ label, color }: { label: string; color: string }) {
    return (
        <Box sx={{
            backgroundColor: color,
            borderRadius: '20px',
            padding: '4px 10px',
        }}>
            <Typography sx={{
                fontSize: '11px',
                fontWeight: 600,
                color: TextColors.DarkThemeText
            }}>
                {label}
            </Typography>
        </Box>
    );
}

export const RegionDetailsPanel = forwardRef<HTMLDivElement, RegionDetailsPanelProps>(({ region, left, top, state = 'available', carbonIntensity = null, lastRoutingDecision = 'N/A',}, ref) => {
    const theme = useTheme();
    const { fill } = regionMarkerStates[state];

    return (
        <Stack
            ref = {ref}
            onClick={(e) => e.stopPropagation()}
            sx={{
                position: 'fixed',
                top: `${top}px`,
                left: `${left}px`,
                zIndex: 1000,
                width: '330px',
                gap: '14px',
                padding: '20px 22px',
                borderRadius: '16px',
                backgroundColor: theme.palette.background.default,
                borderLeft: `4px solid ${BrandColors.MainPrimary}`,
                boxShadow: '0px 8px 20px rgba(0,0,0,0.15)',
            }}>
                <Stack direction='row'
                sx={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Typography sx={{
                        fontSize: '20px',
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                    }}>
                        {region.name.toUpperCase()}
                    </Typography>
                    <Badge label = {state.toUpperCase()} color = {BrandColors.MainPrimary} />
                </Stack>

                <Typography sx={{
                    fontSize: '12px',
                    color: theme.palette.text.primary,
                }}>
                    CARBON INTENSITY
                </Typography>
                <Typography sx={{
                    fontSize: '30px',
                    fontWeight: 700,
                    color: theme.palette.text.primary,
                }}>
                    {carbonIntensity !== null ? `${carbonIntensity} gCO₂/kWh` : 'N/A'}
                </Typography>

                <Stack direction = 'row'
                sx={{
                    gap: '8px',
                    alignItems: 'center',
                }}>
                    <StatusDot color = {fill} size = '8px'/>
                    
                    <Typography sx={{
                        fontSize: '12px',
                        color: theme.palette.text.secondary
                    }}>
                        {state === 'active' ? 'Currently receiving traffic' : region.geography}
                    </Typography>
                </Stack>

                <Stack direction = 'row' sx={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Typography sx={{
                        fontSize: '20px',
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                    }}>
                        Region Details
                    </Typography>
                    <Badge label = {state.toUpperCase()} color = {BrandColors.MainPrimary}/>
                </Stack>

                <Stack direction = 'row' sx={{
                    justifyContent: 'space-between',
                }}>
                    <Typography sx={{
                        fontSize: '13px',
                        color: theme.palette.text.secondary
                    }}>
                        Last Routing Decision
                    </Typography>
                    <Typography sx={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: theme.palette.text.secondary
                    }}>
                        {lastRoutingDecision}
                    </Typography>
                </Stack>
        </Stack>
    );
});