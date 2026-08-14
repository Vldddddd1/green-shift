import regionData from "../../assets/leaflet/regions";

export interface RegionCatalogEntry{
    id: string;
    location: string;
    azCount: number;
}

//useful for extracting USA states and coverting country to a single value
function countryFromGeography(geography: string): string {
    return geography.endsWith('USA') ? 'United States' : geography;
}

function buildRegionCatalog(): RegionCatalogEntry[]{
    const byRegion = new Map<string, {location: string; azCount: number}>();

    for (const az of regionData){
        const existing = byRegion.get(az.name);
        if(existing){
            existing.azCount += 1;
        }
        else{
            byRegion.set(az.name, {location: countryFromGeography(az.geography), azCount: 1});
        }
    }

    return Array.from(byRegion, ([id, {location, azCount}]) => ({id, location, azCount}));
}

export const REGION_CATALOG: RegionCatalogEntry[] = buildRegionCatalog();