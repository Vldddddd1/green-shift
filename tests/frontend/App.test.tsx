import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AppThemeProvider } from '../../frontend/src/assets/themes/ThemeProvider'
import App from '../../frontend/src/App'

describe('App', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    it('renders the landing page inside the theme provider', () => {
        render(
            <AppThemeProvider>
                <App />
            </AppThemeProvider>
        )

        expect(
            screen.getByText('Route traffic to the cleanest grid, automatically.')
        ).toBeInTheDocument()
    })
})
