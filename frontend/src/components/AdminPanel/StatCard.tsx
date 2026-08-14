import { Stack, Typography, useTheme, } from '@mui/material';
import { TextColors } from '../../assets/themes/colors';
import { display } from './placeholders';

interface StatCardProps{
    label: string;
    value: string | number | null;
    helperText: string;
}

function StatCard({ label, value, helperText, }: StatCardProps){
    const theme = useTheme();

    return(
        <Stack sx={{
            flex: '1 1 220px',
            minWidth: 0,
            gap: '10px',
            padding: '20px',
            borderRadius: '16px',
            backgroundColor: theme.palette.background.default,
            border: `1px solid ${theme.custom.adminSidebarBorder}`,
            boxShadow: '0px 8px 10px rgba(0,0,0,0.15)',
        }}>
            <Typography sx={{
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '1px',
                color: TextColors.DarkThemeGray,
            }}>
                {label}
            </Typography>

            <Typography sx={{
                fontFamily: 'Sora',
                fontWeight: 700,
                fontSize: '32px',
                color: theme.palette.text.primary,
            }}>
                {display(value)}
            </Typography>

            <Typography sx={{
                fontSize: '12px',
                color: TextColors.OverviewContent,
            }}>
                {helperText}
            </Typography>
        </Stack>
    );
}

export default StatCard;