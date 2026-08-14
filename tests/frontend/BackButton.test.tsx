import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { AppThemeProvider } from '../../frontend/src/assets/themes/ThemeProvider'
import BackButton from '../../frontend/src/components/BackButton'

describe('BackButton', () => {
    it('links back to the landing page', () => {
        render(
            <MemoryRouter>
                <AppThemeProvider>
                    <BackButton />
                </AppThemeProvider>
            </MemoryRouter>
        )

        const link = document.querySelector('a[href="/"]')
        expect(link).not.toBeNull()
    })
})
