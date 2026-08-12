import { Box, useTheme } from '@mui/material';
import { MapContainer, TileLayer, Marker, ZoomControl } from 'react-leaflet';

import { BrandColors } from '../../assets/themes/colors';

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

//-------------------------------------------------------------------------------------------------

// AWS-region markers whose name is covered by the currently active
// backend zone (e.g. zone "eu-west" highlights AWS regions "eu-west-1",
// "eu-west-2", ...). regions.ts has no us-east entries yet, so an
// active "us-east" zone currently highlights nothing on the map.
const activeIcon = L.divIcon({
    className: 'active-region-marker',
    html: '<span class="active-region-marker__dot"></span>',
    iconSize: [18, 18],
    iconAnchor: [9, 9],
});

//-------------------------------------------------------------------------------------------------
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
            // '& .active-region-marker__dot': {
            //     display: 'block',
            //     width: '18px',
            //     height: '18px',
            //     borderRadius: '50%',
            //     backgroundColor: BrandColors.MainPrimary,
            //     animation: 'active-region-pulse 1.6s infinite',
            // },
            // '@keyframes active-region-pulse': {
            //     '0%': { boxShadow: `0 0 0 0 ${BrandColors.MainPrimary}99` },
            //     '70%': { boxShadow: `0 0 0 12px ${BrandColors.MainPrimary}00` },
            //     '100%': { boxShadow: `0 0 0 0 ${BrandColors.MainPrimary}00` },
            // },
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
                {regions.map(r => (
                    <Marker
                        key={r.id}
                        position={[r.lat, r.lng]}
                        {...(activeZone && r.name.startsWith(activeZone) ? { icon: activeIcon } : {})}
                    />
                ))}
                <ZoomControl position="topright" />
            </MapContainer>
        </Box>

    );
};
