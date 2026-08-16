import { useMemo, useState } from 'react';

import { Stack, Box, Typography, useTheme, } from '@mui/material';
import { BrandColors, TextColors } from '../../assets/themes/colors';
import { adminCardSx, adminCardTitleSx } from './cardStyles';

export interface ServerRequestStat {
    id: string;
    region: string
    requests: number;
    percent: number; // 0 -> 100
}

interface RequestsByServerProps {
    servers: ServerRequestStat[];
}

function ServerRow({ id, requests, percent }: ServerRequestStat) {
    return (
        <Stack sx={{
            gap: '8px',
            width: '100%',
        }}>
            <Stack
                direction='row'
                sx={{
                    justifyContent: 'space-between',
                }}
            >
                <Typography sx={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: TextColors.DarkThemeText,
                }}>
                    {id}
                </Typography>

                <Typography sx={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: TextColors.DarkThemeText,
                }}>
                    {`${requests} req - ${percent}%`}
                </Typography>
            </Stack>

            <Box sx={{
                height: '8px',
                width: '100%',
                borderRadius: '4px',
                backgroundColor: 'rgba(255,255,255,0.08)',
                overflow: 'hidden',
            }}>
                <Box sx={{
                    height: '100%',
                    width: `${percent}%`,
                    borderRadius: '4px',
                    backgroundColor: BrandColors.MainPrimary,
                }} />
            </Box>
        </Stack>
    );
}

interface RegionFilterPillProps {
    label: string;
    active: boolean;
    onClick: () => void;
}

function RegionFilterPill({ label, active, onClick }: RegionFilterPillProps) {
    return (
        <Box
            component='button'
            onClick={onClick}
            sx={{
                cursor: 'pointer',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 600,
                fontFamily: 'Sora',
                border: `1px solid ${active ? BrandColors.MainPrimary : 'rgba(255,255,255,0.15)'}`,
                backgroundColor: active ? BrandColors.MainPrimary : 'rgba(255,255,255,0.04)',
                color: active ? TextColors.DarkThemeWhite : TextColors.OverviewContent,
                transition: 'background-color 0.15s ease, border-color 0.15s ease',
                '&:hover': {
                    borderColor: BrandColors.MainPrimary
                }
            }}
        >
            {label}
        </Box>
    )
}

function RequestsByServer({ servers }: RequestsByServerProps) {
    const theme = useTheme();
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

    const regions = useMemo(
        () => Array.from(new Set(servers.map(s => s.region))).sort().reverse(),
        [servers]
    );

    const visibleServers = selectedRegion
        ? servers.filter(s => s.region === selectedRegion)
        : servers;

    return (
        <Stack sx={{
            ...adminCardSx(theme),
            gap: '20px',
        }}>
            <Typography sx={{
                ...adminCardTitleSx,
                color: theme.palette.text.primary,
            }}>
                Requests by Server
            </Typography>

            {servers.length === 0 ? (
                <Typography sx={{
                    fontSize: '13px',
                    color: TextColors.DarkThemeGray,
                }}>
                    No request data available yet.
                </Typography>
            ) : (
                <>
                    <Stack 
                        direction = 'row'
                        sx={{
                            gap: '8px',
                            flexWrap: 'wrap',
                        }}
                    >
                        <RegionFilterPill
                            label = 'All'
                            active = {selectedRegion === null}
                            onClick={() => setSelectedRegion(null)}
                        />
                        {regions.map(region => (
                            <RegionFilterPill
                                key = {region}
                                label = {region}
                                active = {selectedRegion === region}
                                onClick={() => setSelectedRegion(prev => prev === region ? null : region)}
                            />
                        ))}
                    </Stack>

                    <Stack sx={{
                        gap: '20px'
                    }}>
                        {visibleServers.map(server => <ServerRow key={server.id} {...server} />)}
                    </Stack>
                </>

            )}
        </Stack>
    );
}

export default RequestsByServer;