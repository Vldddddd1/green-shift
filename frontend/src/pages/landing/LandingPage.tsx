import { Box, Button, Grid, Typography, Stack } from '@mui/material'
// import React from 'react'
import { useTheme } from '@mui/material/styles'
import { useColorMode } from '../../assets/themes/ThemeProvider'

import LogoDark from '../../assets/logos/mainLogoDark.svg?react';
import LogoLight from '../../assets/logos/mainLogoLight.svg?react';

function LandingPage() {
    const { toggleColorMode } = useColorMode();
    const theme = useTheme();

    return (
        theme.palette.mode === 'dark' ? (
            <Stack sx={{
                backgroundColor: theme.palette.background.default,
            }}>
                <LogoDark />
                <Typography sx={{
                    color: theme.palette.text.primary,
                    fontSize: '18px',
                    fontFamily: 'Sora',
                }}>
                    ECO-ROUTING CLOUD BALANCER
                </Typography>
                <Typography sx={{
                    color: theme.palette.text.primary,
                    fontSize: '56px',
                    fontFamily: 'Sora',
                }}>
                    Route traffic to the cleanest grid, automatically.
                </Typography>
                <Typography sx={{
                    color: theme.palette.text.primary,
                    fontSize: '18px',
                    fontFamily: 'Sora',
                }}>
                    Green-Shift shifts simulated web traffic between regions in real time based on live carbon intensity scores - cutting cloud emissions without cutting performance.
                </Typography>
                <Button variant="contained" onClick={toggleColorMode}
                    sx={{
                        width: '320px',
                        height: '48px',
                        borderRadius: '32px',
                    }}>
                    View Live Dashboard →
                </Button>
            </Stack>
        ) :
            <Stack sx={{
                backgroundColor: theme.palette.background.default,
            }}>
                <LogoLight />
                <Typography sx={{
                    color: theme.palette.text.primary,
                    fontSize: '18px',
                    fontFamily: 'Sora',
                }}>
                    ECO-ROUTING CLOUD BALANCER
                </Typography>
                <Typography sx={{
                    color: theme.palette.text.primary,
                    fontSize: '56px',
                    fontFamily: 'Sora',
                }}>
                    Route traffic to the cleanest grid, automatically.
                </Typography>
                <Typography sx={{
                    color: theme.palette.text.primary,
                    fontSize: '18px',
                    fontFamily: 'Sora',
                }}>
                    Green-Shift shifts simulated web traffic between regions in real time based on live carbon intensity scores - cutting cloud emissions without cutting performance.
                </Typography>
                <Button variant="contained" onClick={toggleColorMode}
                    sx={{
                        width: '320px',
                        height: '48px',
                        borderRadius: '32px',
                    }}>
                    View Live Dashboard →
                </Button>
            </Stack>
    )
}

export default LandingPage