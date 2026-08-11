import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { LandingCardsSection } from '../../frontend/src/components/Landing/Cards/LandingCardsSection'

const theme = createTheme()

describe('LandingCardsSection', () => {
    it('renders all four feature cards', () => {
        render(
            <ThemeProvider theme={theme}>
                <LandingCardsSection />
            </ThemeProvider>
        )

        expect(screen.getByText('Eco-Routing Engine')).toBeInTheDocument()
        expect(screen.getByText('Live Status Dashboard')).toBeInTheDocument()
        expect(screen.getByText('Carbon Savings Tally')).toBeInTheDocument()
        expect(screen.getByText('Containerized Demo')).toBeInTheDocument()
    })
})
