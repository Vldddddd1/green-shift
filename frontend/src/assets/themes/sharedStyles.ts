import type { Theme, SxProps } from '@mui/material';

export function gradientBorderSx(theme: Theme): SxProps<Theme> {
    return {
        borderLeft: '3.5px solid transparent',
        borderRight: '3.5px solid transparent',
        borderBottom: '3.5px solid transparent',
        backgroundImage: `linear-gradient(${theme.palette.background.default}, ${theme.palette.background.default}), ${theme.custom.navBorderGradient}`,
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
        transition: 'background-color 0.5s ease, color 0.5s ease',
    };
}

export function gradientTopBarSx(theme: Theme): SxProps<Theme> {
    return {
        ...gradientBorderSx(theme),
        borderBottomLeftRadius: '32px',
        borderBottomRightRadius: '32px',
    };
}

export function floatingPanelSx(theme: Theme): SxProps<Theme> {
    return {
        borderTop: '3.5px solid transparent',
        borderLeft: '3.5px solid transparent',
        borderRight: '3.5px solid transparent',
        borderBottom: '3.5px solid transparent',
        backgroundImage: `linear-gradient(rgba(32, 32, 32, 0.8), rgba(32, 32, 32, 0.8)), ${theme.custom.navBorderGradient}`,
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
        transition: 'background-color 0.5s ease, color 0.5s ease',
        borderRadius: '18px',
        boxShadow: '0px 10px 24px 0px rgba(0,0,0,0.25)',
        userSelect: 'none',
        touchAction: 'none',
        cursor: 'grab',
        '&:active': { cursor: 'grabbing' }
    }
}