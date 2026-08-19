export const CONTINENTS = ['Europe', 'Africa', 'Asia-Pacific', 'Americas'] as const; //new continents added here
export type Continent = (typeof CONTINENTS)[number];

export function getContinent(regionId: string): Continent {
    if(regionId.startsWith('eu-')) return 'Europe';
    if(regionId.startsWith('af-')) return 'Africa';
    if(regionId.startsWith('ap-')) return 'Asia-Pacific';
    if(regionId.startsWith('us-')) return 'Americas';
    throw new Error(`Unknown continent region for ${regionId}`);
}