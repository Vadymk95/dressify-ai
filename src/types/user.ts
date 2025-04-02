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
}

export interface WardrobeCategory {
    id: string;
    name: string;
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
    plan: string;
    location?: {
        country: string;
        city: string;
    };
    characteristics?: UserCharacteristics;
    wardrobe?: Wardrobe;
}
