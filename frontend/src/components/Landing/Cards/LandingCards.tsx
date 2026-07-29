import { Typography, Box, Stack, } from '@mui/material';
import { BrandColors, BackgroundColors, TextColors, shadows } from '../../../assets/themes/colors';

import { useTheme, } from '@mui/material/styles'

interface LandingCardProps {
    title: string;
    subtitle: string;
}

export const LandingCards = ({ title, subtitle }: LandingCardProps) => {
    const theme = useTheme();

    return (
        <Stack sx={{
            backgroundColor: BackgroundColors.CardBackground,
            borderRadius: '16px',
            padding: '24px',
            gap: '8px',
            width: {md: '280px'},
            height: {md: '155px'},
            boxShadow: theme.palette.mode === 'dark' ? shadows.darkMode : shadows.lightMode
        }}>
            <Box
                sx={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: BrandColors.MainPrimary,
                    userSelect: 'none',
                }}
            />
            <Typography sx={{
                color: TextColors.LightThemeText,
                fontFamily: 'Sora',
                fontWeight: 'bold',
                fontSize: '16px',
                userSelect: 'none',
            }}>
                {title}
            </Typography>
            <Typography sx={{
                color: TextColors.LightThemeGray,
                fontFamily: 'Sora',
                fontWeight: 400,
                fontSize: '12px',
                userSelect: 'none',
            }}>
                {subtitle}
            </Typography>
        </Stack>
    )
}