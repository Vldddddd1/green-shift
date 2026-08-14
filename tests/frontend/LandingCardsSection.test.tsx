import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AppThemeProvider } from '../../frontend/src/assets/themes/ThemeProvider'
import { LandingCardsSection } from '../../frontend/src/components/Landing/LandingCardsSection'

describe('LandingCardsSection', () => {
    it('renders all four feature cards', () => {
        render(
            <AppThemeProvider>
                <LandingCardsSection />
            </AppThemeProvider>
        )

        expect(screen.getByText('Eco-Routing Engine')).toBeInTheDocument()
        expect(screen.getByText('Live Status Dashboard')).toBeInTheDocument()
        expect(screen.getByText('Carbon Savings Tally')).toBeInTheDocument()
        expect(screen.getByText('Containerized Demo')).toBeInTheDocument()
    })
})
