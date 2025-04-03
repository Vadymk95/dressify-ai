import { EventType } from '@/constants/events';
import { Gender, stylePreference } from '@/types/user';

export interface OutfitRequestData {
    event: {
        type: EventType;
        name: string;
    };
    location: {
        city: string;
        country: string;
    };
    characteristics: {
        gender: Gender;
        stylePreference?: stylePreference[];
        age?: number;
        height?: number;
        weight?: number;
    };
    wardrobe?: {
        categories: {
            name: string;
            items: {
                id: string;
                name: string;
            }[];
        }[];
    };
}
