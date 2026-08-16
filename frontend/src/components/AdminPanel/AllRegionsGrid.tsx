import { Stack, Box, Typography, useTheme, } from '@mui/material';
import { Link } from 'react-router';
import { regionMarkerStates, } from '../../assets/themes/colors';
import { adminCardSx, adminCardTitleSx } from './cardStyles';
import { REGION_CATALOG } from './regionCatalog'

import type { RegionCatalogEntry } from './regionCatalog'
import { deriveRegionStatus } from './regionStatus';

interface AllRegionsGridProps{
    onlineAzCounts: Record<string, number>; // key = region.id; missing = unavailable
}

interface RegionChipProps extends RegionCatalogEntry{
    onlineAzCount: number | null;
}

function RegionChip({ id, location, azCount, onlineAzCount}: RegionChipProps){
    const theme = useTheme();
    
    const { state, label } = deriveRegionStatus(onlineAzCount, azCount);
    const { fill } = regionMarkerStates[state];

    return(
        <Stack sx={{
            flex: '1 1 180px',
            gap: '6px',
            padding: '14px',
            borderRadius: '10px',
            backgroundColor: theme.custom.adminMutedSurface,
        }}>
            <Typography sx={{
                fontFamily: 'Sora',
                fontWeight: 600,
                fontSize: '13px',
                color: theme.palette.text.secondary,
            }}>
                {id}
            </Typography>

            <Typography sx={{
                fontSize: '10px',
                color: theme.palette.text.secondary,
            }}>
                {`${location} - ${azCount} AZs`}
            </Typography>
            <Stack 
                direction = 'row'
                sx = {{
                    alignItems: 'center',
                    gap: '5px',
                }}
            >
                <Box sx={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: fill,
                    flexShrink: 0,
                }}/>
                <Typography sx={{
                    fontSize: '10px',
                    fontWeight: 600,
                    color: theme.palette.text.secondary
                }}>
                    {label}
                </Typography>
            </Stack>
        </Stack>
    );
}

function AllRegionsGrid({ onlineAzCounts}: AllRegionsGridProps){
    const theme = useTheme();

    return(
        <Stack sx={{
            ...adminCardSx(theme),
            gap: '16px',
        }}>
            <Stack
                direction = 'row'
                sx = {{
                    alignItems: 'center',
                    width: '100%',
                }}>
                    <Typography sx={{
                        ...adminCardTitleSx,
                        flex: '1 0 0 ',
                        color: theme.palette.text.primary,
                    }}>
                        All Regions
                    </Typography>

                    <Typography
                        component = {Link}
                        to = "/admin/regions"
                        sx = {{
                            fontSize: '13px',
                            fontWeight: 600,
                            color: theme.palette.primary.main,
                            textDecoration: 'none',
                        }}
                    >
                        View region details
                    </Typography>
            </Stack>
            <Stack 
                direction = 'row'
                sx = {{
                    flexWrap: 'wrap',
                    gap: '12px',
                }}
            >
                {REGION_CATALOG.map(region => <RegionChip key = {region.id} {...region} onlineAzCount={onlineAzCounts[region.id] ?? null}/>)}
            </Stack>
        </Stack>
    );
}

export default AllRegionsGrid;