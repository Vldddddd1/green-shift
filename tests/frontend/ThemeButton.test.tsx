import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { AppThemeProvider } from '../../frontend/src/assets/themes/ThemeProvider'
import ThemeButton from '../../frontend/src/components/ThemeButton'

describe('ThemeButton', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    it('renders a single toggle button', () => {
        render(
            <AppThemeProvider>
                <ThemeButton />
            </AppThemeProvider>
        )

        expect(screen.getAllByRole('button')).toHaveLength(1)
    })

    it('toggles and persists the theme mode when clicked', () => {
        render(
            <AppThemeProvider>
                <ThemeButton />
            </AppThemeProvider>
        )

        expect(localStorage.getItem('themeMode')).toBe('dark')

        fireEvent.click(screen.getByRole('button'))

        expect(localStorage.getItem('themeMode')).toBe('light')
    })
})
