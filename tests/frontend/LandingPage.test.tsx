import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { AppThemeProvider } from '../../frontend/src/assets/themes/ThemeProvider'
import LandingPage from '../../frontend/src/pages/landing/LandingPage'

describe('LandingPage', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    it('renders the hero heading and call to action', () => {
        render(
            <AppThemeProvider>
                <LandingPage />
            </AppThemeProvider>
        )

        expect(
            screen.getByText('Route traffic to the cleanest grid, automatically.')
        ).toBeInTheDocument()
        expect(screen.getByText('View Live Dashboard →')).toBeInTheDocument()
    })

    it('renders the landing feature cards', () => {
        render(
            <AppThemeProvider>
                <LandingPage />
            </AppThemeProvider>
        )

        expect(screen.getByText('Eco-Routing Engine')).toBeInTheDocument()
        expect(screen.getByText('Live Status Dashboard')).toBeInTheDocument()
    })

    it('toggles and persists the theme when the Theme button is clicked', () => {
        render(
            <AppThemeProvider>
                <LandingPage />
            </AppThemeProvider>
        )

        expect(localStorage.getItem('themeMode')).toBe('dark')

        fireEvent.click(screen.getByText('Theme'))

        expect(localStorage.getItem('themeMode')).toBe('light')
    })
})
