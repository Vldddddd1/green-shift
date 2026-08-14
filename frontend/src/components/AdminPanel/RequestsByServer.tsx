import { Stack, Box, Typography, useTheme, } from '@mui/material';
import { BrandColors, TextColors } from '../../assets/themes/colors';
import { adminCardSx, adminCardTitleSx } from './cardStyles';

export interface ServerRequestStat {
    id: string;
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
                    {`${requests} req &#183 ${percent}%`}
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
                }}/>
            </Box>
        </Stack>
    );
}

function RequestsByServer( {servers} : RequestsByServerProps) {
    const theme = useTheme();

    return(
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
                servers.map(server => <ServerRow key = {server.id} {...server}/>)
            )}
        </Stack>
    );
}

export default RequestsByServer;