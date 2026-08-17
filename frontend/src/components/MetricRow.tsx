import { Stack, Typography } from "@mui/material";
import { TextColors } from "../assets/themes/colors";
import { NA } from "../assets/format"
import type { ReactNode } from "react";

export function MetricRow({ label, value, valueColor }: { label: string; value: ReactNode; valueColor?: string }) {
    const isNA = value === NA;

    return (
        <Stack direction='row' sx={{
            justifyContent: 'space-between',
            width: '100%',
        }}>
            <Typography sx={{
                fontSize: {xs: '11px', md: '13px'},
                color: TextColors.OverviewContent
            }}>
                {label}
            </Typography>
            <Typography 
                component = 'span'
                sx={{
                    fontSize: {xs: '12px', md: '15px'},
                    fontWeight: 600,
                    color: isNA ? TextColors.DarkThemeGray : (valueColor ?? TextColors.DarkThemeText)
            }}>
                {value}
            </Typography>
        </Stack>
    );
}