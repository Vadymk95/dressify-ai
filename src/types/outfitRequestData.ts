import { Weather } from '@/store/weatherStore';

export interface OutfitRequestData {
    event: {
        type: string;
        name: string;
    };
    location: {
        city: string;
        country: string;
    } | null;
    characteristics: {
        gender: string;
        stylePreference?: string[];
        age?: number;
        height?: number;
        weight?: number;
    };
    wardrobe?: {
        categories: {
            name: string;
            items: string[];
        }[];
    };
    weather: {
        current: Weather | null;
        tomorrow: Weather | null;
        manual: Weather | null;
    };
}
