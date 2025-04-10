import { colorSchemes } from '@/data/outfits/constants/colorSchemes';
import { BaseOutfit, Language } from '@/data/outfits/types';
import { deduplicateAccessories } from '@/data/outfits/utils/accessoryUtils';
import { determineStyle } from '@/data/outfits/utils/categoryDeterminers';
import { clothingVariants } from '@/data/outfits/utils/clothingVariants';
import { getRandomItems } from '@/data/outfits/utils/helpers';
import {
    getEventAccessories,
    getWeatherAccessories
} from '../constants/accessories';
import {
    combineRecommendations,
    getPhysicalRecommendations,
    getWeatherRecommendations
} from './recommendations';

type HeightCategory = 'short' | 'medium' | 'tall';
type WeightCategory = 'thin' | 'medium' | 'heavy';
type AgeCategory = 'young' | 'middle' | 'mature' | 'senior';

export function handleCoolWeather(
    outfit: BaseOutfit,
    lang: Language,
    randomGreeting: string,
    isRainy: boolean,
    isWindy: boolean,
    heightCategory: HeightCategory,
    weightCategory: WeightCategory,
    ageCategory: AgeCategory,
    weather: string[],
    temp: number = 10
): BaseOutfit {
    const adaptedOutfit = { ...outfit };
    const isMale = outfit.gender === 'male';
    const gender = isMale ? 'male' : 'female';
    const style = determineStyle(
        outfit.event,
        ageCategory,
        temp,
        isRainy,
        weather.includes('snow'),
        isWindy
    );
    const variants = clothingVariants.cool[gender] as {
        tops: Record<'formal' | 'casual', { ru: string[]; en: string[] }>;
        bottoms: Record<'formal' | 'casual', { ru: string[]; en: string[] }>;
        shoes: Record<'formal' | 'casual', { ru: string[]; en: string[] }>;
    };

    // Получаем аксессуары для события
    const eventAccessories = getEventAccessories(outfit.event, lang);

    // Получаем аксессуары для погоды
    const weatherAccessories = getWeatherAccessories(
        temp,
        isRainy,
        isWindy,
        weather.includes('snow'),
        weather.includes('sunny'),
        weather.includes('cold'),
        weather.includes('overcast'),
        weather.includes('thunderstorm'),
        weather.includes('hot'),
        weather.includes('foggy'),
        outfit.gender,
        lang,
        outfit.weight || 70
    );

    // Объединяем и дедуплицируем аксессуары
    const allAccessories = deduplicateAccessories([
        ...eventAccessories,
        ...weatherAccessories
    ]);

    // Выбираем одежду в зависимости от категорий
    let topOptions = variants.tops[style].ru;
    let bottomOptions = variants.bottoms[style].ru;
    let shoesOptions = variants.shoes[style].ru;

    // Корректируем выбор в зависимости от категорий
    if (heightCategory === 'short') {
        topOptions = topOptions.filter(
            (item) =>
                !item.includes('объемный') &&
                !item.includes('voluminous') &&
                !item.includes('многослойный') &&
                !item.includes('layered')
        );
        bottomOptions = bottomOptions.filter(
            (item) =>
                !item.includes('карго') &&
                !item.includes('cargo') &&
                !item.includes('объемные') &&
                !item.includes('voluminous')
        );
    } else if (heightCategory === 'tall') {
        topOptions = topOptions.filter(
            (item) =>
                item.includes('пальто') ||
                item.includes('coat') ||
                item.includes('куртка') ||
                item.includes('jacket')
        );
    }

    if (weightCategory === 'thin') {
        topOptions = topOptions.filter(
            (item) =>
                item.includes('объемный') ||
                item.includes('voluminous') ||
                item.includes('многослойный') ||
                item.includes('layered')
        );
    } else if (weightCategory === 'heavy') {
        topOptions = topOptions.filter(
            (item) =>
                (item.includes('пальто') ||
                    item.includes('coat') ||
                    item.includes('куртка') ||
                    item.includes('jacket')) &&
                !item.includes('объемный')
        );
        bottomOptions = bottomOptions.filter(
            (item) =>
                (item.includes('брюки') || item.includes('pants')) &&
                !item.includes('карго')
        );
        shoesOptions = shoesOptions.filter(
            (item) =>
                item.includes('кожаные') ||
                item.includes('leather') ||
                item.includes('классические') ||
                item.includes('classic')
        );
    }

    // Учитываем возраст
    if (ageCategory === 'young') {
        topOptions = topOptions.filter(
            (item) =>
                !item.includes('классический') &&
                !item.includes('classic') &&
                !item.includes('элегантный') &&
                !item.includes('elegant')
        );
        bottomOptions = bottomOptions.filter(
            (item) =>
                !item.includes('классический') &&
                !item.includes('classic') &&
                !item.includes('элегантный') &&
                !item.includes('elegant')
        );
    } else if (ageCategory === 'mature') {
        topOptions = topOptions.filter(
            (item) =>
                item.includes('классический') ||
                item.includes('classic') ||
                item.includes('элегантный') ||
                item.includes('elegant')
        );
        bottomOptions = bottomOptions.filter(
            (item) =>
                item.includes('классический') ||
                item.includes('classic') ||
                item.includes('элегантный') ||
                item.includes('elegant')
        );
    } else if (ageCategory === 'senior') {
        topOptions = topOptions.filter(
            (item) =>
                (item.includes('классический') ||
                    item.includes('classic') ||
                    item.includes('элегантный') ||
                    item.includes('elegant')) &&
                !item.includes('молодежный') &&
                !item.includes('youthful') &&
                !item.includes('трендовый') &&
                !item.includes('trendy') &&
                !item.includes('объемный') &&
                !item.includes('voluminous') &&
                !item.includes('многослойный') &&
                !item.includes('layered')
        );
        bottomOptions = bottomOptions.filter(
            (item) =>
                (item.includes('брюки') ||
                    item.includes('pants') ||
                    item.includes('платье') ||
                    item.includes('dress')) &&
                !item.includes('джинсы') &&
                !item.includes('jeans') &&
                !item.includes('объемные') &&
                !item.includes('voluminous')
        );
        shoesOptions = shoesOptions.filter(
            (item) =>
                (item.includes('туфли') ||
                    item.includes('shoes') ||
                    item.includes('балетки') ||
                    item.includes('flats')) &&
                !item.includes('кроссовки') &&
                !item.includes('sneakers') &&
                !item.includes('высокие') &&
                !item.includes('high')
        );
    }

    adaptedOutfit.coreItems = {
        ...outfit.coreItems,
        top: {
            ru:
                getRandomItems(topOptions)[0] ||
                getRandomItems(variants.tops[style].ru)[0],
            en: getRandomItems(variants.tops[style].en)[0]
        },
        bottom: {
            ru:
                getRandomItems(bottomOptions)[0] ||
                getRandomItems(variants.bottoms[style].ru)[0],
            en: getRandomItems(variants.bottoms[style].en)[0]
        },
        shoes: {
            ru:
                getRandomItems(shoesOptions)[0] ||
                getRandomItems(variants.shoes[style].ru)[0],
            en: getRandomItems(variants.shoes[style].en)[0]
        },
        accessories: {
            ru: deduplicateAccessories(allAccessories),
            en: deduplicateAccessories(
                allAccessories.map((acc) => {
                    const translations: Record<string, string> = {
                        зонт: 'umbrella',
                        шапка: 'hat',
                        перчатки: 'gloves',
                        шарф: 'scarf',
                        ежедневник: 'planner',
                        визитница: 'card holder',
                        часы: 'watch',
                        ремень: 'belt'
                    };
                    return translations[acc] || acc;
                })
            )
        }
    };

    // Добавляем цветовую схему и погодные рекомендации в описание
    const selectedColorScheme = getRandomItems(colorSchemes[style].ru)[0];

    // Получаем рекомендации
    const weatherRecs = getWeatherRecommendations(
        temp,
        isRainy,
        isWindy,
        weather.includes('snow')
    );
    const physicalRecs = getPhysicalRecommendations(
        weightCategory,
        heightCategory,
        ageCategory
    );
    const recommendations = combineRecommendations(weatherRecs, physicalRecs);

    // Добавляем рекомендации в описание
    const recommendationsText = recommendations.ru
        ? ` Рекомендации: ${recommendations.ru}`
        : '';
    const recommendationsTextEn = recommendations.en
        ? ` Recommendations: ${recommendations.en}`
        : '';

    adaptedOutfit.baseDescription = {
        ru: `${randomGreeting}${adaptedOutfit.coreItems.top.ru}, ${adaptedOutfit.coreItems.bottom.ru}, ${adaptedOutfit.coreItems.shoes.ru} ${selectedColorScheme}${allAccessories.length > 0 ? `. Дополните образ: ${allAccessories.join(', ')}` : ''}${recommendationsText}.`,
        en: `${randomGreeting}${adaptedOutfit.coreItems.top.en}, ${adaptedOutfit.coreItems.bottom.en}, ${adaptedOutfit.coreItems.shoes.en} ${getRandomItems(colorSchemes[style].en)[0]}${allAccessories.length > 0 ? `. Complete the look with: ${allAccessories.join(', ')}` : ''}${recommendationsTextEn}.`
    };

    return adaptedOutfit;
}
