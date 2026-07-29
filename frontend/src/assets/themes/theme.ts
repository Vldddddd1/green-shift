import { BrandColors, TextColors, BackgroundColors, shadows } from './colors.ts';
import type { PaletteMode } from '@mui/material';

export const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === 'dark'
            ? {
                background: {
                    default: BackgroundColors.DarkThemeBackground,
                },
                primary: {
                    main: BrandColors.MainPrimary,
                },
                text: {
                    primary: TextColors.DarkThemeText,
                    secondary: TextColors.DarkThemeGrey,
                },
                paper: {
                    backgroundColor: BackgroundColors.DarkThemeBackground,
                    'box-shadow': shadows.darkMode,
                    elevation: 1,
                }
            }
            : {
                background: {
                    default: BackgroundColors.LightThemeBackground,
                },
                primary: {
                    main: BrandColors.MainPrimary,
                },
                text: {
                    primary: TextColors.LightThemeText,
                    secondary: TextColors.LightThemeGray,
                },
                paper: {
                    backgroundColor: BackgroundColors.LightThemeBackground,
                    'box-shadow': shadows.lightMode,
                    elevation: 1,
                }
            }),
    },
    typography: {
        fontFamily: [
            'Sora',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            ].join(','),
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: mode === 'dark' ? shadows.darkMode : shadows.lightMode,
                    borderRadius: '8px',
                },
            },
        }
    }
});