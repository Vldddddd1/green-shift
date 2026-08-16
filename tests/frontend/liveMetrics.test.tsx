import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import {
    useLiveMetrics,
    serversFromCarbonResponse,
} from '../../frontend/src/hooks/liveMetrics'

describe('serversFromCarbonResponse', () => {
    it('flattens zones into a flat server list and marks the selected server active', () => {
        const carbonData = {
            zones: {
                'eu-west': {
                    'eu-west-1': { carbon_score: 25, current_load: 10, latency: 20, status: 'online' },
                    'eu-west-2': { carbon_score: 27, current_load: 40, latency: 22, status: 'offline' },
                },
                'us-east': {
                    'us-east-1': { carbon_score: 70, current_load: 5, latency: 15, status: 'online' },
                },
            },
        }

        const servers = serversFromCarbonResponse(carbonData, 'eu-west-1')

        expect(servers).toHaveLength(3)
        expect(servers).toContainEqual({
            id: 'eu-west-1',
            region: 'eu-west',
            online: true,
            isActive: true,
            carbonIntensity: 25,
            requests: null,
            percent: null,
        })
        expect(servers).toContainEqual({
            id: 'eu-west-2',
            region: 'eu-west',
            online: false,
            isActive: false,
            carbonIntensity: 27,
            requests: null,
            percent: null,
        })
        expect(servers).toContainEqual({
            id: 'us-east-1',
            region: 'us-east',
            online: true,
            isActive: false,
            carbonIntensity: 70,
            requests: null,
            percent: null,
        })
    })
})

function Probe() {
    const { metrics, connected } = useLiveMetrics()
    return (
        <div>
            <span data-testid="connected">{String(connected)}</span>
            <span data-testid="active-region">{metrics.activeRegion ?? 'null'}</span>
            <span data-testid="carbon-saved">{metrics.carbonSavedKg ?? 'null'}</span>
            <span data-testid="multiplier">{metrics.savingsMultiplier ?? 'null'}</span>
            <span data-testid="api-health">{metrics.apiHealth ?? 'null'}</span>
        </div>
    )
}

describe('useLiveMetrics', () => {
    let fetchMock: ReturnType<typeof vi.fn>

    beforeEach(() => {
        fetchMock = vi.fn()
        vi.stubGlobal('fetch', fetchMock)
    })

    afterEach(() => {
        vi.unstubAllGlobals()
    })

    it('reports offline health when the backend is unreachable', async () => {
        fetchMock.mockRejectedValue(new Error('network error'))

        render(<Probe />)

        await waitFor(() => expect(screen.getByTestId('api-health')).toHaveTextContent('offline'))
        expect(screen.getByTestId('connected')).toHaveTextContent('false')
    })

    it('derives the active region and savings data from /carbon and /route', async () => {
        fetchMock.mockImplementation((url: string) => {
            if (url.endsWith('/carbon')) {
                return Promise.resolve({
                    ok: true,
                    json: () =>
                        Promise.resolve({
                            zones: {
                                'eu-west': {
                                    'eu-west-1': { carbon_score: 25, current_load: 10, latency: 20, status: 'online' },
                                },
                                'us-east': {
                                    'us-east-1': { carbon_score: 70, current_load: 5, latency: 15, status: 'online' },
                                },
                            },
                        }),
                })
            }
            if (url.endsWith('/route')) {
                return Promise.resolve({
                    ok: true,
                    json: () =>
                        Promise.resolve({
                            selected_zone: 'eu-west',
                            selected_server: 'eu-west-1',
                            server_response: { server: 'eu-west-1', zone: 'eu-west', status: 'ok' },
                            carbon_saved_kg: 0.15,
                            savings_multiplier: 1.5,
                        }),
                })
            }
            return Promise.reject(new Error(`unexpected url ${url}`))
        })

        render(<Probe />)

        await waitFor(() => expect(screen.getByTestId('api-health')).toHaveTextContent('healthy'))

        expect(screen.getByTestId('connected')).toHaveTextContent('true')
        expect(screen.getByTestId('active-region')).toHaveTextContent('eu-west')
        expect(screen.getByTestId('carbon-saved')).toHaveTextContent('0.15')
        expect(screen.getByTestId('multiplier')).toHaveTextContent('1.5')
    })
})
