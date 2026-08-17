import { Stack, Typography, useTheme } from "@mui/material";
import { adminHeaderRowSx } from "./cardStyles";

import type { ReactNode } from "react";

interface AdminPageHeaderProps {
    title: string;
    subtitle: string;
    action?: ReactNode;
}
function AdminPageHeader({ title, subtitle, action }: AdminPageHeaderProps) {
    const theme = useTheme();

    return (
        <Stack
            direction={{ xs: 'column', sm: 'row' }}
            sx={
                adminHeaderRowSx
            }>
            <Stack sx={{
                flex: '1 0 0',
                gap: '4px',
            }}>
                <Typography sx={{
                    fontWeight: 800,
                    fontSize: '30px',
                    color: theme.palette.text.primary,
                }}>
                    {title}
                </Typography>
                <Typography sx={{
                    fontSize: '14px',
                    color: theme.palette.text.secondary,
                }}>
                    {subtitle}
                </Typography>
            </Stack>

                {action}

        </Stack>
    );
}

export default AdminPageHeader;