import { OutfitGenerationParams } from '@/data/outfits/types';
import { adaptationRules } from '@/data/outfits/utils/adaptationRules';

export const determineHeightCategory = (
    height: OutfitGenerationParams['height']
): keyof typeof adaptationRules.height | null => {
    const heightInCm =
        height.unit === 'cm'
            ? height.value
            : height.unit === 'ft'
              ? height.value * 30.48
              : height.value * 2.54;

    if (heightInCm < 165) return 'short';
    if (heightInCm > 180) return 'tall';
    return 'medium';
};

export const determineWeightCategory = (
    weight: OutfitGenerationParams['weight'],
    gender: 'male' | 'female'
): keyof typeof adaptationRules.weight | null => {
    // Конвертируем вес в килограммы
    const weightInKg =
        weight.unit === 'kg' ? weight.value : weight.value * 0.453592;

    // Разные пороговые значения для мужчин и женщин
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

export const determineAgeCategory = (
    age: number
): keyof typeof adaptationRules.age | null => {
    if (age >= 18 && age <= 25) return 'young';
    if (age >= 26 && age <= 40) return 'middle';
    if (age >= 41 && age <= 60) return 'mature';
    if (age >= 61 && age <= 120) return 'senior';
    return null;
};

export const determineWeatherCategory = (
    weather: OutfitGenerationParams['weather']
): keyof typeof adaptationRules.weather | null => {
    if (weather.temperature <= 10) return 'cold';
    if (weather.temperature >= 21) return 'warm';
    return 'cool';
};

export const determineStyle = (event: string): 'formal' | 'casual' => {
    return event === 'workOffice' || event === 'dateNight'
        ? 'formal'
        : 'casual';
};
