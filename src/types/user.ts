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

export type StylePreference =
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

export interface UserCharacteristics {
    gender?: Gender;
    height?: number; // in cm
    weight?: number; // in kg
    bodyType?: BodyType;
    age?: number;
    skinTone?: SkinTone;
    hairColor?: HairColor;
    eyeColor?: EyeColor;
    preferredColors?: PreferredColor[];
    stylePreference?: StylePreference[];
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
}
