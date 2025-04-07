import { Language } from '@/data/outfits/outfitGenerator';
import { Weather } from '@/store/weatherStore';
import { HeightUnit, WeightUnit } from '@/types/user';

export interface OutfitRequestData {
    lang: Language;
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
        heightUnit?: HeightUnit;
        weight?: number;
        weightUnit?: WeightUnit;
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
