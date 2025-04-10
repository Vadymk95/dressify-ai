import { OutfitGenerationParams } from '@/data/outfits/types';
import { adaptationRules } from '@/data/outfits/utils/adaptationRules';
import { AgeCategory, HeightCategory, WeightCategory } from '../types';

export const determineHeightCategory = (height: {
    value: number;
    unit: string;
}): HeightCategory => {
    const heightInCm =
        height.unit === 'cm' ? height.value : height.value * 2.54;
    if (heightInCm < 165) return 'short';
    if (heightInCm > 180) return 'tall';
    return 'medium';
};

export const determineWeightCategory = (
    weight: { value: number; unit: string },
    gender: string
): WeightCategory => {
    const weightInKg =
        weight.unit === 'kg' ? weight.value : weight.value * 0.453592;
    if (gender === 'male') {
        if (weightInKg < 70) return 'thin';
        if (weightInKg > 90) return 'heavy';
        return 'medium';
    } else {
        if (weightInKg < 55) return 'thin';
        if (weightInKg > 75) return 'heavy';
        return 'medium';
    }
};

export const determineAgeCategory = (age: number): AgeCategory => {
    if (age >= 18 && age <= 25) return 'young';
    if (age >= 26 && age <= 40) return 'middle';
    if (age >= 41 && age <= 60) return 'mature';
    if (age >= 61 && age <= 120) return 'senior';
    return 'senior';
};

export const determineWeatherCategory = (
    weather: OutfitGenerationParams['weather']
): keyof typeof adaptationRules.weather | null => {
    if (weather.temperature <= 10) return 'cold';
    if (weather.temperature >= 21) return 'warm';
    return 'cool';
};

export const determineStyle = (
    event: string,
    ageCategory: AgeCategory,
    temp: number,
    isRainy: boolean,
    isSnowy: boolean,
    isWindy: boolean
): 'formal' | 'casual' => {
    // Базовый стиль по событию
    let style: 'formal' | 'casual' =
        event === 'workOffice' || event === 'dateNight' ? 'formal' : 'casual';

    // Корректировка по возрасту
    if (ageCategory === 'young') {
        // Молодые люди могут носить более casual вещи даже на формальных мероприятиях
        if (event === 'dateNight') {
            style = Math.random() > 0.7 ? 'formal' : 'casual';
        }
    } else if (ageCategory === 'senior') {
        // Пожилые люди предпочитают более формальный стиль
        if (event === 'casualFriends' || event === 'shopping') {
            style = Math.random() > 0.3 ? 'formal' : 'casual';
        }
    }

    // Корректировка по погоде
    if (temp >= 30) {
        // В сильную жару даже формальный стиль становится более casual
        if (style === 'formal' && event !== 'workOffice') {
            style = 'casual';
        }
    } else if (temp <= 5) {
        // В холод формальный стиль может быть неудобен
        if (style === 'formal' && event !== 'workOffice') {
            style = 'casual';
        }
    }

    // Корректировка по осадкам
    if (isRainy || isSnowy || isWindy) {
        // В плохую погоду даже формальный стиль становится более практичным
        if (style === 'formal' && event !== 'workOffice') {
            style = 'casual';
        }
    }

    return style;
};
