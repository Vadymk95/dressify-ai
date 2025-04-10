import { HeightUnit, WeightUnit } from '@/types/user';
import { EventType, Gender, Language, WeatherData } from './common';

export interface OutfitRequestData {
    lang: Language;
    event: {
        type: EventType;
        name: string;
    };
    location: {
        city: string;
        country: string;
    } | null;
    characteristics: {
        gender: Gender;
        stylePreference?: string[];
        age?: number;
        height?: number;
        heightUnit?: HeightUnit;
        weight?: number;
        weightUnit?: WeightUnit;
        skinTone?: string;
        hairColor?: string;
        eyeColor?: string;
        bodyType?: string;
        preferredColors?: string[];
    };
    wardrobe?: {
        categories: Array<{
            name: string;
            items: string[];
        }>;
    };
    weather: {
        current: WeatherData | null;
        tomorrow: WeatherData | null;
        manual: WeatherData | null;
    };
}
