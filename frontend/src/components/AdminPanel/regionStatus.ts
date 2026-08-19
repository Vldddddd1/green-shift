import type { RegionMarkerState } from '../../assets/themes/colors';

// onlineAzCount === null - backend unreachable
// onlineAzCount === 0 - every AZ down
// 0 < onlineAzCount < azCount - partial up
// onlineAzCount >= azCount - full up

export function deriveRegionStatus(onlineAzCount: number | null, azCount: number): { state: RegionMarkerState; label: string}{
    if(onlineAzCount === null) return {state:'unavailable', label:'No live data'};
    if(onlineAzCount <= 0) return {state:'offline', label:'All AZs offline'};
    if(onlineAzCount >= azCount) return {state:'active', label:'All AZs online'};
    return {state: 'available', label: `${onlineAzCount} / ${azCount} AZs online`}
}