import { Box, useTheme } from '@mui/material';
import { MapContainer, TileLayer, Marker, ZoomControl, Tooltip, useMap, useMapEvents } from 'react-leaflet';

import { regionMarkerStates, TextColors } from '../../assets/themes/colors';
import type { RegionMarkerState } from '../../assets/themes/colors';

import L from 'leaflet';
import { useState, useCallback, useEffect, useRef } from 'react';
import type { ServerStatus } from '../../hooks/liveMetrics';
import { RegionDetailsPanel } from './RegionDetailsPanel';

const WORLD_BOUNDS = L.latLngBounds([-60, -180], [85, 180]);

interface Region {
    id: string;
    name: string;
    geography: string;
    lat: number;
    lng: number;
}

interface RegionMapProps {
    regions: Region[];
    height?: string;
    servers: ServerStatus[];
}

function buildMarkerIcon(state: RegionMarkerState) {
    const { fill, stroke } = regionMarkerStates[state];
    const isActive = state === 'active';

    return L.divIcon({
        className: `region-marker region-marker--${state}`,
        html: isActive
            ? `<span class = "region-marker__glow" style = "background:${fill}"></span>
        <span class = "region-marker__core" style = "background:${fill};border-color:${stroke}"></span>`
            : `<span class = "region-marker__core" style = "background:${fill};border-color:${stroke}"></span>`,
        iconSize: isActive ? [56, 56] : [20, 20],
        iconAnchor: isActive ? [28, 28] : [10, 10],
    });
}

const MARKER_ICONS: Record<RegionMarkerState, L.DivIcon> = {
    active: buildMarkerIcon('active'),
    available: buildMarkerIcon('available'),
    unavailable: buildMarkerIcon('unavailable'),
    offline: buildMarkerIcon('offline'),
};

const PANEL_WIDTH = 300;
const PANEL_OFFSET_X = 24;
const PANEL_OFFSET_Y = -40;

function stateForRegion(region: Region, servers: ServerStatus[]): RegionMarkerState {
    const match = servers.find(s => s.id === region.name)
    if (!match) return 'unavailable';
    if (match.isActive) return 'active';
    return match.online ? 'available' : 'offline';
}

function MapPanelSync({ selected, panelHeight, onPosition, onClose }: { selected: Region | null; panelHeight: number; onPosition: (pos: { x: number; y: number }) => void; onClose: () => void }) {
    const map = useMap();

    const recompute = useCallback(() => {
        if (!selected) return;
        const point = map.latLngToContainerPoint([selected.lat, selected.lng]);
        const left = point.x + PANEL_OFFSET_X;
        const top = point.y + PANEL_OFFSET_Y;
        const right = left + PANEL_WIDTH;
        const bottom = top + panelHeight;

        const fullyOffScreen = right <= 0 || bottom <= 0 || left >= window.innerWidth || top >= window.innerHeight;
        if (fullyOffScreen) {
            onClose();
            return;
        }
        onPosition({ x: left, y: top });
    }, [selected, map, panelHeight, onPosition, onClose]);

    useEffect(recompute, [recompute]);
    useMapEvents({ move: recompute, zoom: recompute, click: onClose });

    return null;
}



export const RegionMap = ({ regions, servers }: RegionMapProps) => {
    const theme = useTheme();

    const [selected, setSelected] = useState<Region | null>(null);
    const [panelPos, setPanelPos] = useState<{ x: number; y: number } | null>(null);

    const panelRef = useRef<HTMLDivElement | null>(null);
    const panelHeight = panelRef.current?.offsetHeight ?? 300;

    const closePanel = useCallback(() => {
        setSelected(null);
        setPanelPos(null);
    }, []);

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
                animation: 'region-marker-pulse 1.6s infinite',
            },
            '& .region-marker-label': {
                background: 'transparent',
                border: 'none',
                boxShadow: 'none',
                padding: 0,
                fontSize: '13px',
                fontWeight: 600,
                color: theme.palette.mode === 'dark' ? TextColors.OverviewContent : TextColors.LightThemeText,
                textShadow: theme.palette.mode === 'dark' ? '0 1px 3px rgba(0,0,0,0.9)' : '0 1px 3px rgba(255,255,255,0.9)',
            },
            '& .region-marker-label::before': {
                display: 'none',
            },
            '@keyframes region-marker-pulse': {
                '0%': { transform: 'scale(0.85)', opacity: 0.35 },
                '70%': { transform: 'scale(1.1)', opacity: 0.05 },
                '100%': { transform: 'scale(0.85)', opacity: 0.35 },
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
                <MapPanelSync
                    selected={selected}
                    panelHeight={panelHeight}
                    onPosition={setPanelPos}
                    onClose={closePanel}
                />
                {regions.map(r => {
                    const state: RegionMarkerState = stateForRegion(r, servers);

                    return (
                        <Marker
                            key={r.id}
                            position={[r.lat, r.lng]}
                            icon={MARKER_ICONS[state]}
                            eventHandlers={{
                                click: () => {
                                    setSelected(prev => (prev?.id === r.id ? null : r));
                                },
                            }}
                        >
                            <Tooltip
                                permanent
                                direction='bottom'
                                offset={[0, 6]}
                                className='region-marker-label'
                            >
                                {r.id}
                            </Tooltip>
                        </Marker>

                    );
                })}
                <ZoomControl position="topright" />
            </MapContainer>

            {selected && panelPos && (() => {
                const match = servers.find(s => s.id === selected.name);

                return (
                    <RegionDetailsPanel
                        ref={panelRef}
                        region={selected}
                        left={panelPos.x}
                        top={panelPos.y}
                        onClose={closePanel}
                        state={stateForRegion(selected, servers)}
                        carbonIntensity={match?.carbonIntensity ?? null}
                    />
                )
            })()}

        </Box>

    );
};
