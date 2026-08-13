import { forwardRef } from 'react';
import { Stack, Box, Typography, useTheme, } from '@mui/material'
import { BrandColors, TextColors, BackgroundColors, regionMarkerStates } from '../../assets/themes/colors'
import type { RegionMarkerState } from '../../assets/themes/colors'

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
                backgroundColor: theme.palette.mode === 'dark' ? BackgroundColors.DarkThemeBackground : BackgroundColors.LightThemeBackground,
                borderLeft: `4px solid ${BrandColors.MainPrimary}`,
                boxShadow: '0px 8px 20px 0px rgba(0,0,0,0.15)',
            }}>
                <Stack direction='row'
                sx={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Typography sx={{
                        fontSize: '20px',
                        fontWeight: 600,
                        color: theme.palette.mode === 'dark' ? TextColors.DarkThemeText : TextColors.LightThemeText,
                    }}>
                        {region.name.toUpperCase()}
                    </Typography>
                    <Badge label = {state.toUpperCase()} color = {BrandColors.MainPrimary} />
                </Stack>

                <Typography sx={{
                    fontSize: '12px',
                    color: theme.palette.mode === 'dark' ? TextColors.DarkThemeText : TextColors.LightThemeText,
                }}>
                    CARBON INTENSITY
                </Typography>
                <Typography sx={{
                    fontSize: '30px',
                    fontWeight: 700,
                    color: theme.palette.mode === 'dark' ? TextColors.DarkThemeText : TextColors.LightThemeText,
                }}>
                    {carbonIntensity !== null ? `${carbonIntensity} gCO₂/kWh` : 'N/A'}
                </Typography>

                <Stack direction = 'row'
                sx={{
                    gap: '8px',
                    alignItems: 'center',
                }}>
                    <Box sx={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: fill
                    }}/>
                    <Typography sx={{
                        fontSize: '12px',
                        color: theme.palette.mode === 'dark' ? TextColors.LightThemeGray : TextColors.DarkThemeGray
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
                        color: theme.palette.mode === 'dark' ? TextColors.DarkThemeText : TextColors.LightThemeText,
                    }}>
                        Region Details
                    </Typography>
                    <Badge label = 'Available' color = {BrandColors.MainPrimary}/>
                </Stack>

                <Stack direction = 'row' sx={{
                    justifyContent: 'space-between',
                }}>
                    <Typography sx={{
                        fontSize: '13px',
                        color: theme.palette.mode === 'dark' ? TextColors.DarkThemeGray : TextColors.LightThemeGray
                    }}>
                        Last Routing Decision
                    </Typography>
                    <Typography sx={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: theme.palette.mode === 'dark' ? TextColors.DarkThemeGray : TextColors.LightThemeGray
                    }}>
                        {lastRoutingDecision}
                    </Typography>
                </Stack>
        </Stack>
    );
});