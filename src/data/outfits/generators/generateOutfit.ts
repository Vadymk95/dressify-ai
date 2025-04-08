import { BaseOutfit, OutfitGenerationParams } from '@/data/outfits/types';
import { adaptationRules } from '@/data/outfits/utils/adaptationRules';
import {
    determineAgeCategory,
    determineHeightCategory,
    determineWeatherCategory,
    determineWeightCategory
} from '@/data/outfits/utils/categoryDeterminers';
import { generateRecommendations } from '@/data/outfits/utils/recommendations';

export const generateOutfit = (
    base: BaseOutfit,
    params: OutfitGenerationParams,
    language: 'ru' | 'en'
) => {
    let description = base.baseDescription[language];
    let items = { ...base.coreItems };

    // Применяем правила по росту
    const heightCategory = determineHeightCategory(params.height);
    if (heightCategory) {
        const heightRule = adaptationRules.height[heightCategory];
        if (heightRule?.add) {
            description += `, ${heightRule.add[language]}`;
        }
    }

    // Применяем правила по весу
    const weightCategory = determineWeightCategory(
        params.weight,
        params.gender
    );
    if (weightCategory) {
        const weightRule = adaptationRules.weight[weightCategory];
        if (weightRule?.add) {
            description += `, ${weightRule.add[language]}`;
        }
    }

    // Применяем правила по возрасту
    const ageCategory = determineAgeCategory(params.age);
    if (ageCategory) {
        const ageRule = adaptationRules.age[ageCategory];
        if (ageRule?.add) {
            description += `, ${ageRule.add[language]}`;
        }
    }

    // Применяем правила по погоде
    const weatherCategory = determineWeatherCategory(params.weather);
    if (weatherCategory) {
        const weatherRule = adaptationRules.weather[weatherCategory];
        if (weatherRule?.add) {
            description += `, ${weatherRule.add[language]}`;
        }
    }

    return {
        description,
        items,
        recommendations: {
            [language]: generateRecommendations(params, language)
        }
    };
};
