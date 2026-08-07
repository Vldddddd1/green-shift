import { Box, Stack, useTheme } from '@mui/material';
import { MapContainer, TileLayer, Marker, ZoomControl } from 'react-leaflet';

import { BackgroundColors, shadows } from '../../assets/themes/colors';

interface Region {
    id: string;
    name: string;
    lat: number;
    lng: number;
}

interface RegionMapProps {
    regions: Region[];
    height?: string;
}

export const RegionMap = ({ regions, height = '500px' }: RegionMapProps) => {
    const theme = useTheme();
    const tileUrl = theme.palette.mode === 'dark'
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

    return (
        <Box sx={{
            position: 'relative',
            width: '100svw',
            height: '100vh',
            overflow: 'hidden',
            '& .leaflet-container': {
                backgroundColor: theme.palette.mode === 'dark' ? '#202020' : '#F5EEE0',
            },
        }}>
            <MapContainer
                center={[50, 20]}
                zoom={5}
                minZoom={3}
                maxZoom={15}
                zoomControl={false}
                style={{
                    height: '100%',
                    width: '100%'
                }}>
                <TileLayer
                    url={tileUrl}
                    noWrap={true}
                    attribution='© OpenStreetMap, © CARTO' />
                {regions.map(r => (
                    <Marker key={r.id} position={[r.lat, r.lng]} />
                ))}
                <ZoomControl position="topright" /> 
            </MapContainer>
            <Stack sx={{
                position: 'absolute',
                top: theme.fluid.edgeOffset,
                left: theme.fluid.edgeOffset,
                backgroundColor: BackgroundColors.CardBackground,
                borderRadius: '16px',
                padding: '12px',
                boxShadow: theme.palette.mode === 'dark' ? shadows.darkMode : shadows.lightMode,
            }}>

            </Stack>
        </Box>

    );
};
