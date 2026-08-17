import { BrandColors, TextColors, BackgroundColors, shadows } from './colors.ts';
import type { PaletteMode } from '@mui/material';

// Fluid values: clamp(min, preferred, max)
export interface FluidTokens {
    edgeOffset: string;
    textSm: string;
    textMd: string;
    textXl: string;
    elementMaxWidth: string;
    cardsMaxWidth: string;
    ctaWidth: string;
    ctaHeight: string;
    toggleWidth: string;
    toggleHeight: string;
    elementGap: string;
    sectionGap: string;
    navbarHeight: string;
    sidebarWidth: string;
}

// `theme.palette.mode === 'dark' ? a : b` ternary.
export interface CustomTokens {
    navBorderGradient: string;
    backIconColor: string;
    themeIconColor: string;
    mapTileUrl: string;
    landingBodyColor: string;
    landingFooterColor: string;
    cardShadow: string;
    adminSidebarBackground: string;
    adminSidebarBorder: string;
    adminSidebarMutedText: string;
    adminMutedSurface: string;
    adminInputBackground: string;
}

declare module '@mui/material/styles' {
    interface Theme {
        fluid: FluidTokens;
        custom: CustomTokens;
    }
    interface ThemeOptions {
        fluid?: FluidTokens;
        custom?: CustomTokens;
    }
}

const fluid: FluidTokens = {
    // Corner anchor.
    edgeOffset: 'clamp(16px, calc(-24.35px + 4.18vw), 32px)',

    // ("Green-Shift - Eco-Routing Cloud Balancer - Simplified demo build").
    textSm: 'clamp(11px, calc(5.96px + 0.52vw), 13px)',

    // ("ECO-ROUTING CLOUD BALANCER") and the paragraph below the headline
    textMd: 'clamp(14px, calc(3.91px + 1.04vw), 18px)',

    // The headline itself - "Route traffic to the cleanest grid, automatically."
    textXl: 'clamp(32px, calc(-28.53px + 6.27vw), 56px)',

    // e.g. the Stack wrapping the eyebrow/headline/paragraph, as `maxWidth`
    elementMaxWidth: 'clamp(320px, calc(-890.65px + 125.33vw), 800px)',

    // e.g. the Stack wrapping <LandingCardsSection />, as `maxWidth`
    cardsMaxWidth: 'clamp(320px, calc(-890.65px + 125.33vw), 800px)',

    // Width of the "View Live Dashboard" button.
    ctaWidth: 'clamp(240px, calc(38.23px + 20.89vw), 320px)',

    // Height of the "View Live Dashboard" button.
    ctaHeight: 'clamp(40px, calc(19.82px + 2.09vw), 48px)',

    // Width of the small "Theme" toggle button in the corner.
    toggleWidth: 'clamp(64px, calc(23.65px + 4.18vw), 80px)',

    // Height of the small "Theme" toggle button.
    toggleHeight: 'clamp(28px, calc(17.91px + 1.04vw), 32px)',

    // e.g. the same Stack that uses elementMaxWidth, as `gap`
    elementGap: 'clamp(12px, calc(-8.18px + 2.09vw), 20px)',

    // Gap between the page's big sections - the text block, the CTA button,
    // and the card grid.
    // e.g. the outer Stack that holds all three, as `gap`
    sectionGap: 'clamp(12px, calc(-38.44px + 5.22vw), 32px)',

    navbarHeight: 'clamp(48px, calc(15.65px + 4.18vw), 64px)',

    sidebarWidth: '280px',
};

export const getDesignTokens = (mode: PaletteMode) => {
    const custom: CustomTokens = mode === 'dark' ? {
        navBorderGradient: `linear-gradient(90deg, ${BrandColors.MainPrimary} 40%, ${TextColors.DarkThemeText} 100%)`,
        backIconColor: TextColors.DarkThemeWhite,
        themeIconColor: TextColors.DarkThemeWhite,
        mapTileUrl: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        landingBodyColor: TextColors.DarkThemeWhite,
        landingFooterColor: TextColors.DarkThemeText,
        cardShadow: shadows.darkMode,
        adminSidebarBackground: BackgroundColors.AdminSidebarDark,
        adminSidebarBorder: 'rgba(255,255,255,0.08)',
        adminSidebarMutedText: TextColors.OverviewContent,
        adminMutedSurface: 'rgba(255,255,255,0.03)',
        adminInputBackground: 'rgba(0,0,0,0.25)'
    } : {
        navBorderGradient: `linear-gradient(90deg, ${BrandColors.MainPrimary} 40%, ${TextColors.LightThemeText} 100%)`,
        backIconColor: TextColors.LightThemeText,
        themeIconColor: TextColors.LightThemeText,
        mapTileUrl: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        landingBodyColor: TextColors.LightThemeGray,
        landingFooterColor: TextColors.LightThemeGray,
        cardShadow: shadows.lightMode,
        adminSidebarBackground: BackgroundColors.CardBackground,
        adminSidebarBorder: 'rgba(0,0,0,0.08)',
        adminSidebarMutedText: TextColors.LightThemeGray,
        adminMutedSurface: 'rgba(0,0,0,0.03)',
        adminInputBackground: 'rgba(255,255,255,255.25)'
    };

    return {
    fluid,
    custom,
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
                    secondary: TextColors.DarkThemeGray,
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
        MuiCssBaseline: {
            styleOverrides: {
                '*': {
                    transition: 'background-color 0.5s ease, color 0.5s ease',
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: custom.cardShadow,
                    borderRadius: '8px',
                    transition: 'background-color 0.5s ease, color 0.5s ease, box-shadow 0.5s ease',
                },
            },
        },
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true,
                disableTouchRipple: true,
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    transition: 'background-color 0.5s ease, color 0.5s ease',
                },
            },
        },
    }
    };
};