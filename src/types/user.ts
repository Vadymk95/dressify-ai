import { DEFAULT_CATEGORIES } from '@/constants/wardrobe';

export type Gender = 'male' | 'female' | 'other';

export type BodyType =
    // Женские типы фигур
    | 'hourglass' // Песочные часы
    | 'pear' // Груша
    | 'apple' // Яблоко
    | 'rectangle' // Прямоугольник
    | 'inverted_triangle' // Перевернутый треугольник
    // Мужские типы фигур
    | 'trapezoid' // Трапеция
    | 'triangle' // Треугольник
    | 'oval' // Овал
    | 'athletic' // Атлетический
    | 'slim'; // Худощавый

export type SkinTone = 'fair' | 'light' | 'medium' | 'olive' | 'brown' | 'dark';

export type HairColor =
    | 'black'
    | 'brown'
    | 'blonde'
    | 'red'
    | 'gray'
    | 'white'
    | 'other';

export type EyeColor = 'brown' | 'blue' | 'green' | 'hazel' | 'gray' | 'other';

export type stylePreference =
    | 'casual'
    | 'formal'
    | 'business'
    | 'sporty'
    | 'romantic'
    | 'creative'
    | 'minimalist'
    | 'vintage'
    | 'streetwear';

export type PreferredColor =
    | 'black'
    | 'white'
    | 'gray'
    | 'red'
    | 'blue'
    | 'green'
    | 'yellow'
    | 'purple'
    | 'pink'
    | 'orange'
    | 'brown'
    | 'beige';

export type WeightUnit = 'kg' | 'lb';
export type HeightUnit = 'cm' | 'ft' | 'in';

export interface UserCharacteristics {
    gender?: Gender;
    height?: number;
    weight?: number;
    heightUnit?: HeightUnit;
    weightUnit?: WeightUnit;
    bodyType?: BodyType;
    age?: number;
    skinTone?: SkinTone;
    hairColor?: HairColor;
    eyeColor?: EyeColor;
    preferredColors?: PreferredColor[];
    stylePreference?: stylePreference[];
}

// Типы для гардероба
export interface WardrobeItem {
    id: string;
    name: string;
    isNew?: boolean;
}

export type CategoryId = (typeof DEFAULT_CATEGORIES)[number]['id'];
export type CategoryName = (typeof DEFAULT_CATEGORIES)[number]['name'];

export interface WardrobeCategory {
    id: CategoryId;
    name: CategoryName;
    items: WardrobeItem[];
}

export interface Wardrobe {
    categories: WardrobeCategory[];
    useWardrobeForOutfits: boolean;
}

export interface UserProfile {
    uid: string;
    email: string;
    emailVerified: boolean;
    plan: 'free' | 'standard' | 'pro';
    lang: string;
    createdAt: Date | null;
    subscriptionExpiry?: string | null; // ISO date string
    wardrobe?: Wardrobe;
    location?: {
        country: string;
        city: string;
        latitude: number;
        longitude: number;
    };
    characteristics?: {
        gender?: string;
        height?: number;
        weight?: number;
        heightUnit?: HeightUnit;
        weightUnit?: WeightUnit;
        age?: number;
        bodyType?: string;
        skinTone?: string;
        hairColor?: string;
        eyeColor?: string;
        preferredColors?: string[];
        stylePreference?: string[];
    };
    requestLimits?: {
        remainingRequests: number;
        requestsResetAt: string; // ISO date string
    };
}
