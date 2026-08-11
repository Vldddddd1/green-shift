import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { AppThemeProvider } from '../../frontend/src/assets/themes/ThemeProvider'
import LandingPage from '../../frontend/src/pages/landing/LandingPage'

function renderLandingPage() {
    return render(
        <MemoryRouter>
            <AppThemeProvider>
                <LandingPage />
            </AppThemeProvider>
        </MemoryRouter>
    )
}

describe('LandingPage', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    it('renders the hero heading and call to action', () => {
        renderLandingPage()

        expect(
            screen.getByText('Route traffic to the cleanest grid, automatically.')
        ).toBeInTheDocument()
        expect(screen.getByText('View Live Dashboard →')).toBeInTheDocument()
    })

    it('renders the landing feature cards', () => {
        renderLandingPage()

        expect(screen.getByText('Eco-Routing Engine')).toBeInTheDocument()
        expect(screen.getByText('Live Status Dashboard')).toBeInTheDocument()
    })

    it('links the call to action to the dashboard route', () => {
        renderLandingPage()

        const cta = screen.getByText('View Live Dashboard →').closest('a')
        expect(cta).toHaveAttribute('href', '/dashboard')
    })

    it('toggles and persists the theme when the theme button is clicked', () => {
        renderLandingPage()

        expect(localStorage.getItem('themeMode')).toBe('dark')

        const ctaButton = screen.getByText('View Live Dashboard →').closest('button')
        const themeButton = screen
            .getAllByRole('button')
            .find((button) => button !== ctaButton)!

        fireEvent.click(themeButton)

        expect(localStorage.getItem('themeMode')).toBe('light')
    })
})
