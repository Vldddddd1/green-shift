import { BrandColors, TextColors, BackgroundColors, shadows } from './colors.ts';
import type { PaletteMode } from '@mui/material';

// Fluid values: clamp(min, preferred, max)
// Below 966px it holds flat at min, above 1349px flat at max.
// See each key's usage in LandingPage.tsx for what it drives.
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
}

declare module '@mui/material/styles' {
    interface Theme {
        fluid: FluidTokens;
    }
    interface ThemeOptions {
        fluid?: FluidTokens;
    }
}

const fluid: FluidTokens = {
    // Corner anchor. The logo sits this far from the top-left corner, the
    // theme toggle this far from the top-right corner, and the same distance
    // pulls the footer credit up from the bottom - one number, three spots,
    // so the page reads as evenly margined instead of eyeballed per element.
    // e.g. <Box sx={{ top: theme.fluid.edgeOffset, right: theme.fluid.edgeOffset }}>
    edgeOffset: 'clamp(16px, calc(-24.35px + 4.18vw), 32px)',

    // Smallest text on the page. Right now that's only the footer credit line
    // ("Green-Shift - Eco-Routing Cloud Balancer - Simplified demo build").
    textSm: 'clamp(11px, calc(5.96px + 0.52vw), 13px)',

    // Shared by the small eyebrow label above the headline
    // ("ECO-ROUTING CLOUD BALANCER") and the paragraph below the headline -
    // they're not the same purpose but they read fine at the same size.
    textMd: 'clamp(14px, calc(3.91px + 1.04vw), 18px)',

    // The headline itself - "Route traffic to the cleanest grid,
    // automatically." The one thing on this page allowed to be huge.
    textXl: 'clamp(32px, calc(-28.53px + 6.27vw), 56px)',

    // Caps how wide the text block (eyebrow + headline + paragraph) is
    // allowed to get, so lines don't stretch edge-to-edge on a wide monitor.
    // Deliberately shares its max with cardsMaxWidth below, so on a big
    // screen the text column and the card grid line up at the same 800px -
    // on a small screen it's only ever equal to or narrower than the cards,
    // never wider.
    // e.g. the Stack wrapping the eyebrow/headline/paragraph, as `maxWidth`
    elementMaxWidth: 'clamp(320px, calc(-890.65px + 125.33vw), 800px)',

    // Caps how wide the card grid is allowed to get, so it doesn't sprawl
    // across a 27" monitor edge-to-edge.
    // e.g. the Stack wrapping <LandingCardsSection />, as `maxWidth`
    cardsMaxWidth: 'clamp(320px, calc(-890.65px + 125.33vw), 800px)',

    // Width of the "View Live Dashboard →" button.
    ctaWidth: 'clamp(240px, calc(38.23px + 20.89vw), 320px)',

    // Height of the "View Live Dashboard →" button.
    ctaHeight: 'clamp(40px, calc(19.82px + 2.09vw), 48px)',

    // Width of the small "Theme" toggle button in the corner.
    toggleWidth: 'clamp(64px, calc(23.65px + 4.18vw), 80px)',

    // Height of the small "Theme" toggle button in the corner.
    toggleHeight: 'clamp(28px, calc(17.91px + 1.04vw), 32px)',

    // Gap between the eyebrow, headline and paragraph inside the text block.
    // Tighter than sectionGap on purpose - these three lines are meant to
    // read as one group, not three separate sections.
    // e.g. the same Stack that uses elementMaxWidth, as `gap`
    elementGap: 'clamp(12px, calc(-8.18px + 2.09vw), 20px)',

    // Gap between the page's big sections - the text block, the CTA button,
    // and the card grid.
    // e.g. the outer Stack that holds all three, as `gap`
    sectionGap: 'clamp(12px, calc(-38.44px + 5.22vw), 32px)',
};

export const getDesignTokens = (mode: PaletteMode) => ({
    fluid,
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
                    transition: 'background-color 0.5s ease, color 0.5s ease, border-color 0.6s ease, box-shadow 0.5s ease',
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: mode === 'dark' ? shadows.darkMode : shadows.lightMode,
                    borderRadius: '8px',
                },
            },
        },
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true,
                disableTouchRipple: true,
            },
        },
    }
});