export interface OutfitGenerationParams {
    // Основные параметры
    gender: 'male' | 'female';
    event: 'casualFriends' | 'workOffice' | 'dateNight' | 'shopping';

    // Физические характеристики
    height: {
        value: number;
        unit: 'cm' | 'ft' | 'in';
    };
    weight: {
        value: number;
        unit: 'kg' | 'lb';
    };
    age: number;
    bodyType: 'thin' | 'medium' | 'heavy';

    // Внешние условия
    weather: {
        condition: 'cold' | 'cool' | 'warm';
        temperature: number;
    };
    season: 'summer' | 'winter';

    // Предпочтения
    style: 'casual' | 'formal';
    colors: 'spring' | 'winter';
}

export type Language = 'ru' | 'en';

export interface BaseOutfit {
    id: string;
    gender: 'male' | 'female';
    event: 'casualFriends' | 'workOffice' | 'dateNight' | 'shopping';
    coreItems: {
        top: Record<Language, string>;
        bottom: Record<Language, string>;
        shoes: Record<Language, string>;
        accessories: Record<Language, string[]>;
    };
    baseDescription: Record<Language, string>;
}

export interface WeatherData {
    temp: number;
    feels_like: number;
    description: string;
    icon: string;
}

export interface OutfitRequest {
    lang: Language;
    event: {
        type: 'casualFriends' | 'workOffice' | 'dateNight' | 'shopping';
        name: string;
    };
    location?: {
        city: string;
        country: string;
    };
    characteristics: {
        gender: 'male' | 'female';
        age: number;
        height: number;
        heightUnit: 'cm' | 'ft' | 'in';
        weight: number;
        weightUnit: 'kg' | 'lb';
    };
    weather: {
        current?: WeatherData;
        manual?: WeatherData;
        tomorrow?: WeatherData;
    };
}
