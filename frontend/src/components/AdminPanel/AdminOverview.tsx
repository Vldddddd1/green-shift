import { Stack, Box, Typography, useTheme, alpha, } from '@mui/material';
import { BrandColors, } from '../../assets/themes/colors';

import { onlineAzCountByRegion, useLiveMetricsContext } from '../../hooks/liveMetrics';
import { REGION_CATALOG } from './regionCatalog';

import StatCard from './StatCard';
import RequestsByServer from './RequestsByServer';
import PerformancePanel from './PerformancePanel';
import RecentSimulations from './RecentSimulations';
import AllRegionsGrid from './AllRegionsGrid';

function LivePill({ connected, lastUpdate, }: { connected: boolean; lastUpdate: string | null }) {
    const theme = useTheme();
    
    const dotColor = connected ? BrandColors.MainPrimary : theme.palette.text.secondary;
    const label = connected ? `Last updated ${lastUpdate ?? 'just now'}` : 'Not connected';

    return (
        <Stack
            direction='row'
            sx={{
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                borderRadius: '20px',
                border: `1px solid ${connected ? BrandColors.MainPrimary : theme.custom.adminSidebarBorder}`,
                backgroundColor: connected ? alpha(BrandColors.MainPrimary, 0.14) : theme.custom.adminMutedSurface,
            }}>
                <Box sx={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    backgroundColor: dotColor,
                }}/>
                <Typography sx={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: connected ? theme.palette.text.secondary : theme.palette.text.secondary,
                }}>
                    {label}
                </Typography>
        </Stack>
    );
}

function AdminOverview(){
    const theme = useTheme();
    const { metrics, connected } = useLiveMetricsContext();

    const onlineRegionCount = new Set(
        metrics.servers.filter(server => server.online).map(server => server.region)
    ).size;

    const onlineAzCounts = onlineAzCountByRegion(metrics.servers)

    return(
        <Stack sx={{
            gap: '28px',
            padding: '40px',
            width: '100%',
        }}>
            <Stack 
                direction = 'row'
                sx ={{
                    alignItems: 'center',
                    width: '100%',
                }}>
                    <Stack sx={{
                        flex: '1 0 0',
                        gap: '4px',
                    }}>
                        <Typography sx={{
                            fontFamily: 'Sora',
                            fontWeight: 800,
                            fontSize: '30px',
                            color: theme.palette.text.primary,
                        }}>
                            Overview
                        </Typography>
                        <Typography sx={{
                            fontSize: '14px',
                            color: theme.palette.text.secondary,
                        }}>
                            Live traffic simulation across all configured regions.
                        </Typography>
                    </Stack>
                    <LivePill connected = {connected} lastUpdate = {metrics.lastUpdate}/>
            </Stack>

            <Stack
                direction = 'row'
                sx = {{
                    gap: '20px',
                    width: '100%',
                    flexWrap: 'wrap',
                }}>
                    {/* Stays N/A untill /servers /route are connected */}
                    <StatCard label = "TOTAL REQUESTS" value = {metrics.totalRequests} helperText='Simulated this session'/>
                    <StatCard
                        label = "REGIONS LIVE"
                        value = {connected ? `${onlineRegionCount} / ${REGION_CATALOG.length}` : null}
                        helperText = {connected ? 'Live from /carbon' : 'Awaiting live data'}
                    />
                    <StatCard
                        label = "CARBON SAVED"
                        value = {metrics.carbonSavedKg !== null ? `${metrics.carbonSavedKg.toFixed(1)} kg CO₂` : null}
                        helperText = "vs. static routing"
                    />
                    <StatCard
                        label = "SAVINGS MULTIPLIER"
                        value = {metrics.savingsMultiplier !== null ? `x${metrics.savingsMultiplier.toFixed(1)}`: null}
                        helperText = "cleaner-grid efficiency"
                    />
            </Stack>

            <Stack
                direction = 'row'
                sx = {{
                    gap: '32px',
                    width: '100%',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start',
                }}>
                    <Box sx={{
                        flex: '2 1 640px'
                    }}>
                        {/* Stays EMPTY untill /servers /route are connected */}
                        <RequestsByServer servers = {metrics.servers
                            .filter(s => s.requests !== null && s.percent !== null)
                            .map(s => ({id : s.id, region: s.region, requests: s.requests!, percent: s.percent! }))}
                        />
                    </Box>
                    <Stack sx={{
                        flex: '1 1 380px',
                        gap: '32px',
                    }}>
                        <PerformancePanel
                            averageLatencyMs = {metrics.averageLatencyMs} //nu exista inca in api resposne
                            carbonReductionPercent = {metrics.carbonReductionPercent} //nu exista inca in api response
                            activeRegion = {metrics.activeRegion}
                            apiHealth = {metrics.apiHealth}
                        />
                        <RecentSimulations
                            simulations={metrics.recentSwitches.map(s => ({
                                id: s.id,
                                summary: `${s.time} - routed to ${s.region}`,
                            }))}
                        />
                    </Stack>
            </Stack>

            <AllRegionsGrid onlineAzCounts={onlineAzCounts}/>
        </Stack>
    );
}

export default AdminOverview;