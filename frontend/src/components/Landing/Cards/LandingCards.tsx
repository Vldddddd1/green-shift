import { Typography, Box, Stack, } from '@mui/material';
import { BrandColors, BackgroundColors, TextColors, } from '../../../assets/themes/colors';

interface LandingCardProps {
    title: string;
    subtitle: string;
}

export const LandingCards = ({ title, subtitle }: LandingCardProps) => {
    return (
        <Stack sx={{
            backgroundColor: BackgroundColors.CardBackground,
            borderRadius: '16px',
            padding: 24,
            gap: 10,
        }}>
            <Box
                sx={{
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    backgroundColor: BrandColors.MainPrimary,
                }}
            />
            <Typography sx={{
                fontWeight: 'semi-bold',
                color: TextColors.LightThemeText,
                fontSize: 18,
            }}>
                {title}
            </Typography>
            <Typography sx={{
                color: TextColors.LightThemeGray,
                fontSize: 14,
            }}>
                {subtitle}
            </Typography>
        </Stack>
    )
}