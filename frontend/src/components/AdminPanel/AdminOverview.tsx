import { Stack, Box, } from '@mui/material';
import { onlineAzCountByRegion, useLiveMetricsContext } from '../../hooks/liveMetrics';
import { REGION_CATALOG } from './regionCatalog';

import { adminPageSx } from './cardStyles';
import StatCard from './StatCard';
import RequestsByServer from './RequestsByServer';
import PerformancePanel from './PerformancePanel';
import RecentSimulations from './RecentSimulations';
import AllRegionsGrid from './AllRegionsGrid';
import StatusPill from '../StatusPill';
import AdminPageHeader from './AdminPageHeader';

function AdminOverview(){
    const { metrics, connected } = useLiveMetricsContext();

    const onlineRegionCount = new Set(
        metrics.servers.filter(server => server.online).map(server => server.region)
    ).size;

    const onlineAzCounts = onlineAzCountByRegion(metrics.servers)

    return(
        <Stack sx = {
            adminPageSx
        }>
            <AdminPageHeader
                title = "Overview"
                subtitle = "Live traffic simulation across all configured regions"
                action = {<StatusPill active = {connected} label = {connected ? `Last updated ${metrics.lastUpdate ?? 'just now'}` : 'Not connected'}/>}
            />

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
                        helperText = {connected ? 'Live from /servers' : 'Awaiting live data'}
                    />
                    <StatCard
                        label = "CARBON SAVED"
                        value = {metrics.carbonSavedKg !== null ? `${metrics.carbonSavedKg.toFixed(1)} kg CO2` : null}
                        helperText = "vs. static routing"
                    />
                    <StatCard
                        label = "SAVINGS MULTIPLIER"
                        value = {metrics.savingsMultiplier !== null ? `x${metrics.savingsMultiplier.toFixed(1)}`: null}
                        helperText = "Cleaner-grid efficiency"
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
                            averageLatencyMs = {metrics.averageLatencyMs} 
                            carbonReductionPercent = {metrics.carbonReductionPercent} 
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