import { useActionState, } from "react";
import { Stack, Box, Typography, useTheme } from "@mui/material";
import { BrandColors, regionMarkerStates, TextColors } from "../../assets/themes/colors";

interface LoginFieldProps{
    label: string;
    name: string;
    type?: string;
    autoFocus?: boolean;
}

function LoginField({ label, name, type = 'text', autoFocus}: LoginFieldProps){
    const theme = useTheme();

    return(
        <Stack sx = {{
            gap: '6px',
            width: '100%',
        }}>
            <Typography sx={{
                fontWeight: 600,
                fontSize: '12px',
                color: theme.custom.adminSidebarMutedText,
            }}>
                {label}
            </Typography>

            <Box
                component = "input"
                name = {name}
                type = {type}
                autoFocus = {autoFocus}
                required
                sx = {{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    backgroundColor: theme.custom.adminInputBackground,
                    border: `1px solid ${theme.custom.adminSidebarBorder}`,
                    color: theme.palette.text.primary,
                    fontSize: '14px',
                }}
            />
        </Stack>
    );
}

interface LoginCardProps{
    onLogin: (usernamme: string, password:string) => Promise<void>;
}

function LoginCard({ onLogin} : LoginCardProps){
    const theme = useTheme();

    const [error, formAction, pending] = useActionState(
        async (_prevError: string | null, formData: FormData) => {
            const username = String(formData.get('username') ?? '');
            const password = String(formData.get('password') ?? '');

            try{
                await onLogin(username, password);
                return null;
            }
            catch{
                return 'Invalid username or password';
            }
        },
        null,
    );

    return(
        <Stack
            component = "form"
            action = {formAction}
            sx={{
                width: '400px',
                maxWidth: '100%',
                gap: '20px',
                padding: '32px',
                borderRadius: '16px',
                backgroundColor: theme.custom.adminSidebarBackground,
                border: `1px solid ${theme.custom.adminSidebarBorder}`,
        }}>
            <Typography sx={{
                fontWeight: 700,
                fontSize: '22px',
                color: theme.palette.text.primary
            }}>
                Admin Access
            </Typography>

            <Typography sx={{
                fontSize: '13px',
                color: theme.palette.text.secondary,
                marginTop: '-12px',
            }}>
                Sign in to manage Green-Shift's Admin Panel.
            </Typography>

            <LoginField label = "Username" name = "username" autoFocus />
            <LoginField label = "Password" name = "password" type = "password"/>

            <Box
                component = "button"
                type = "submit"
                disabled = {pending}
                sx = {{
                    width: '100%',
                    padding: '14px',
                    borderRadius:  '10px',
                    border: 'none',
                    cursor: pending ? 'default' : 'pointer',
                    opacity: pending ? 0.6 : 1,
                    backgroundColor: BrandColors.MainPrimary,
                    color: TextColors.DarkThemeWhite,
                    fontWeight: 600,
                    fontSize: '16px',
            }}>
                {pending ? 'Signing in... ' : 'Sign in'}
            </Box>

            {error && (
                <Typography sx={{
                    fontSize: '13px',
                    color: regionMarkerStates.offline.fill,
                }}>
                    {error}
                </Typography>
            )}
        </Stack>
    );
}

export default LoginCard;