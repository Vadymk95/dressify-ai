import { Characteristics, OutfitGenerationParams } from '@/data/outfits/types';
import { adaptationRules } from '@/data/outfits/utils/adaptationRules';
import {
    determineHeightCategory,
    determineWeightCategory
} from '@/data/outfits/utils/categoryDeterminers';

// Переформулированные рекомендации для роста
export const heightRecommendations = {
    short: {
        add: {
            ru: 'выбирай одежду с вертикальными полосками и однотонные вещи - это визуально вытянет силуэт. Используй структурированные вещи вместо объемных',
            en: 'choose clothes with vertical stripes and monochrome pieces - this will visually elongate your silhouette. Use structured pieces instead of voluminous ones'
        }
    },
    medium: {
        add: {
            ru: 'сбалансируй пропорции с помощью правильно подобранной длины и структуры одежды',
            en: 'balance proportions with properly chosen clothing length and structure'
        }
    },
    tall: {
        add: {
            ru: 'обрати внимание на структурированные вещи и правильную длину - это поможет сбалансировать пропорции и создать гармоничный силуэт',
            en: 'pay attention to structured pieces and proper length - this will help balance your proportions and create a harmonious silhouette'
        }
    }
};

// Переформулированные рекомендации для веса
export const weightRecommendations = {
    thin: {
        add: {
            ru: 'выбирай структурированные вещи и одежду с четкими линиями - это создаст гармоничный силуэт',
            en: 'choose structured pieces and clothes with clear lines - this will create a harmonious silhouette'
        }
    },
    medium: {
        add: {
            ru: 'сбалансируй силуэт с помощью правильно подобранных пропорций и структуры одежды',
            en: 'balance your silhouette with properly chosen proportions and clothing structure'
        }
    },
    heavy: {
        add: {
            ru: 'выбирай одежду с вертикальными линиями, структурированные вещи и избегай объемных элементов - это создаст стройный силуэт',
            en: 'choose clothes with vertical lines, structured pieces and avoid voluminous elements - this will create a slimming silhouette'
        }
    }
};

export function generateRecommendations(
    params: OutfitGenerationParams,
    language: 'ru' | 'en'
): string {
    const recommendations: string[] = [];

    // Добавляем рекомендации по цветам
    if (params.colors === 'spring') {
        recommendations.push(
            language === 'ru'
                ? 'Используйте пастельные тона'
                : 'Use pastel tones'
        );
    } else {
        recommendations.push(
            language === 'ru'
                ? 'Выбирайте насыщенные цвета'
                : 'Choose rich colors'
        );
    }

    // Добавляем рекомендации по стилю
    if (params.style === 'casual') {
        recommendations.push(
            language === 'ru'
                ? 'Отдавайте предпочтение расслабленным силуэтам'
                : 'Prefer relaxed silhouettes'
        );
    } else {
        recommendations.push(
            language === 'ru'
                ? 'Выбирайте структурированные вещи'
                : 'Choose structured pieces'
        );
    }

    return recommendations.join('. ');
}

export const getPhysacalRecommendations = (
    isVeryShort: boolean,
    isElderly: boolean,
    gender: 'male' | 'female',
    characteristics: Characteristics,
    ageCategory: keyof typeof adaptationRules.age | null
) => {
    const heightCategory = determineHeightCategory({
        value: characteristics.height,
        unit: characteristics.heightUnit
    });
    const weightCategory = determineWeightCategory(
        {
            value: characteristics.weight,
            unit: characteristics.weightUnit
        },
        gender
    );
    // Базовые рекомендации по физическим характеристикам
    let physicalRecommendations = {
        ru: [] as string[],
        en: [] as string[]
    };

    // Особые рекомендации для очень низкого роста
    if (isVeryShort) {
        physicalRecommendations.ru.push(
            'выбирай одежду с вертикальными линиями и однотонные вещи - это визуально вытянет силуэт. Избегай объемных и многослойных вещей'
        );
        physicalRecommendations.en.push(
            'choose clothes with vertical lines and monochrome pieces - this will visually elongate your silhouette. Avoid voluminous and layered pieces'
        );
    }

    // Особые рекомендации для пожилого возраста
    if (isElderly) {
        physicalRecommendations.ru.push(
            'отдавай предпочтение комфортной и удобной одежде классического кроя'
        );
        physicalRecommendations.en.push(
            'prefer comfortable and easy-to-wear clothes with classic cut'
        );
    }

    // Добавляем стандартные рекомендации только если нет особых случаев
    if (!isVeryShort && !isElderly) {
        if (
            heightCategory &&
            heightCategory !== 'medium' &&
            heightRecommendations[heightCategory]
        ) {
            physicalRecommendations.ru.push(
                heightRecommendations[heightCategory].add.ru
            );
            physicalRecommendations.en.push(
                heightRecommendations[heightCategory].add.en
            );
        }

        if (
            weightCategory &&
            weightCategory !== 'medium' &&
            weightRecommendations[weightCategory]
        ) {
            physicalRecommendations.ru.push(
                weightRecommendations[weightCategory].add.ru
            );
            physicalRecommendations.en.push(
                weightRecommendations[weightCategory].add.en
            );
        }

        if (ageCategory && adaptationRules.age[ageCategory].add) {
            physicalRecommendations.ru.push(
                adaptationRules.age[ageCategory].add!.ru
            );
            physicalRecommendations.en.push(
                adaptationRules.age[ageCategory].add!.en
            );
        }
    }

    const physicalText = {
        ru:
            physicalRecommendations.ru.length > 0
                ? `. Рекомендации: ${physicalRecommendations.ru.join('. ')}`
                : '',
        en:
            physicalRecommendations.en.length > 0
                ? `. Tips: ${physicalRecommendations.en.join('. ')}`
                : ''
    };

    return physicalText;
};

interface Recommendations {
    ru: string;
    en: string;
}

export const getWeatherRecommendations = (
    temp: number,
    isRainy: boolean,
    isWindy: boolean,
    isSnowy: boolean
): Recommendations => {
    let recommendations = {
        ru: '',
        en: ''
    };

    if (isRainy) {
        recommendations.ru =
            'возьмите водоотталкивающую верхнюю одежду и непромокаемую обувь';
        recommendations.en =
            'take water-resistant outerwear and waterproof shoes';
    }

    if (temp <= 15 && temp > 5) {
        recommendations.ru += recommendations.ru ? ', ' : '';
        recommendations.ru +=
            'выбирайте многослойные комбинации для комфорта в течение дня';
        recommendations.en += recommendations.en ? ', ' : '';
        recommendations.en +=
            'choose layered combinations for comfort throughout the day';
    }

    if (isWindy) {
        recommendations.ru += recommendations.ru ? ', ' : '';
        recommendations.ru += 'отдайте предпочтение плотно прилегающей одежде';
        recommendations.en += recommendations.en ? ', ' : '';
        recommendations.en += 'prefer close-fitting clothes';
    }

    if (isSnowy) {
        recommendations.ru += recommendations.ru ? ', ' : '';
        recommendations.ru +=
            'используйте теплые и водонепроницаемые материалы';
        recommendations.en += recommendations.en ? ', ' : '';
        recommendations.en += 'use warm and waterproof materials';
    }

    return recommendations;
};

export const getPhysicalRecommendations = (
    weightCategory: 'thin' | 'medium' | 'heavy',
    heightCategory: 'short' | 'medium' | 'tall',
    ageCategory: 'young' | 'middle' | 'mature' | 'senior'
): Recommendations => {
    let recommendations = {
        ru: '',
        en: ''
    };

    // Рекомендации по весу
    if (weightCategory === 'heavy') {
        recommendations.ru =
            'выбирай одежду с вертикальными линиями, структурированные вещи и избегай объемных элементов - это создаст стройный силуэт';
        recommendations.en =
            'choose clothes with vertical lines, structured items and avoid voluminous elements - this will create a slim silhouette';
    } else if (weightCategory === 'thin') {
        recommendations.ru =
            'многослойность и фактурные ткани добавят объема силуэту';
        recommendations.en =
            'layering and textured fabrics will add volume to the silhouette';
    }

    // Рекомендации по росту
    if (heightCategory === 'short') {
        recommendations.ru += recommendations.ru ? ', ' : '';
        recommendations.ru +=
            'выбирай вещи с вертикальными линиями и монохромные комплекты для визуального удлинения силуэта';
        recommendations.en += recommendations.en ? ', ' : '';
        recommendations.en +=
            'choose items with vertical lines and monochrome outfits to visually elongate the silhouette';
    } else if (heightCategory === 'tall') {
        recommendations.ru += recommendations.ru ? ', ' : '';
        recommendations.ru +=
            'можно экспериментировать с многослойностью и контрастными сочетаниями';
        recommendations.en += recommendations.en ? ', ' : '';
        recommendations.en +=
            'feel free to experiment with layering and contrasting combinations';
    }

    // Рекомендации по возрасту
    if (ageCategory === 'young') {
        recommendations.ru += recommendations.ru ? ', ' : '';
        recommendations.ru += 'сбалансированный стиль, современные элементы';
        recommendations.en += recommendations.en ? ', ' : '';
        recommendations.en += 'balanced style, modern elements';
    } else if (ageCategory === 'mature' || ageCategory === 'senior') {
        recommendations.ru += recommendations.ru ? ', ' : '';
        recommendations.ru +=
            'отдавайте предпочтение классическим силуэтам и качественным материалам';
        recommendations.en += recommendations.en ? ', ' : '';
        recommendations.en +=
            'prefer classic silhouettes and quality materials';
    }

    return recommendations;
};

export const combineRecommendations = (
    weatherRecs: Recommendations,
    physicalRecs: Recommendations
): Recommendations => {
    return {
        ru: [weatherRecs.ru, physicalRecs.ru].filter(Boolean).join(', '),
        en: [weatherRecs.en, physicalRecs.en].filter(Boolean).join(', ')
    };
};
