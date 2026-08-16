import { useState } from "react";
import { Stack, Box, Typography, useTheme, alpha } from "@mui/material";

import { BrandColors, regionMarkerStates } from "../../assets/themes/colors";
import { adminCardSx, adminCardTitleSx } from "./cardStyles";

import { API_STATUS_CONFIG } from "../../assets/apiStatus";
import { useLiveMetricsContext } from "../../hooks/liveMetrics";
import { resetSimulation } from "../../services/adminApi";

const GRAFANA_URL = ''; //TODO LINK GRAFANA

function ActionPill({label, color, href, onClick, disabled} : { label: string, color: string, href?: string, onClick?: () => void, disabled?: boolean}){
    const clickable = Boolean((href || onClick) && !disabled);

    return(
        <Box
            component = {href ? 'a' : 'div'}
            href = {disabled ? undefined : href}
            target = {href ? '_blank' : undefined}
            rel = {href ? 'noopener noreferrer' : undefined}
            onClick = {disabled ? undefined : onClick}
            sx = {{
                display: 'flex',
                alignItems: 'center',
                padding: '11px 20px',
                borderRadius: '10px',
                border: `1px solid ${color}`,
                backgroundColor: alpha(color, 0.12),
                textDecoration: 'none',
                cursor: clickable ? 'pointer' : 'default',
            }}
        >
            <Typography sx={{
                fontFamily: 'Sora',
                fontWeight: 600,
                fontSize: '14px',
                color
            }}>
                {label}
            </Typography>
        </Box>
    );
}

function SettingsRow({ title, description, action}: { title: string, description: string, action: React.ReactNode}) {
    return(
        <Stack
            direction = 'row'
            sx = {{
                alignItems: 'center',
                width: '100%',
            }} 
        >
            <Stack sx={{
                flex: '1 0 0',
                gap: '4px',
            }}>
                <Typography sx={{
                    fontFamily: 'Sora',
                    fontWeight: 600,
                    fontSize: '16px',
                }}>
                    {title}
                </Typography>

                <Typography sx={{
                    fontSize: '13px',
                    color: 'text.secondary'
                }}>
                    {description}
                </Typography>
            </Stack>
            {action}
        </Stack>
    );
}

function AdminSettings(){
    const theme = useTheme();
    const { metrics } = useLiveMetricsContext();
    const apiHealth = metrics.apiHealth;

    const [resetting, setResetting] = useState(false);
    const [resetError, setResetError] = useState<string | null>(null);
    const [resetDone, setResetDone] = useState(false);

    const handleResetAll = async () => {
        if(!window.confirm("ARE YOU SURE you want to reset all simulation data?")) return;
        setResetting(true);
        setResetError(null);
        setResetDone(false);

        try{
            await resetSimulation();
            setResetDone(true);
        }
        catch{
            setResetError("Reset failed - check backend");
        } 
        finally{
            setResetting(false);
        }
    };

    return(
        <Stack sx={{
            gap: '28px',
            padding: '40px',
            width: '100%',
        }}>
            <Stack sx={{
                gap: '4px',
            }}>
                <Typography sx={{
                    fontFamily: 'Sora',
                    fontWeight: 800,
                    fontSize: '30px',
                    color: theme.palette.text.primary
                }}>
                    Settings
                </Typography>

                <Typography sx={{
                    fontSize: '14px',
                    color: theme.palette.text.secondary
                }}>
                    Observability links and system controls
                </Typography>

            </Stack>

            <Stack sx={{
                ...adminCardSx(theme),
                gap: '20px',
            }}>
                <Typography sx={{
                    ...adminCardTitleSx,
                    color: theme.palette.text.primary,
                }}>
                    Observability
                </Typography>

                <SettingsRow
                    title = "Grafana Dashboard"
                    description = "Live infrastructure metrics, logs and routing traces"
                    action = {<ActionPill 
                                label = "View Grafana" 
                                color = {BrandColors.MainPrimary} 
                                href = {GRAFANA_URL}
                            />}
                />

                <SettingsRow
                    title = "API Health Ckeck"
                    description = "Backend connectivity for /servers and /route endpoints"
                    action = {<ActionPill 
                                label = {apiHealth !== null ? API_STATUS_CONFIG[apiHealth].label : 'N/A'} 
                                color = {apiHealth !== null ? API_STATUS_CONFIG[apiHealth].color : theme.custom.adminSidebarMutedText} 
                            />}
                />
            </Stack>

            <Stack sx={{
                ...adminCardSx(theme),
                border: `1px solid ${alpha(regionMarkerStates.offline.fill, 0.4)}`,
                gap: '20px'
            }}>
                <Typography sx={{
                    ...adminCardTitleSx,
                    color: theme.palette.text.primary
                }}>
                    Danger Zone
                </Typography>

                <SettingsRow
                    title = "Reset all simulation data"
                    description = "Clears carbon score, request counters and recent switch history"
                    action = {<ActionPill 
                                label = "Reset All"
                                color = {regionMarkerStates.offline.fill}
                                onClick={handleResetAll} 
                                disabled = {resetting}
                            />}
                />

                {resetError && 
                    <Typography sx={{
                        fontSize: '13px',
                        color: regionMarkerStates.offline.fill,
                    }}>
                        {resetError}
                    </Typography>
                }

                {resetDone && !resetError &&
                    <Typography sx={{
                        fontSize: '13px',
                        color: theme.palette.text.secondary,
                    }}>
                        Reset done
                    </Typography>
                }
            </Stack>
        </Stack>
    );
}

export default AdminSettings;