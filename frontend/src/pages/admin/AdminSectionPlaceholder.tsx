import { Stack, Typography } from "@mui/material";

interface AdminSectionPlaceholderProps {
    title: string;
}

function AdminSectionPlaceholder({ title }: AdminSectionPlaceholderProps) {
    return (
        <Stack sx={{ padding: '48px', gap: '8px' }}>
            <Typography variant="h4">{title}</Typography>
            <Typography color="text.secondary">
                Coming soon — this section will populate once the backend is connected.
            </Typography>
        </Stack>
    );
}

export default AdminSectionPlaceholder;