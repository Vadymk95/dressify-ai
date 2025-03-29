export interface ParsedCity {
    latitude: string;
    longitude: string;
}

export const parseCityCoordinates = (cityString: string): ParsedCity | null => {
    const [, latitude, longitude] = cityString
        .split('|')
        .map((part) => part.trim());

    if (!latitude || !longitude) return null;

    return { latitude, longitude };
};
