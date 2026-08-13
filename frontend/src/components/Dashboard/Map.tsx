import { Box, useTheme } from '@mui/material';
import { MapContainer, TileLayer, Marker, ZoomControl } from 'react-leaflet';

import { regionMarkerStates } from '../../assets/themes/colors';
import type { RegionMarkerState } from '../../assets/themes/colors';

import L from 'leaflet';

const WORLD_BOUNDS = L.latLngBounds([-60, -180], [85, 180]);

interface Region {
    id: string;
    name: string;
    lat: number;
    lng: number;
}

interface RegionMapProps {
    regions: Region[];
    height?: string;
    activeZone?: string | null;
}

function buildMarkerIcon(state: RegionMarkerState){
    const { fill, stroke } = regionMarkerStates[state];
    const isActive = state === 'active';

    return L.divIcon({
        className: `region-marker region-marker--${state}`,
        html: isActive
        ?`<span class = "region-marker__glow" style = "background:${fill}"</span>
        <span class = "region-marker__core" style = "background:${fill};border-color:${stroke}"></span>`
        : `<span class = "region-marker__core" style = "background:${fill};border-color:${stroke}"></span>`,
        iconSize: isActive? [56, 56] : [20, 20],
        iconAnchor: isActive? [28, 28] : [10, 10],
    });
}

const MARKER_ICONS: Record<RegionMarkerState, L.DivIcon> = {
    active: buildMarkerIcon('active'),
    available: buildMarkerIcon('available'),
    unavailable: buildMarkerIcon('unavailable'),
    offline: buildMarkerIcon('offline'),
};

export const RegionMap = ({ regions, height = '500px', activeZone = null }: RegionMapProps) => {
    const theme = useTheme();

    return (
        <Box sx={{
            position: 'relative',
            width: '100svw',
            height: '100svh',
            overflow: 'hidden',
            '& .leaflet-container': {
                backgroundColor: theme.palette.background.default,
            },
            '& .leaflet-top.leaflet-right': {
                marginTop: `calc(${theme.fluid.navbarHeight} + 0px)`,
                marginRight: '16px'
            },
            '& .leaflet-div-icon': {
                background: 'transparent',
                border: 'none',
            },
            '& .region-marker': {
                position: 'absolute',
            },
            '& .region-marker__core': {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                border: '3px solid',
                boxSizing: 'border-box', 
            },
            '& .region-marker__glow': {
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                opacity: 0.25,
                animation: 'region-marker-pulse 1.6 infinite',
            },
            '@keyframes region-marker-pulse': {
                '0%': {transform: 'scale(0.85)', opacity: 0.35},
                '70%': {transform: 'scale(1.1)', opacity: 0.05},
                '100%': {transform: 'scale(0.85)', opacity: 0.35},
            },
        }}>
            <MapContainer
                center={[50, 20]}
                zoom={5}
                minZoom={3}
                maxZoom={15}
                zoomControl={false}
                maxBounds={WORLD_BOUNDS}
                maxBoundsViscosity={1.0}
                style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url={theme.custom.mapTileUrl}
                    noWrap={true}
                    attribution='© OpenStreetMap, © CARTO' />
                {regions.map(r => {
                    const state: RegionMarkerState = activeZone && r.name.startsWith(activeZone) ? 'active' : 'available';

                    return(
                        <Marker
                            key = {r.id}
                            position = {[r.lat, r.lng]}
                            icon = {MARKER_ICONS[state]}
                        />
                    );
                })}
                <ZoomControl position="topright" />
            </MapContainer>
        </Box>

    );
};
