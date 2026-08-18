import { useMemo, useState } from "react";
import { Stack, Box, Typography, useTheme, alpha } from "@mui/material";

import { BrandColors, regionMarkerStates } from "../../assets/themes/colors";
import { adminCardSx, adminCardTitleSx, adminPageSx } from "./cardStyles";
import { REGION_CATALOG } from "./regionCatalog";
import { deriveRegionStatus } from "./regionStatus";
import {CONTINENTS, getContinent, type Continent} from "./continents"
import FilterPill from "./FilterPill";
import { useLiveMetricsContext, onlineAzCountByRegion, regionAverages } from "../../hooks/liveMetrics";
import { updateCarbonScore, updateLoad, updateLatency, updateStatus, releaseOverride } from "../../services/adminApi";

import type { ServerStatus } from "../../hooks/liveMetrics";
import StatusDot from "../StatusDot";
import StatusPill from "../StatusPill";
import AdminPageHeader from "./AdminPageHeader";

interface EditableMetricFieldProps{
    label: string;
    value: number;
    displayValue: string;
    flexBasis: string;
    onSave: (value: number) => Promise<void>;
    children?: React.ReactNode;
}

function EditableMetricField({ label, value, displayValue, flexBasis, onSave, children}: EditableMetricFieldProps){
    const theme = useTheme();
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(String(value));
    const [saving, setSaving] = useState(false);
    
     async function save(){
        const parsed = Number(draft);
        if(Number.isNaN(parsed)) return setEditing(false);
        setSaving(true);
        try{
            await onSave(parsed);
        }
        finally{
            setSaving(false);
            setEditing(false);
        }
    }

    return(
        <Stack sx={{
                width: {xs: '100%', sm: 'auto'},
                flex: {xs: 'unset', sm: `1 1 ${flexBasis}`},
                gap: '6px',
            }}>
                <Typography sx={{
                    fontSize: '10px',
                    fontWeight: 600,
                    color: theme.palette.text.secondary
                }}>
                    {label}
                </Typography>
                
                <Stack
                    direction = 'row'
                    sx = {{
                        alignItems: 'center',
                        gap: '10px',
                }}>
                    {editing ? (
                        <Box
                            component = "input"
                            autoFocus
                            value = {draft}
                            onChange={(e) => setDraft(e.target.value)}
                            onBlur = {save}
                            onKeyDown={(e) => e.key === 'Enter' && save()}
                            sx={{
                                width: '70px',
                                padding: '4px 10px',
                                borderRadius: '8px',
                                backgroundColor: theme.custom.adminInputBackground,
                                border: `1px solid ${theme.custom.adminSidebarBorder}`,
                                color: theme.palette.text.primary,
                                fontWeight: 700,
                                fontSize: '18px',           
                        }}
                        />
                    ) : (
                        <Box sx={{
                            padding: '4px 10px',
                            borderRadius: '8px',
                            backgroundColor: theme.custom.adminInputBackground,
                            border: `1px solid ${theme.custom.adminSidebarBorder}`
                        }}>
                            <Typography sx={{
                                fontWeight: 700,
                                fontSize: '18px',
                                color: theme.palette.text.primary,
                            }}>
                                {displayValue}
                            </Typography>
                        </Box>
                    )}

                    <Box
                        component = "button"
                        disabled = {saving}
                        onClick = {() => setEditing(true)}
                        sx = {{
                            cursor: 'pointer',
                            padding: '5px 10px',
                            borderRadius: '20px',
                            border: `1px solid ${BrandColors.MainPrimary}`,
                            backgroundColor: alpha(BrandColors.MainPrimary, 0.12),
                            color: BrandColors.MainPrimary,
                            fontSize: '11px',
                            fontWeight: 600,
                        }}>
                            {saving  ? '...' : 'EDIT'}
                    </Box>
                </Stack>

                {children}

            </Stack>
    );
}

function StatusEditor({ server }: { server: ServerStatus}) {
    const theme = useTheme();
    const [updating, setUpdating] = useState(false);

    async function handleChange(next: string){
        setUpdating(true);
        try{
            await updateStatus(server.region, server.id, next);
        }
        finally{
            setUpdating(false);
        }
    }

    async function handleAutoMode(){
        setUpdating(true);
        try{
            await releaseOverride(server.region, server.id, server.online ? 'online': 'offline');
        }
        finally{
            setUpdating(false);
        }
    }

    return(
        <Stack
            direction = 'row'
            sx = {{
                alignItems: 'center',
                gap: '8px',
                flexWrap: 'wrap',
        }}>
            <StatusDot color = {server.online ? BrandColors.MainPrimary : theme.palette.text.secondary} size = '7px'/>

            <Box
                component = 'select'
                value = {server.online ? 'online' : 'offline'}
                disabled = {updating}
                onChange={(e) => handleChange(e.target.value)}
                sx = {{
                    padding: '4px 8px',
                    borderRadius: '8px',
                    backgroundColor: theme.custom.adminInputBackground,
                    border: `1px solid ${theme.custom.adminSidebarBorder}`,
                    color: theme.palette.text.primary,
                    fontSize: '12px',
                    fontWeight: 600,
            }}>
                <option value = "online">
                    online
                </option>

                <option value = "offline">
                    offline
                </option>

            </Box>

            {server.manualOverride && (
                <Box 
                    component = "button"
                    disabled = {updating}
                    onClick = {handleAutoMode}
                    sx = {{
                        cursor: 'pointer',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        border: `1px solid ${theme.custom.adminSidebarBorder}`,
                        backgroundColor: 'transparent',
                        color: theme.palette.text.secondary,
                        fontSize: '11px',
                        fontWeight: 600, 
                }}>
                    Auto Mode
                </Box>
            )}
        </Stack>
    )
}
 
function ServerEditRow({ server }: {server: ServerStatus}){
    const theme = useTheme();

    return(
        <Stack
            direction = {{xs: 'column', sm: 'row'}}
            sx = {{
                alignItems: {xs: 'flex-start', sm: 'center'},
                gap: {xs: '14px', sm: '24px'},
                padding: '16px 20px',
                flexWrap: 'wrap',
                borderRadius: '12px',
                backgroundColor: theme.custom.adminMutedSurface,
        }}>
            <Stack sx={{
                width: {xs: '100%', sm: 'auto'},
                flex: {xs: 'unset', sm: '1 1 200px'},
                gap: '6px',
            }}>
                <Typography sx={{
                    fontWeight: 600,
                    fontSize: '17px',
                    color: theme.palette.text.primary
                }}>
                    {server.id}
                </Typography>

                <StatusEditor server = {server}/>
            </Stack>

            <EditableMetricField
                label = "Carbon Score"
                flexBasis = "170px"
                value = {server.carbonIntensity ?? 0}
                displayValue = {`${server.carbonIntensity ?? '-'} gCO2`}
                onSave={(v) => updateCarbonScore(server.region, server.id, v)}
            />

            <EditableMetricField
                label = "Current Load"
                flexBasis = "170px"
                value = {server.currentLoad ?? 0}
                displayValue = {`${server.currentLoad ?? 0}%`}
                onSave={(v) => updateLoad(server.region, server.id, v)}
            >
                <Box sx={{
                    height: '8px',
                    width: '100%',
                    borderRadius: '4px',
                    backgroundColor: theme.custom.adminSidebarBorder,
                    overflow: 'hidden'
                }}>
                    <Box sx={{
                        height: '100%',
                        width: `${server.currentLoad ?? 0}%`,
                        borderRadius: '4px',
                        backgroundColor: BrandColors.MainPrimary,
                    }}/>
                </Box>
            </EditableMetricField>

            <EditableMetricField
                label = "Latency"
                flexBasis = "120px"
                value = {server.latencyMs ?? 0}
                displayValue = {server.latencyMs !== null ? `${server.latencyMs}ms`: 'N/A'}
                onSave={(v) => updateLatency(server.region, server.id, v)}
            />

        </Stack>
    );
}

function ZoneRow({ zoneId, location, azCount, onlineAzCount, avg, servers}: { zoneId: string; location: string; azCount: number; onlineAzCount: number | null; avg: {avgCarbon: number; avgLatency: number} | undefined; servers: ServerStatus[];}) {
    const theme = useTheme();
    const [expanded, setExpanded] = useState(false);
    const { state, label } = deriveRegionStatus(onlineAzCount, azCount);
    const {fill} = regionMarkerStates[state];

    return(
        <Stack sx={{
            gap: '8px',
            width: '100%'
        }}>
            <Stack
                component = "button"
                onClick = {() => setExpanded((e) => !e)}
                direction = {{xs: 'column', sm: 'row'}}
                sx = {{
                    cursor: 'pointer',
                    textAlign: 'left',
                    gap: {xs: '10px', sm: '20px'},
                    height: {xs: 'auto', sm: '60px'},
                    alignItems: {xs: 'flex-start', sm: 'center'},
                    padding: '12px 18px',
                    borderRadius: '10px',
                    backgroundColor: theme.custom.adminSidebarBackground,
                    border: 'none',
                    width: '100%'
                }}>
                    <Stack sx={{
                        width: {xs: '100%', sm: '220px'},
                        gap: '2px',
                    }}>
                        <Typography sx={{
                            fontWeight: 600,
                            fontSize: '15px',
                            color: theme.palette.text.primary
                        }}>
                            {zoneId}
                        </Typography>
                        <Typography sx={{
                            fontSize: '11px',
                            color: theme.palette.text.secondary
                        }}>
                            {location}
                        </Typography>
                    </Stack>

                    <Typography sx={{
                        width: {xs: 'auto', sm: '70px'},
                        fontSize: '12px',
                        fontWeight: 600,
                        color: theme.palette.text.secondary,
                    }}>
                        {azCount} AZs
                    </Typography>

                    <Stack
                        direction = "row"
                        sx = {{
                            width: {xs: 'auto', sm: '150px'},
                            height: '100%',
                            alignItems: 'center',
                            gap: '6px',
                            borderRadius: '10px',
                            padding: '4px 10px',
                            backgroundColor: theme.custom.adminMutedSurface,
                            alignSelf: 'flex-start',
                        }}>
                            <StatusDot color = {fill} size = '6px'/>

                            <Typography sx={{
                                fontSize: '11px',
                                fontWeight: 600,
                                color: theme.palette.text.secondary,
                            }}>
                                {label}
                            </Typography>
                    </Stack>

                    <Stack sx={{
                        width: {xs: '100%', sm: '140px'},
                        gap: '2px',
                    }}>
                        <Typography sx={{
                            fontSize: '10px',
                            color: theme.palette.text.secondary,
                        }}>
                            Avg. Carbon
                        </Typography>

                        <Typography sx={{
                            fontWeight: 600,
                            fontSize: '15px',
                            color: theme.palette.text.primary,
                        }}>
                            {avg ? `${avg.avgCarbon} gCO2` : 'N/A'}
                        </Typography>
                    </Stack>

                    <Stack sx={{
                        width: {xs: '100%', sm: '100px'},
                        gap: '2px',
                    }}>
                        <Typography sx={{
                            fontSize: '10px',
                            color: theme.palette.text.secondary,
                        }}>
                            Avg. Latency
                        </Typography>

                        <Typography sx={{
                            fontWeight: 600,
                            fontSize: '15px',
                            color: theme.palette.text.primary,
                        }}>
                            {avg ? `${avg.avgLatency}ms` : 'N/A'}
                        </Typography>
                    </Stack>
            </Stack>

            {expanded && servers.map((s) => <ServerEditRow key = {s.id} server = {s}/>)}
        </Stack>
    );
}

function AdminRegions() {
    const theme = useTheme();
    const { metrics, connected } = useLiveMetricsContext();
    const [activeContinent, setActiveContinent] = useState<Continent | null>(null);

    const onlineAzCounts = onlineAzCountByRegion(metrics.servers);
    const averages = regionAverages(metrics.servers);
    const onlineRegionCount = new Set(metrics.servers.filter((s) => s.online).map((s) => s.region)).size;

    const grouped = useMemo(() => {
        const map = new Map<Continent, typeof REGION_CATALOG>();
        for (const region of REGION_CATALOG){
            const continent = getContinent(region.id);
            map.set(continent, [...(map.get(continent) ?? []), region]);
        }
        return map;
    }, []);

    const visibleContinents = activeContinent ? [activeContinent] : CONTINENTS;

    return(
        <Stack sx = {
            adminPageSx
        }>
            <AdminPageHeader
                title = "Regions"
                subtitle= {`ALL ${REGION_CATALOG.length} regions tracked by Green-Shift`}
                action = {<StatusPill active = {connected} label = {connected ? `${onlineRegionCount} /  ${REGION_CATALOG.length} live` : 'Not Connected'}/>}
            />
            
            <Stack
                direction = "row"
                sx={{
                    gap: '8px',
                    flexWrap: 'wrap',
                }}>
                    <FilterPill
                        label = "All"
                        active = {activeContinent === null}
                        onClick={() => setActiveContinent(null)}
                    />
                    
                    {CONTINENTS.map((c) => (
                        <FilterPill 
                            key = {c} 
                            label = {c} 
                            active = {activeContinent === c}
                            onClick={() => setActiveContinent((prev) => (prev === c ? null : c))}
                        />
                    ))}
            </Stack>

            {visibleContinents.map((continent) => {
                const regions = grouped.get(continent) ?? [];
                if(regions.length === 0) return null;

                return(
                    <Stack 
                        key = {continent}
                        sx = {{
                            ...adminCardSx(theme), 
                            gap: '10px',
                        }}>
                            <Stack
                                direction = {{xs: 'column', sm: 'row'}}
                                sx = {{
                                    alignItems: {xs: 'flex-start', sm: 'center'},
                                    gap: '12px',
                                    width: '100%',
                                }}>
                                    <Typography sx={{
                                        ...adminCardTitleSx,
                                        flex: '1 0 0',
                                        fontSize: '18px',
                                        color: theme.palette.text.primary,
                                    }}>
                                        {continent}
                                    </Typography>

                                    <Box sx={{
                                        padding: '6px 12px',
                                        borderRadius: '20px',
                                        backgroundColor: theme.custom.adminMutedSurface,
                                    }}>
                                        <Typography sx={{
                                            fontSize: '12px',
                                            fontWeight: 600,
                                            color: theme.palette.text.secondary,
                                        }}>
                                            {regions.length} region{regions.length === 1 ? ' ' : 's'}
                                        </Typography>
                                    </Box>
                            </Stack>
                            {regions.map((region) => (
                                <ZoneRow
                                    key = {region.id}
                                    zoneId = {region.id}
                                    location = {region.location}
                                    azCount = {region.azCount}
                                    onlineAzCount= {onlineAzCounts[region.id] ?? null}
                                    avg = {averages[region.id]}
                                    servers = {metrics.servers.filter((s) => s.region === region.id)}
                                />
                            ))}
                    </Stack>
                )
            })}
        </Stack>
    );
}

export default AdminRegions;