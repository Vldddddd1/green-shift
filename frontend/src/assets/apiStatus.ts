import { BrandColors } from './themes/colors';

import type { APIStatus } from '../hooks/liveMetrics';

export const API_STATUS_CONFIG: Record<APIStatus, { label: string; color: string }> = {
    healthy: { label: 'Healthy', color: BrandColors.MainPrimary },
    degraded: { label: 'Degraded', color: '#E0A800' },
    offline: { label: 'Offline', color: '#C0392B' },
}