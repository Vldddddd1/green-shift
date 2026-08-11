import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { useTheme } from '@mui/material/styles'
import { AppThemeProvider, useColorMode } from '../../frontend/src/assets/themes/ThemeProvider'

function Probe() {
    const { mode, toggleColorMode } = useColorMode()
    const theme = useTheme()
    return (
        <div>
            <span data-testid="mode">{mode}</span>
            <span data-testid="palette-mode">{theme.palette.mode}</span>
            <button onClick={toggleColorMode}>toggle</button>
        </div>
    )
}

describe('AppThemeProvider', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    it('defaults to dark mode when nothing is stored', () => {
        render(
            <AppThemeProvider>
                <Probe />
            </AppThemeProvider>
        )

        expect(screen.getByTestId('mode')).toHaveTextContent('dark')
        expect(screen.getByTestId('palette-mode')).toHaveTextContent('dark')
    })

    it('reads the persisted mode from localStorage on mount', () => {
        localStorage.setItem('themeMode', 'light')

        render(
            <AppThemeProvider>
                <Probe />
            </AppThemeProvider>
        )

        expect(screen.getByTestId('mode')).toHaveTextContent('light')
    })

    it('toggles the mode and persists the new value', () => {
        render(
            <AppThemeProvider>
                <Probe />
            </AppThemeProvider>
        )

        fireEvent.click(screen.getByText('toggle'))

        expect(screen.getByTestId('mode')).toHaveTextContent('light')
        expect(screen.getByTestId('palette-mode')).toHaveTextContent('light')
        expect(localStorage.getItem('themeMode')).toBe('light')
    })
})
