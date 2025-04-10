import { colorSchemes } from '@/data/outfits/constants/colorSchemes';
import { eventExtraAccessories } from '@/data/outfits/constants/eventExtraAccessories';
import { BaseOutfit, Characteristics, Language } from '@/data/outfits/types';
import { deduplicateAccessories } from '@/data/outfits/utils/accessoryUtils';
import { determineStyle } from '@/data/outfits/utils/categoryDeterminers';
import { clothingFilters } from '@/data/outfits/utils/clothingFilters';
import { clothingVariants } from '@/data/outfits/utils/clothingVariants';
import { filterClothing, getRandomItems } from '@/data/outfits/utils/helpers';
import {
    getEventAccessories,
    getWeatherAccessories
} from '@/data/outfits/utils/weatherAccessories';

type HeightCategory = 'short' | 'medium' | 'tall';
type WeightCategory = 'thin' | 'medium' | 'heavy';
type AgeCategory = 'young' | 'middle' | 'mature' | 'senior';

export const handleColdWeather = (
    outfit: BaseOutfit,
    temp: number,
    lang: Language,
    characteristics: Characteristics,
    randomGreeting: string,
    ageCategory: AgeCategory | null,
    isRainy: boolean,
    isWindy: boolean,
    isSnowy: boolean,
    isSunny: boolean,
    isCold: boolean,
    isOvercast: boolean,
    isThunderstorm: boolean,
    isHot: boolean,
    isFoggy: boolean,
    heightCategory: HeightCategory | null,
    weightCategory: WeightCategory | null
): BaseOutfit => {
    const adaptedOutfit = { ...outfit };
    const isMale = outfit.gender === 'male';
    const gender = isMale ? 'male' : 'female';
    const style: 'formal' | 'casual' = determineStyle(outfit.event);

    const variants = clothingVariants.cold[gender] as {
        tops: Record<'formal' | 'casual', { ru: string[]; en: string[] }>;
        bottoms: Record<'formal' | 'casual', { ru: string[]; en: string[] }>;
        shoes: Record<'formal' | 'casual', { ru: string[]; en: string[] }>;
    };

    // Применяем фильтры к вариантам одежды
    let topOptions = filterClothing(variants.tops[style].ru, {
        ...clothingFilters.temperature.cold,
        ...(heightCategory ? clothingFilters.height[heightCategory] : {}),
        ...(weightCategory ? clothingFilters.weight[weightCategory] : {}),
        ...(ageCategory ? clothingFilters.age[ageCategory] : {}),
        ...clothingFilters.event[outfit.event]
    });

    let bottomOptions = filterClothing(variants.bottoms[style].ru, {
        ...clothingFilters.temperature.cold,
        ...(heightCategory ? clothingFilters.height[heightCategory] : {}),
        ...(weightCategory ? clothingFilters.weight[weightCategory] : {}),
        ...(ageCategory ? clothingFilters.age[ageCategory] : {}),
        ...clothingFilters.event[outfit.event]
    });

    let shoesOptions = filterClothing(variants.shoes[style].ru, {
        ...clothingFilters.temperature.cold,
        ...(heightCategory ? clothingFilters.height[heightCategory] : {}),
        ...(weightCategory ? clothingFilters.weight[weightCategory] : {}),
        ...(ageCategory ? clothingFilters.age[ageCategory] : {}),
        ...clothingFilters.event[outfit.event]
    });

    // Выбираем случайные элементы из отфильтрованных вариантов
    const selectedTop =
        getRandomItems(topOptions)[0] ||
        getRandomItems(variants.tops[style].ru)[0];
    const selectedBottom =
        getRandomItems(bottomOptions)[0] ||
        getRandomItems(variants.bottoms[style].ru)[0];
    const selectedShoes =
        getRandomItems(shoesOptions)[0] ||
        getRandomItems(variants.shoes[style].ru)[0];
    const selectedColorScheme = getRandomItems(colorSchemes[style].ru)[0];

    // Получаем все аксессуары для образа
    const accessories = [
        ...getWeatherAccessories(
            temp,
            isRainy,
            isWindy,
            isSnowy,
            isSunny,
            isCold,
            isOvercast,
            isThunderstorm,
            isHot,
            isFoggy,
            gender,
            lang,
            characteristics.weight
        ),
        ...getEventAccessories(outfit.event, lang),
        ...getRandomItems(
            eventExtraAccessories[outfit.event][lang],
            Math.floor(Math.random() * 2) + 1
        )
    ];

    adaptedOutfit.baseDescription = {
        ru: `${randomGreeting}${selectedTop}, ${selectedBottom}, ${selectedShoes} ${selectedColorScheme}${accessories.length > 0 ? `. Дополните образ: ${accessories.join(', ')}` : ''}`,
        en: `${randomGreeting}${getRandomItems(variants.tops[style].en)[0]}, ${getRandomItems(variants.bottoms[style].en)[0]}, ${getRandomItems(variants.shoes[style].en)[0]} ${getRandomItems(colorSchemes[style].en)[0]}${accessories.length > 0 ? `. Complete the look with: ${accessories.join(', ')}` : ''}`
    };

    adaptedOutfit.coreItems = {
        ...outfit.coreItems,
        top: {
            ru: selectedTop,
            en: getRandomItems(variants.tops[style].en)[0]
        },
        bottom: {
            ru: selectedBottom,
            en: getRandomItems(variants.bottoms[style].en)[0]
        },
        shoes: {
            ru: selectedShoes,
            en: getRandomItems(variants.shoes[style].en)[0]
        },
        accessories: {
            ru: accessories,
            en: accessories.map((acc) => {
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
        }
    };

    // Особые правила для экстремально холодной погоды (ниже -10°C)
    if (temp < -10) {
        // Дополнительные фильтры для очень холодной погоды
        topOptions = topOptions.filter(
            (item) =>
                item.includes('пуховик') ||
                item.includes('дутая') ||
                item.includes('утепленная')
        );

        bottomOptions = bottomOptions.filter(
            (item) =>
                item.includes('утепленные') ||
                item.includes('шерстяные') ||
                item.includes('теплые')
        );

        shoesOptions = shoesOptions.filter(
            (item) =>
                item.includes('зимние') ||
                item.includes('утепленные') ||
                item.includes('меху')
        );

        // Английские варианты
        let topOptionsEn = variants.tops[style].en.filter(
            (item) =>
                item.includes('down') ||
                item.includes('puffer') ||
                item.includes('insulated') ||
                item.includes('padded')
        );

        let bottomOptionsEn = variants.bottoms[style].en.filter(
            (item) =>
                item.includes('insulated') ||
                item.includes('wool') ||
                item.includes('warm') ||
                item.includes('thick')
        );

        let shoesOptionsEn = variants.shoes[style].en.filter(
            (item) =>
                item.includes('winter') ||
                item.includes('insulated') ||
                item.includes('fur') ||
                item.includes('warm')
        );

        // Добавляем дополнительные аксессуары для экстремального холода
        if (
            !accessories.includes('термобелье') &&
            !accessories.includes('thermal underwear')
        ) {
            accessories.push(
                lang === 'ru' ? 'термобелье' : 'thermal underwear'
            );
        }

        if (
            !accessories.includes('теплый шарф') &&
            !accessories.includes('warm scarf')
        ) {
            const scarfIndex = accessories.findIndex(
                (acc) => acc === 'шарф' || acc === 'scarf'
            );
            if (scarfIndex !== -1) {
                accessories[scarfIndex] =
                    lang === 'ru' ? 'теплый шарф' : 'warm scarf';
            } else {
                accessories.push(lang === 'ru' ? 'теплый шарф' : 'warm scarf');
            }
        }

        // Выбираем случайные элементы из отфильтрованных вариантов
        const selectedTop =
            getRandomItems(topOptions)[0] ||
            getRandomItems(variants.tops[style].ru)[0];
        const selectedBottom =
            getRandomItems(bottomOptions)[0] ||
            getRandomItems(variants.bottoms[style].ru)[0];
        const selectedShoes =
            getRandomItems(shoesOptions)[0] ||
            getRandomItems(variants.shoes[style].ru)[0];

        const selectedTopEn =
            getRandomItems(topOptionsEn)[0] ||
            getRandomItems(variants.tops[style].en)[0];
        const selectedBottomEn =
            getRandomItems(bottomOptionsEn)[0] ||
            getRandomItems(variants.bottoms[style].en)[0];
        const selectedShoesEn =
            getRandomItems(shoesOptionsEn)[0] ||
            getRandomItems(variants.shoes[style].en)[0];

        // Обновляем элементы гардероба
        adaptedOutfit.coreItems = {
            ...outfit.coreItems,
            top: {
                ru: selectedTop,
                en: selectedTopEn
            },
            bottom: {
                ru: selectedBottom,
                en: selectedBottomEn
            },
            shoes: {
                ru: selectedShoes,
                en: selectedShoesEn
            },
            accessories: {
                ru: deduplicateAccessories(
                    accessories.filter((acc) => typeof acc === 'string')
                ),
                en: deduplicateAccessories(
                    accessories.map((acc) => {
                        const translations: Record<string, string> = {
                            зонт: 'umbrella',
                            шапка: 'hat',
                            'теплая шапка': 'warm hat',
                            перчатки: 'gloves',
                            'теплые перчатки': 'warm gloves',
                            шарф: 'scarf',
                            'теплый шарф': 'warm scarf',
                            'утепленный шарф': 'insulated scarf',
                            'зимняя маска для лица': 'winter face mask',
                            термобелье: 'thermal underwear',
                            ежедневник: 'planner',
                            визитница: 'card holder',
                            часы: 'watch',
                            ремень: 'belt',
                            рюкзак: 'backpack',
                            сумка: 'bag',
                            кошелек: 'wallet'
                        };
                        return translations[acc] || acc;
                    })
                )
            }
        };
    } else {
        // Логика для обычной холодной погоды (от 0 до 5°C)
        // Не такие строгие требования к одежде, как при экстремальном холоде

        // Фильтры для верхней одежды при обычном холоде
        let topOptionsEn = variants.tops[style].en.filter(
            (item) =>
                item.includes('coat') ||
                item.includes('jacket') ||
                item.includes('puffer') ||
                item.includes('sweater') ||
                item.includes('trench')
        );

        let bottomOptionsEn = variants.bottoms[style].en.filter(
            (item) =>
                item.includes('thick') ||
                item.includes('wool') ||
                item.includes('insulated') ||
                item.includes('warm')
        );

        let shoesOptionsEn = variants.shoes[style].en.filter(
            (item) =>
                item.includes('boots') ||
                item.includes('leather') ||
                !item.includes('sandals')
        );

        // Выбираем случайные элементы из отфильтрованных вариантов
        const selectedTopEn =
            getRandomItems(topOptionsEn)[0] ||
            getRandomItems(variants.tops[style].en)[0];
        const selectedBottomEn =
            getRandomItems(bottomOptionsEn)[0] ||
            getRandomItems(variants.bottoms[style].en)[0];
        const selectedShoesEn =
            getRandomItems(shoesOptionsEn)[0] ||
            getRandomItems(variants.shoes[style].en)[0];

        adaptedOutfit.coreItems = {
            ...outfit.coreItems,
            top: {
                ru: selectedTop,
                en: selectedTopEn
            },
            bottom: {
                ru: selectedBottom,
                en: selectedBottomEn
            },
            shoes: {
                ru: selectedShoes,
                en: selectedShoesEn
            },
            accessories: {
                ru: deduplicateAccessories(
                    accessories.filter((acc) => typeof acc === 'string')
                ),
                en: deduplicateAccessories(
                    accessories.map((acc) => {
                        const translations: Record<string, string> = {
                            зонт: 'umbrella',
                            шапка: 'hat',
                            перчатки: 'gloves',
                            шарф: 'scarf',
                            ежедневник: 'planner',
                            визитница: 'card holder',
                            часы: 'watch',
                            ремень: 'belt',
                            'сумка через плечо': 'crossbody bag',
                            рюкзак: 'backpack',
                            сумка: 'bag',
                            кошелек: 'wallet'
                        };
                        return translations[acc] || acc;
                    })
                )
            }
        };
    }

    return adaptedOutfit;
};
