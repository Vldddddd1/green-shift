import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import DashboardPage from '../../frontend/src/pages/landing/dashboard/DashboardPage'

const theme = createTheme()

function renderDashboard() {
    return render(
        <ThemeProvider theme={theme}>
            <DashboardPage />
        </ThemeProvider>
    )
}

describe('DashboardPage', () => {
    let fetchMock: ReturnType<typeof vi.fn>

    beforeEach(() => {
        fetchMock = vi.fn()
        vi.stubGlobal('fetch', fetchMock)
    })

    afterEach(() => {
        vi.unstubAllGlobals()
    })

    it('shows a loading spinner before data arrives', () => {
        fetchMock.mockReturnValue(new Promise(() => {}))

        renderDashboard()

        expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })

    it('renders carbon scores and highlights the active region once data loads', async () => {
        fetchMock.mockImplementation((url: string) => {
            if (url.endsWith('/carbon')) {
                return Promise.resolve({
                    json: () =>
                        Promise.resolve({
                            'eu-west': { carbon_score: 25 },
                            'us-east': { carbon_score: 70 },
                        }),
                })
            }
            if (url.endsWith('/route')) {
                return Promise.resolve({
                    json: () => Promise.resolve({ selected_region: 'eu-west' }),
                })
            }
            return Promise.reject(new Error(`unexpected url ${url}`))
        })

        renderDashboard()

        await waitFor(() =>
            expect(screen.getByText('Green-Shift Dashboard')).toBeInTheDocument()
        )

        expect(screen.getByText('Carbon score: 25')).toBeInTheDocument()
        expect(screen.getByText('Carbon score: 70')).toBeInTheDocument()
        expect(screen.getByText('ACTIVE')).toBeInTheDocument()
        expect(screen.getByText('standby')).toBeInTheDocument()
    })
})
