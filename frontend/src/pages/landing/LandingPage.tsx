import { useLayoutEffect, useState } from 'react';
import { Box, Button, Typography, Stack } from '@mui/material'
import { Link } from 'react-router';

import { useTheme, } from '@mui/material/styles'
import { useColorMode, } from '../../assets/themes/ThemeProvider'
import { TextColors, } from '../../assets/themes/colors'

import LogoDark from '../../assets/logos/mainLogoDark.svg?react';
import LogoLight from '../../assets/logos/mainLogoLight.svg?react';

import { LandingCardsSection } from '../../components/Landing/Cards/LandingCardsSection';

function LandingPage() {
    const { toggleColorMode } = useColorMode();
    const theme = useTheme();

    const Logo = theme.palette.mode === 'dark' ? LogoDark : LogoLight;
    const titleColor = theme.palette.mode === 'dark' ? TextColors.DarkThemeText : TextColors.LightThemeText;
    const bodyColor = theme.palette.mode === 'dark' ? TextColors.DarkThemeWhite : TextColors.LightThemeGray;
    const footerColor = theme.palette.mode === 'dark' ? TextColors.DarkThemeText : TextColors.LightThemeGray;

    // Tracks the cards grid's actual rendered width so the text block above
    // it (eyebrow/headline/paragraph) can be sized to match exactly, instead
    // of shrink-wrapping to its own content.
    const [cardsEl, setCardsEl] = useState<HTMLDivElement | null>(null);
    const [cardsWidth, setCardsWidth] = useState<number | null>(null);

    useLayoutEffect(() => {
        if (!cardsEl) return;

        const observer = new ResizeObserver(([entry]) => {
            setCardsWidth(entry.contentRect.width);
        });
        observer.observe(cardsEl);
        return () => observer.disconnect();
    }, [cardsEl]);

    const textStackWidth = cardsWidth ? `${cardsWidth}px` : theme.fluid.elementMaxWidth;

    return (
        <Stack sx={{
            position: 'relative',
            width: '100%',
            minHeight: { xs: 'auto', sm: '100dvh' },
            justifyContent: 'center',
            paddingTop: { xs: '5rem', sm: 0 },
        }}>
            <Stack sx={{
                gap: theme.fluid.sectionGap,
            }}>
                <Box sx={{
                    position: 'absolute',
                    top: { xs: '3%', sm: theme.fluid.edgeOffset },
                    left: { xs: '27%', sm: theme.fluid.edgeOffset },
                    userSelect: 'none',
                }}>
                    <Logo />
                </Box>
                <Stack sx={{
                    width: textStackWidth,
                    maxWidth: '100%',
                    alignSelf: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: theme.fluid.elementGap,
                }}>

                    <Typography sx={{
                        color: TextColors.MainGreen,
                        fontFamily: 'Sora',
                        fontSize: theme.fluid.textMd,
                        fontWeight: 'semi-bold',
                        userSelect: 'none',
                    }}>
                        ECO-ROUTING CLOUD BALANCER
                    </Typography>
                    <Typography sx={{
                        color: titleColor,
                        fontFamily: 'Sora',
                        fontSize: theme.fluid.textXl,
                        fontWeight: 'bold',
                        userSelect: 'none',
                    }}>
                        Route traffic to the cleanest grid, automatically.
                    </Typography>
                    <Typography sx={{
                        color: bodyColor,
                        fontSize: theme.fluid.textMd,
                        fontFamily: 'Sora',
                        userSelect: 'none',
                    }}>
                        Green-Shift shifts simulated web traffic between regions in real time based on live carbon intensity scores - cutting cloud emissions without cutting performance.
                    </Typography>
                </Stack>
                <Button variant="contained"
                    component={Link} to="/dashboard"
                    sx={{
                        width: theme.fluid.ctaWidth,
                        height: theme.fluid.ctaHeight,
                        alignSelf: 'center',
                        borderRadius: '32px',
                        userSelect: 'none',
                    }}>
                    View Live Dashboard →
                </Button>
                <Stack ref={setCardsEl} sx={{
                    alignSelf: 'center',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: { xs: theme.fluid.cardsMaxWidth, sm: '100%', lg: theme.fluid.cardsMaxWidth },
                }}>
                    <LandingCardsSection />
                </Stack>
                <Typography sx={{
                    position: { xs: 'static', sm: 'absolute' },
                    bottom: { xs: 'auto', sm: theme.fluid.edgeOffset },
                    alignSelf: 'center',
                    fontFamily: 'Sora',
                    fontSize: theme.fluid.textSm,
                    color: footerColor,
                    fontWeight: 300,
                    userSelect: 'none',
                }}>
                    Green-Shift - Eco-Routing Cloud Balancer  -  Simplified demo build
                </Typography>
            </Stack>
            <Stack sx={{
                position: 'absolute',
                top: theme.fluid.edgeOffset,
                right: theme.fluid.edgeOffset,
            }}>
                <Button variant="contained" onClick={toggleColorMode}
                    sx={{
                        width: theme.fluid.toggleWidth,
                        height: theme.fluid.toggleHeight,
                        borderRadius: '16px',
                        userSelect: 'none',
                    }}>
                    Theme
                </Button>
            </Stack>
        </Stack>
    );
}

export default LandingPage