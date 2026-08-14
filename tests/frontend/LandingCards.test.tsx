import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AppThemeProvider } from '../../frontend/src/assets/themes/ThemeProvider'
import { LandingCards } from '../../frontend/src/components/Landing/LandingCards'

describe('LandingCards', () => {
    it('renders the given title and subtitle', () => {
        render(
            <AppThemeProvider>
                <LandingCards title="Eco-Routing Engine" subtitle="Some description" />
            </AppThemeProvider>
        )

        expect(screen.getByText('Eco-Routing Engine')).toBeInTheDocument()
        expect(screen.getByText('Some description')).toBeInTheDocument()
    })
})
