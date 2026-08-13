import { Typography, Box, Stack, } from '@mui/material';
import { BrandColors, BackgroundColors, TextColors } from '../../../assets/themes/colors';

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
            width: {xs: '100%', sm: '100%', lg: '280px'},
            height: '155px',
            padding: '24px',
            gap: '8px',
            alignItems: {xs: 'center', md: 'self-start'},
            boxShadow: theme.custom.cardShadow,
            transition: 'background-color 0.5s ease, color 0.5s ease, box-shadow 0.5s ease',
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
                textAlign: {xs: 'center', md: 'left'},
            }}>
                {subtitle}
            </Typography>
        </Stack>
    )
}