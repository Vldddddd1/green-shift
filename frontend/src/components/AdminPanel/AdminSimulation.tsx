import { useState } from "react";
import { Stack, Box, Typography, useTheme, alpha } from "@mui/material";

import { BrandColors, regionMarkerStates, TextColors, } from "../../assets/themes/colors";
import { adminCardSx, adminCardTitleSx, adminPageSx } from "./cardStyles";
import { REGION_CATALOG } from "./regionCatalog";
import StatCard from "./StatCard";
import { useLiveMetricsContext } from "../../hooks/liveMetrics";
import { simulateRequests, resetSimulation, type SimulateResult, } from "../../services/adminApi"
import AdminPageHeader from "./AdminPageHeader";

const MAX_SIM_REQUESTS = 300;
const DEFAULT_REQUEST_COUNT = 25;

interface LastSimulation{
    totalRouted: number;
    zone: string;
    baselineLoad: number;
}

function AdminSimulation(){
    const theme = useTheme();
    const {metrics} = useLiveMetricsContext();

    const [count, setCount] = useState(DEFAULT_REQUEST_COUNT);
    const [targetZone, setTargetZone] = useState(REGION_CATALOG[0].id);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [lastResult, setLastResult] = useState<LastSimulation | null>(null);

    const zoneServers = metrics.servers.filter((s) => s.region === (lastResult?.zone ?? targetZone));
    const onlineZoneServers = zoneServers.filter((s) => s.online && s.currentLoad !== null);
    const currentZoneLoad = onlineZoneServers.length ? Math.round(onlineZoneServers.reduce((sum, s) => sum + (s.currentLoad ?? 0), 0) / onlineZoneServers.length) : null;

    const targetRegion = REGION_CATALOG.find((r) => r.id === targetZone);

    async function handleSimulate(){
        setSubmitting(true);
        setError(null);

        try{
            const baselineLoad = currentZoneLoad ?? 0;
            const result: SimulateResult = await simulateRequests(count, targetZone);
            setLastResult({totalRouted: result.simulated, zone: targetZone, baselineLoad});
        }
        catch{
            setError("Simulation Failed - check that backend & region containers are running ");
        }
        finally{
            setSubmitting(false);
        }
    }

    async function handleReset() {
        setSubmitting(true);
        setError(null);

        try{
            await resetSimulation();
            setLastResult(null);
        }
        catch{
            setError("Reset failed - check backend");
        }
        finally{
            setSubmitting(false);
        }
    }

    return(
        <Stack sx={
            adminPageSx
        }>
            <AdminPageHeader
                title = "Simulation"
                subtitle = "Send simulated traffic and watch it route to the cleanest region"
            />

            <Stack sx={{
                ...adminCardSx(theme),
                gap: '24px',
            }}>
                <Stack
                    direction = {{xs: 'column', sm: 'row' }}
                    sx = {{
                        alignItems: {xs: 'flex-start', sm: 'center'},
                        gap: {xs: '12px', sm: 0},
                        width: '100%',
                }}>
                    <Typography sx={{
                        ...adminCardTitleSx,
                        flex: '1 0 0',
                        fontSize: '18px',
                        color: theme.palette.text.primary,
                    }}>
                        Number of requests -  Up to {MAX_SIM_REQUESTS} requests per run.
                    </Typography>

                    <Box
                        component = "input"
                        type = "number"
                        min = {1}
                        max = {MAX_SIM_REQUESTS}
                        value = {count}
                        onChange={(e) => {
                            const next = Number(e.target.value);
                            if(Number.isNaN(next)) return;
                            setCount(Math.min(MAX_SIM_REQUESTS, Math.max(1,next)));
                        }}
                        sx = {{
                            width: {xs: '100%', sm: '80px'},
                            padding: '8px 12px',
                            borderRadius: '8px',
                            backgroundColor: theme.custom.adminInputBackground,
                            border: `1px solid ${theme.custom.adminSidebarBorder}`,
                            color: theme.palette.text.primary,
                            fontWeight: 700,
                            fontSize: '18px',
                            textAlign: 'center',
                            touchAction: 'none',
                        }}/>
                </Stack>

                <Stack sx={{
                    gap: '8px',
                    width: '100%',
                }}>
                    <Typography sx={{
                        fontWeight: 600,
                        fontSize: '11px',
                        color: theme.palette.text.secondary
                    }}>
                        Target Region
                    </Typography>

                    <Box
                        component = "select"
                        value = {targetZone}
                        onChange={(e) => setTargetZone(e.target.value)}
                        sx = {{
                            width: '100%',
                            padding: '12px 16px',
                            borderRadius: '17px',
                            backgroundColor: theme.custom.adminSidebarBackground,
                            border: `1px solid ${theme.custom.adminSidebarBorder}`,
                            color: theme.palette.text.primary,
                            fontWeight: 600,
                            fontSize: '15px',
                            touchAction: 'none',
                    }}>
                        {REGION_CATALOG.map((region) => (
                            <option
                                key = {region.id}
                                value = {region.id}
                            >
                                {region.id} - {region.location}, {region.azCount} AZs
                            </option>
                        ))}
                    </Box>
                </Stack>

                <Box
                    component = "button"
                    disabled = {submitting}
                    onClick = {handleSimulate}
                    sx = {{
                        cursor: submitting ? 'default' : 'pointer',
                        padding: '14px 28px',
                        borderRadius: '10px',
                        border: 'none',
                        backgroundColor: BrandColors.MainPrimary,
                        opacity: submitting ? 0.6 : 1,
                        color: TextColors.DarkThemeWhite,
                        fontWeight: 600,
                        fontSize: '15px',
                        touchAction: 'none',
                }}>
                    {submitting ? 'Simulating' : 'Simulate Requests'}
                </Box>

                {error && 
                    <Typography sx={{
                        fontSize: '13px',
                        color: regionMarkerStates.offline.fill,
                    }}>
                        {error}
                    </Typography>
                }

            </Stack>

            <Typography sx={{
                fontWeight: 600,
                fontSize: '17px',
                color: theme.palette.text.primary,
            }}>
                Last Simulation Result
            </Typography>

            {lastResult ? (
                <>
                    <Stack
                        direction = "row"
                        sx = {{
                            gap: '20px',
                            width: '100%',
                            flexWrap: 'wrap',
                    }}>
                        <StatCard
                            label = "Total Routed"
                            value = {lastResult.totalRouted}
                            helperText = "requests dispatched"
                        />

                        <StatCard
                            label = "Target Region"
                            value = {lastResult.zone}
                            helperText = {targetRegion ? `${targetRegion.location} - ${targetRegion.azCount} AZs` : ''}
                        />

                        <StatCard
                            label = "Resulting Load"
                            value = {currentZoneLoad !== null ? `${currentZoneLoad}%` : null}
                            helperText = {`up from ${lastResult.baselineLoad}% baseline`}
                        />
                    </Stack>

                    <Box 
                        component = "button"
                        disabled = {submitting}
                        onClick = {handleReset}
                        sx={{
                            cursor: submitting ? 'default' : 'pointer',
                            padding: '12px 24px',
                            borderRadius: '10px',
                            border: `1px solid ${regionMarkerStates.offline.fill}`,
                            backgroundColor: alpha(regionMarkerStates.offline.fill, 0.1),
                            color: regionMarkerStates.offline.fill,
                            fontWeight: 600,
                            fontSize: '14px',
                            touchAction: 'none',
                    }}>
                        Reset Simulation
                    </Box>
                </>
            ) : (
                <Typography sx={{
                    fontSize: '13px',
                    color: theme.palette.text.secondary,
                }}>
                    Run a simulation to see results
                </Typography>
            )}

        </Stack>
    );
}

export default AdminSimulation;