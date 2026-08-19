import {Stack, Typography, useTheme, alpha} from '@mui/material'
import StatusDot from './StatusDot';
import { BrandColors } from '../assets/themes/colors';

interface StatusPillProps{
    active: boolean;
    label: string;
}

function StatusPill({ active, label, }: StatusPillProps) {
    const theme = useTheme();

    return (
        <Stack
            direction='row'
            sx={{
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                borderRadius: '20px',
                border: `1px solid ${active ? BrandColors.MainPrimary : theme.custom.adminSidebarBorder}`,
                backgroundColor: active ? alpha(BrandColors.MainPrimary, 0.14) : theme.custom.adminMutedSurface,
            }}>
                <StatusDot color = {active ? BrandColors.MainPrimary : theme.palette.text.secondary} size = '7px'/>
                <Typography sx={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: theme.palette.text.secondary,
                }}>
                    {label}
                </Typography>
        </Stack>
    );
}

export default StatusPill;