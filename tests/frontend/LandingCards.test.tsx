import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { LandingCards } from '../../frontend/src/components/Landing/Cards/LandingCards'

const theme = createTheme()

describe('LandingCards', () => {
    it('renders the given title and subtitle', () => {
        render(
            <ThemeProvider theme={theme}>
                <LandingCards title="Eco-Routing Engine" subtitle="Some description" />
            </ThemeProvider>
        )

        expect(screen.getByText('Eco-Routing Engine')).toBeInTheDocument()
        expect(screen.getByText('Some description')).toBeInTheDocument()
    })
})
