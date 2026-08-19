import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AppThemeProvider } from '../../frontend/src/assets/themes/ThemeProvider'
import { OverviewDetails } from '../../frontend/src/components/Dashboard/OverviewDetails'
import { useLiveMetrics } from '../../frontend/src/hooks/liveMetrics'
import type { LiveMetrics } from '../../frontend/src/hooks/liveMetrics'

vi.mock('../../frontend/src/hooks/liveMetrics', () => ({
    useLiveMetrics: vi.fn(),
}))

const EMPTY_METRICS: LiveMetrics = {
    activeRegion: null,
    servers: [],
    carbonSavedKg: null,
    savingsMultiplier: null,
    apiHealth: null,
    lastUpdate: null,
    recentSwitches: [],
    totalRequests: null,
    averageLatencyMs: null,
    carbonReductionPercent: null,
}

function mockMetrics(overrides: Partial<LiveMetrics>) {
    vi.mocked(useLiveMetrics).mockReturnValue({
        metrics: { ...EMPTY_METRICS, ...overrides },
        connected: true,
    })
}

function renderOverview() {
    return render(
        <AppThemeProvider>
            <OverviewDetails />
        </AppThemeProvider>
    )
}

describe('OverviewDetails', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    it('shows N/A placeholders before any data has loaded', () => {
        mockMetrics({})
        renderOverview()

        expect(screen.getAllByText('N/A').length).toBeGreaterThan(0)
    })

    it('shows the active region and carbon savings once data loads', () => {
        mockMetrics({
            activeRegion: 'eu-west',
            carbonSavedKg: 2.5,
            savingsMultiplier: 1.5,
            lastUpdate: '10:30',
        })
        renderOverview()

        expect(screen.getByText('eu-west')).toBeInTheDocument()
        expect(screen.getByText('2.5 kg CO2')).toBeInTheDocument()
        expect(screen.getByText('1.5')).toBeInTheDocument()
        expect(screen.getByText('10:30')).toBeInTheDocument()
    })

    it('shows Healthy status when the API is reachable', () => {
        mockMetrics({ apiHealth: 'healthy' })
        renderOverview()

        expect(screen.getByText('Healthy')).toBeInTheDocument()
    })

    it('shows Degraded status when the backend returns errors', () => {
        mockMetrics({ apiHealth: 'degraded' })
        renderOverview()

        expect(screen.getByText('Degraded')).toBeInTheDocument()
    })

    it('shows Offline status when the backend cannot be reached', () => {
        mockMetrics({ apiHealth: 'offline' })
        renderOverview()

        expect(screen.getByText('Offline')).toBeInTheDocument()
    })

    it('shows N/A for recent switches when none happened yet', () => {
        mockMetrics({ recentSwitches: [] })
        renderOverview()

        expect(screen.getByText('RECENT SWITCHES')).toBeInTheDocument()
        expect(screen.getAllByText('N/A').length).toBeGreaterThan(0)
    })

    it('lists recent zone switches, most recent first', () => {
        mockMetrics({
            recentSwitches: [
                { id: '1', time: '10:31', region: 'us-east' },
                { id: '2', time: '10:28', region: 'eu-west' },
            ],
        })
        renderOverview()

        expect(screen.getByText('10:31 - switched to us-east')).toBeInTheDocument()
        expect(screen.getByText('10:28 - switched to eu-west')).toBeInTheDocument()
    })
})
