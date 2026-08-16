import { Stack, Typography, useTheme, } from '@mui/material';
import { adminCardSx, adminCardTitleSx } from './cardStyles';

export interface SimulationLogEntry{
    id: string;
    summary: string;
}

interface RecentSimulationsProps{
    simulations: SimulationLogEntry[];
}

function RecentSimulations({ simulations }: RecentSimulationsProps){
    const theme = useTheme();

    return(
        <Stack sx={{
            ...adminCardSx(theme),
            gap: '16px',
        }}>
            <Typography sx = {{
                ...adminCardTitleSx,
                color: theme.palette.text.primary,
            }}>
                Recent Simulations
            </Typography>

            {simulations.length === 0 ? (
                <Typography sx={{
                    fontSize: '12px',
                    color: theme.palette.text.secondary
                }}>
                    No simulations recorded yet.
                </Typography>
            ) : (
                simulations.map(entry => (
                    <Typography
                        key = {entry.id}
                        sx = {{
                            fontSize: '12px',
                            color: theme.palette.text.secondary,
                        }}
                    >
                        {entry.summary}
                    </Typography>
                ))
            )}
        </Stack>
    );
}

export default RecentSimulations;