import { Button, Box } from '@mui/material'

import { useTheme, } from '@mui/material/styles'
import { useColorMode, } from '../../assets/themes/ThemeProvider'

import { BrandColors } from '../../assets/themes/colors'
import Moon from '../../assets/icons/Moon.svg?react'
import Sun from '../../assets/icons/Sun.svg?react'

function ThemeButton() {
    const { toggleColorMode } = useColorMode();
    const theme = useTheme();
    const Icon = theme.palette.mode === 'dark' ? Sun : Moon;

    return (
        <Button variant="contained" onClick={toggleColorMode}
            sx={{
                backgroundColor: BrandColors.MainPrimary,
                minWidth: 0,
                width: '32px',
                height: '32px',
                padding: 0,
                borderRadius: '50%',
            }}>
            <Icon width={16} height={16} />
        </Button>
    )
}

export default ThemeButton;