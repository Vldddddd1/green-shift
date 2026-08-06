import { Box, Button, Typography, Stack } from '@mui/material'
import { Link } from 'react-router';

import { useTheme, } from '@mui/material/styles'
import { useColorMode, } from '../../assets/themes/ThemeProvider'
import { TextColors, } from '../../assets/themes/colors'

import LogoDark from '../../assets/logos/mainLogoDark.svg?react';
import LogoLight from '../../assets/logos/mainLogoLight.svg?react';

import { LandingCardsSection } from '../../components/Landing/Cards/LandingCardsSection';
import DashboardPage from '../dashboard';

function LandingPage() {
    const { toggleColorMode } = useColorMode();
    const theme = useTheme();

    return (
        theme.palette.mode === 'dark' ? (
            <>
                <Stack sx={{
                    position: 'relative',
                    width: '100%',
                    minHeight: '100vh',
                    justifyContent: 'center',
                }}>
                    <Box sx={{
                        position: 'absolute',
                        top: { xs: '16px', md: '32px' },
                        left: { xs: '16px', md: '32px' },
                        userSelect: 'none',
                    }}>
                        <LogoDark />
                    </Box>
                    <Stack sx={{
                        gap: 4,
                    }}>
                        <Stack sx={{
                            alignSelf: 'center',
                            alignItems: 'center',
                            maxWidth: { md: '800px' },
                            textAlign: 'center',
                            gap: 3,
                        }}>

                            <Typography sx={{
                                color: TextColors.MainGreen,
                                fontFamily: 'Sora',
                                fontSize: { md: '18px' },
                                fontWeight: 'semi-bold',
                                userSelect: 'none',
                            }}>
                                ECO-ROUTING CLOUD BALANCER
                            </Typography>
                            <Typography sx={{
                                color: TextColors.DarkThemeText,
                                fontFamily: 'Sora',
                                fontSize: { md: '56px' },
                                fontWeight: 'bold',
                                userSelect: 'none',
                            }}>
                                Route traffic to the cleanest grid, automatically.
                            </Typography>
                            <Typography sx={{
                                color: TextColors.DarkThemeWhite,
                                fontSize: { md: '18px' },
                                fontFamily: 'Sora',
                                userSelect: 'none',
                            }}>
                                Green-Shift shifts simulated web traffic between regions in real time based on live carbon intensity scores - cutting cloud emissions without cutting performance.
                            </Typography>
                        </Stack>
                        <Button variant="contained"
                            component = {Link} to="/dashboard"
                            sx={{
                                alignSelf: 'center',
                                width: { md: '320px' },
                                height: { md: '48px' },
                                borderRadius: '32px',
                                userSelect: 'none',
                            }}>
                            View Live Dashboard →
                        </Button>
                        <Stack sx={{
                            alignSelf: 'center',
                            alignItems: 'center',
                        }}>
                            <LandingCardsSection />
                        </Stack>
                    </Stack>
                </Stack>
                <Stack sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    bottom: { xs: '16px', md: '32px' },
                }}>
                    <Typography sx={{
                        position: 'absolute',
                        bottom: { xs: '16px', md: '32px' },
                        color: TextColors.DarkThemeWhite,
                        fontFamily: 'Sora',
                        fontSize: { md: '13px' },
                        fontWeight: 300,
                        userSelect: 'none',
                    }}>
                        Green-Shift - Eco-Routing Cloud Balancer  -  Simplified demo build
                    </Typography>
                </Stack>
                <Stack sx={{
                    display: 'flex',
                    position: 'absolute',
                    bottom: { xs: '16px', md: '128px' },
                    left: { xs: '16px', md: '32px' },
                }}>
                    <Button variant="contained" onClick={toggleColorMode}
                        sx={{
                            position: 'absolute',
                            width: { md: '80px' },
                            height: { md: '32px' },
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
                    minHeight: '100vh',
                    justifyContent: 'center',
                }}>
                    <Box sx={{
                        position: 'absolute',
                        top: { xs: '16px', md: '32px' },
                        left: { xs: '16px', md: '32px' },
                        userSelect: 'none',
                    }}>
                        <LogoLight />
                    </Box>
                    <Stack sx={{
                        gap: 4,
                    }}>
                        <Stack sx={{
                            alignSelf: 'center',
                            alignItems: 'center',
                            maxWidth: { md: '800px' },
                            textAlign: 'center',
                            gap: 3,
                        }}>

                            <Typography sx={{
                                color: TextColors.MainGreen,
                                fontFamily: 'Sora',
                                fontSize: { md: '18px' },
                                fontWeight: 'semi-bold',
                                userSelect: 'none',
                            }}>
                                ECO-ROUTING CLOUD BALANCER
                            </Typography>
                            <Typography sx={{
                                color: TextColors.LightThemeText,
                                fontFamily: 'Sora',
                                fontSize: { md: '56px' },
                                fontWeight: 'bold',
                                userSelect: 'none',
                            }}>
                                Route traffic to the cleanest grid, automatically.
                            </Typography>
                            <Typography sx={{
                                color: TextColors.LightThemeGray,
                                fontSize: { md: '18px' },
                                fontFamily: 'Sora',
                                userSelect: 'none',
                            }}>
                                Green-Shift shifts simulated web traffic between regions in real time based on live carbon intensity scores - cutting cloud emissions without cutting performance.
                            </Typography>
                        </Stack>
                        <Button variant="contained"
                            component = {Link} to="/dashboard"
                            sx={{
                                alignSelf: 'center',
                                width: { md: '320px' },
                                height: { md: '48px' },
                                borderRadius: '32px',
                                userSelect: 'none',
                            }}>
                            View Live Dashboard →
                        </Button>
                        <Stack sx={{
                            alignSelf: 'center',
                            alignItems: 'center',
                        }}>
                            <LandingCardsSection />
                        </Stack>
                    </Stack>
                </Stack>
                <Stack sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    bottom: { xs: '16px', md: '32px' },
                }}>
                    <Typography sx={{
                        position: 'absolute',
                        bottom: { xs: '16px', md: '32px' },
                        color: TextColors.LightThemeGray,
                        fontFamily: 'Sora',
                        fontSize: { md: '13px' },
                        fontWeight: 300,
                        userSelect: 'none',
                    }}>
                        Green-Shift - Eco-Routing Cloud Balancer  -  Simplified demo build
                    </Typography>
                </Stack>
                <Stack sx={{
                    display: 'flex',
                    position: 'absolute',
                    bottom: { xs: '16px', md: '128px' },
                    left: { xs: '16px', md: '32px' },
                }}>
                    <Button variant="contained" onClick={toggleColorMode}
                        sx={{
                            position: 'absolute',
                            width: { md: '80px' },
                            height: { md: '32px' },
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