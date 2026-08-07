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
        theme.palette.mode === 'dark' ? (
            <>
                <Stack sx={{
                    position: 'relative',
                    width: '100%',
                    minHeight: { xs: 'auto', sm: '100dvh' },
                    paddingTop: { xs: '5rem', sm: 0 },
                    justifyContent: 'center',
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
                            <LogoDark />
                        </Box>
                        <Stack sx={{
                            alignSelf: 'center',
                            alignItems: 'center',
                            width: textStackWidth,
                            maxWidth: '100%',
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
                                color: TextColors.DarkThemeText,
                                fontFamily: 'Sora',
                                fontSize: theme.fluid.textXl,
                                fontWeight: 'bold',
                                userSelect: 'none',
                            }}>
                                Route traffic to the cleanest grid, automatically.
                            </Typography>
                            <Typography sx={{
                                color: TextColors.DarkThemeWhite,
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
                                alignSelf: 'center',
                                width: theme.fluid.ctaWidth,
                                height: theme.fluid.ctaHeight,
                                borderRadius: '32px',
                                userSelect: 'none',
                            }}>
                            View Live Dashboard →
                        </Button>
                        <Stack ref={setCardsEl} sx={{
                            alignSelf: 'center',
                            alignItems: 'center',
                            maxWidth: { xs: theme.fluid.cardsMaxWidth, sm: '100%', lg: theme.fluid.cardsMaxWidth },
                            width: '100%',
                        }}>
                            <LandingCardsSection />
                        </Stack>
                        <Typography sx={{
                            position: { xs: 'static', sm: 'absolute' },
                            bottom: { xs: 'auto', sm: theme.fluid.edgeOffset },
                            alignSelf: 'center',
                            color: TextColors.DarkThemeText,
                            fontFamily: 'Sora',
                            fontSize: theme.fluid.textSm,
                            fontWeight: 300,
                            userSelect: 'none',
                        }}>
                            Green-Shift - Eco-Routing Cloud Balancer  -  Simplified demo build
                        </Typography>
                    </Stack>
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
            </>
        ) :
            <>
                <Stack sx={{
                    position: 'relative',
                    width: '100%',
                    minHeight: { xs: 'auto', sm: '100dvh' },
                    paddingTop: { xs: '5rem', sm: 0 },
                    justifyContent: 'center',
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
                            <LogoLight />
                        </Box>
                        <Stack sx={{
                            alignSelf: 'center',
                            alignItems: 'center',
                            width: textStackWidth,
                            maxWidth: '100%',
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
                                color: TextColors.LightThemeText,
                                fontFamily: 'Sora',
                                fontSize: theme.fluid.textXl,
                                fontWeight: 'bold',
                                userSelect: 'none',
                            }}>
                                Route traffic to the cleanest grid, automatically.
                            </Typography>
                            <Typography sx={{
                                color: TextColors.LightThemeGray,
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
                                alignSelf: 'center',
                                width: theme.fluid.ctaWidth,
                                height: theme.fluid.ctaHeight,
                                borderRadius: '32px',
                                userSelect: 'none',
                            }}>
                            View Live Dashboard →
                        </Button>
                        <Stack ref={setCardsEl} sx={{
                            alignSelf: 'center',
                            alignItems: 'center',
                            maxWidth: { xs: theme.fluid.cardsMaxWidth, sm: '100%', lg: theme.fluid.cardsMaxWidth },
                            width: '100%',
                        }}>
                            <LandingCardsSection />
                        </Stack>
                        <Typography sx={{
                            position: { xs: 'static', sm: 'absolute' },
                            bottom: { xs: 'auto', sm: theme.fluid.edgeOffset },
                            alignSelf: 'center',
                            color: TextColors.LightThemeGray,
                            fontFamily: 'Sora',
                            fontSize: theme.fluid.textSm,
                            fontWeight: 300,
                            userSelect: 'none',
                        }}>
                            Green-Shift - Eco-Routing Cloud Balancer  -  Simplified demo build
                        </Typography>
                    </Stack>
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
            </>
    )
}

export default LandingPage