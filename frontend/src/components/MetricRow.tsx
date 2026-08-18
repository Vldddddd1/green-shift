import { Stack, Typography, useTheme } from "@mui/material";
import { NA } from "../assets/format"
import type { ReactNode } from "react";

export function MetricRow({ label, value, valueColor }: { label: string; value: ReactNode; valueColor?: string }) {
    const theme = useTheme()
    const isNA = value === NA;

    return (
        <Stack direction='row' sx={{
            justifyContent: 'space-between',
            width: '100%',
        }}>
            <Typography sx={{
                fontSize: {xs: '11px', md: '13px'},
                color: theme.palette.text.secondary
            }}>
                {label}
            </Typography>
            <Typography 
                component = 'span'
                sx={{
                    fontSize: {xs: '12px', md: '15px'},
                    fontWeight: 600,
                    color: isNA ? theme.palette.text.secondary : (valueColor ?? theme.palette.text.primary)
            }}>
                {value}
            </Typography>
        </Stack>
    );
}