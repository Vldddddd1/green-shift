import type { CSSProperties } from 'react';

import { useTheme } from '@mui/material/styles';

import LogoDark from '../assets/logos/mainLogoDark.svg?react';
import LogoLight from '../assets/logos/mainLogoLight.svg?react';

interface LogoProps {
    style?: CSSProperties;
}

export const Logo = ({ style }: LogoProps) => {
    const theme = useTheme();
    const Icon = theme.palette.mode === 'dark' ? LogoDark : LogoLight;

    return <Icon style={style} />;
};
