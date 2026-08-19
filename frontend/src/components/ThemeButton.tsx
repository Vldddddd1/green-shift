import { useTheme, } from '@mui/material/styles'
import { useColorMode, } from '../assets/themes/ThemeProvider'
import RoundedIconButton from './RoundedIconButton'
import Moon from '../assets/icons/Moon.svg?react'
import Sun from '../assets/icons/Sun.svg?react'

function ThemeButton() {
    const { toggleColorMode } = useColorMode();
    const theme = useTheme();
    const Icon = theme.palette.mode === 'dark' ? Sun : Moon;

    return (
        <RoundedIconButton
            onClick = {toggleColorMode}
            icon = {<Icon width={16} height={16} style={{ color: theme.custom.themeIconColor }} />}
        />
    );
}

export default ThemeButton;