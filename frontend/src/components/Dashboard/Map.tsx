import { Box, useTheme } from '@mui/material';
import { MapContainer, TileLayer, Marker, ZoomControl } from 'react-leaflet';

interface Region {
    id: string;
    name: string;
    lat: number;
    lng: number;
}

interface RegionMapProps {
    regions: Region[];
}

export const RegionMap = ({ regions }: RegionMapProps) => {
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
                    url={theme.custom.mapTileUrl}
                    noWrap={true}
                    attribution='© OpenStreetMap, © CARTO' />
                {regions.map(r => (
                    <Marker key={r.id} position={[r.lat, r.lng]} />
                ))}
                <ZoomControl position="topright" />
            </MapContainer>
        </Box>

    );
};
