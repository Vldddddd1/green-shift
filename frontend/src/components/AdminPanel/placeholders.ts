const NA = 'N/A';

export function display(value : string | number | null | undefined): string {
    if( value === null || value === undefined || value === '') return NA;
    return String(value);
}