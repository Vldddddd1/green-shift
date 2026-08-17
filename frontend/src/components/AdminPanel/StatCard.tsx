import { Stack, Typography, useTheme, } from '@mui/material';
import { display } from '../../assets/format';
import { adminCardSx } from './cardStyles';

interface StatCardProps{
    label: string;
    value: string | number | null;
    helperText: string;
}

function StatCard({ label, value, helperText, }: StatCardProps){
    const theme = useTheme();

    return(
        <Stack sx={{
            ...adminCardSx(theme),
            flex: '1 1 220px',
            minWidth: 0,
            padding: '20px',
            gap: '10px',
            boxShadow: '0px 8px 10px rgba(0,0,0,0.15)',
        }}>
            <Typography sx={{
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '1px',
                color: theme.palette.text.secondary,
            }}>
                {label}
            </Typography>

            <Typography sx={{
                fontWeight: 700,
                fontSize: '32px',
                color: theme.palette.text.primary,
            }}>
                {display(value)}
            </Typography>

            <Typography sx={{
                fontSize: '12px',
                color: theme.palette.text.secondary,
            }}>
                {helperText}
            </Typography>
        </Stack>
    );
}

export default StatCard;