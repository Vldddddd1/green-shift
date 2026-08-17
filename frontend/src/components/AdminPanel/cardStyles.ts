import type { Theme } from '@mui/material';
import type { SxProps } from '@mui/material';

export function adminCardSx(theme: Theme): SxProps<Theme> {
    return{
        width: '100%',
        padding: '24px',
        borderRadius: '16px',
        backgroundColor: theme.palette.background.default,
        border: `1px solid ${theme.custom.adminSidebarBorder}`,
        boxShadow: '0px 8px 20px rgba(0,0,0,0.15)',
    };
}

export const adminCardTitleSx = {
    fontFamily: 'Sora',
    fontWeight: 600,
    fontSize: '17px',
}

export const adminPageSx: SxProps<Theme> = {
    gap: {xs: '20px', sm: '28px'},
    padding: {xs: '20px', sm: '28px', md: '40px'},
    width: '100%',
}

export const adminHeaderRowSx: SxProps<Theme> = {
    alignItems: {xs: 'flex-start', sm: 'center'},
    gap: {xs: '12px', sm: 0},
    width: '100%',
}