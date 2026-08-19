import { Stack, Typography, useTheme, } from '@mui/material';
import { BrandColors, } from '../../assets/themes/colors';
import { adminCardSx, adminCardTitleSx } from './cardStyles';
import { MetricRow, } from '../MetricRow';
import { API_STATUS_CONFIG } from '../../assets/apiStatus';

import type { APIStatus } from '../../hooks/liveMetrics';

import { display } from '../../assets/format';

interface PerformancePanelProps {
    averageLatencyMs: number | null;
    carbonReductionPercent: number | null;
    activeRegion: string | null;
    apiHealth: APIStatus | null;
}

function PerformancePanel({ averageLatencyMs, carbonReductionPercent, activeRegion, apiHealth }: PerformancePanelProps) {
    const theme = useTheme();

    return (
        <Stack sx={{
            ...adminCardSx(theme),
            gap: '16px'
        }}>
            <Typography sx={{
                ...adminCardTitleSx,
                color: theme.palette.text.primary,
            }}>
                Performance
            </Typography>
            <MetricRow
                label = "Average Latency"
                value = {display(averageLatencyMs !== null ? `${averageLatencyMs} ms` : null)}
            />
            <MetricRow
                label = "Estimated carbon reduction"
                value = {display(carbonReductionPercent !== null ? `${carbonReductionPercent}%` : null)}
                valueColor = {BrandColors.MainPrimary} 
            />
            <MetricRow
                label="Active Region"
                value={display(activeRegion)}
                valueColor = {BrandColors.MainPrimary} 
            />
            <MetricRow
                label="API Connection"
                value={ apiHealth !== null ? API_STATUS_CONFIG[apiHealth].label : display(null)}
                valueColor = {apiHealth !== null ? API_STATUS_CONFIG[apiHealth].color : undefined} 
            />
        </Stack>
    );
}

export default PerformancePanel;