import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { AppThemeProvider } from '../../frontend/src/assets/themes/ThemeProvider'
import Navbar from '../../frontend/src/components/Navbar'

function renderNavbar(onToggleOverview?: () => void) {
    return render(
        <MemoryRouter>
            <AppThemeProvider>
                <Navbar onToggleOverview={onToggleOverview} />
            </AppThemeProvider>
        </MemoryRouter>
    )
}

describe('Navbar', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    it('renders back and admin links', () => {
        renderNavbar()

        expect(document.querySelectorAll('a[href="/"]')).toHaveLength(1)
        expect(document.querySelectorAll('a[href="/admin"]')).toHaveLength(1)
    })

    it('renders the theme toggle and the mobile menu trigger as buttons', () => {
        renderNavbar()

        expect(document.querySelectorAll('button')).toHaveLength(2)
    })

    it('opens the mobile menu with theme, admin and overview options', () => {
        renderNavbar()

        const buttons = document.querySelectorAll('button')
        fireEvent.click(buttons[buttons.length - 1])

        expect(screen.getByText('Toggle Theme')).toBeInTheDocument()
        expect(screen.getByText('Admin Panel')).toBeInTheDocument()
        expect(screen.getByText('Live Routing Overview')).toBeInTheDocument()
    })

    it('calls onToggleOverview when the Live Routing Overview item is clicked', () => {
        const onToggleOverview = vi.fn()
        renderNavbar(onToggleOverview)

        const buttons = document.querySelectorAll('button')
        fireEvent.click(buttons[buttons.length - 1])
        fireEvent.click(screen.getByText('Live Routing Overview'))

        expect(onToggleOverview).toHaveBeenCalledOnce()
    })
})
