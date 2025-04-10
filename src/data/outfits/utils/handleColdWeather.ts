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

    // Получаем все аксессуары для образа
    const weatherAccessories = getWeatherAccessories(
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
    );

    const eventAccessories = getEventAccessories(outfit.event, lang);

    const extraAccessories = getRandomItems(
        eventExtraAccessories[outfit.event][lang],
        Math.floor(Math.random() * 2) + 1
    );

    // Объединяем все аксессуары и удаляем дубликаты
    const accessories = deduplicateAccessories([
        ...weatherAccessories,
        ...eventAccessories,
        ...extraAccessories
    ]);

    // Особые правила для экстремально холодной погоды (ниже -10°C)
    if (temp < -10) {
        // Полностью переопределяем варианты для очень холодной погоды
        const extremeColdTops = [
            {
                ru: 'пуховик с меховым воротником',
                en: 'fur-trimmed down jacket'
            },
            { ru: 'дутая зимняя куртка', en: 'padded winter jacket' },
            { ru: 'шуба с капюшоном', en: 'fur coat with hood' },
            { ru: 'теплое зимнее пальто', en: 'warm winter coat' },
            { ru: 'утепленная парка', en: 'insulated parka' },
            { ru: 'зимняя куртка с мехом', en: 'winter jacket with fur' }
        ];

        const extremeColdBottoms = [
            { ru: 'утепленные зимние брюки', en: 'insulated winter pants' },
            {
                ru: 'шерстяные брюки с подкладкой',
                en: 'wool pants with lining'
            },
            { ru: 'зимние термобрюки', en: 'winter thermal pants' },
            { ru: 'утепленные джинсы с флисом', en: 'fleece-lined jeans' }
        ];

        const extremeColdShoes = [
            { ru: 'зимние утепленные ботинки', en: 'insulated winter boots' },
            { ru: 'валенки с галошами', en: 'felt boots with galoshes' },
            { ru: 'зимние сапоги с мехом', en: 'winter boots with fur' },
            { ru: 'утепленные зимние ботинки', en: 'warm winter boots' }
        ];

        // Используем предопределенные варианты вместо фильтрации
        topOptions = extremeColdTops.map((item) => item.ru);
        bottomOptions = extremeColdBottoms.map((item) => item.ru);
        shoesOptions = extremeColdShoes.map((item) => item.ru);

        // Добавляем дополнительные аксессуары для экстремального холода
        const extremeColdAccessories = [
            { ru: 'термобелье', en: 'thermal underwear' },
            { ru: 'теплый шарф', en: 'warm scarf' },
            { ru: 'теплые перчатки', en: 'warm gloves' }
        ];

        extremeColdAccessories.forEach((acc) => {
            if (!accessories.some((a) => a === acc.ru)) {
                accessories.push(acc.ru);
            }
        });

        // Выбираем случайные элементы из отфильтрованных вариантов
        const selectedTop = getRandomItems(topOptions)[0];
        const selectedBottom = getRandomItems(bottomOptions)[0];
        const selectedShoes = getRandomItems(shoesOptions)[0];
        const selectedColorScheme = getRandomItems(colorSchemes[style].ru)[0];

        // Получаем английские варианты
        const selectedTopEn =
            extremeColdTops.find((item) => item.ru === selectedTop)?.en ||
            getRandomItems(variants.tops[style].en)[0];
        const selectedBottomEn =
            extremeColdBottoms.find((item) => item.ru === selectedBottom)?.en ||
            getRandomItems(variants.bottoms[style].en)[0];
        const selectedShoesEn =
            extremeColdShoes.find((item) => item.ru === selectedShoes)?.en ||
            getRandomItems(variants.shoes[style].en)[0];

        adaptedOutfit.baseDescription = {
            ru: `${randomGreeting}${selectedTop}, ${selectedBottom}, ${selectedShoes} ${selectedColorScheme}${accessories.length > 0 ? `. Дополните образ: ${accessories.join(', ')}` : ''}`,
            en: `${randomGreeting}${selectedTopEn}, ${selectedBottomEn}, ${selectedShoesEn} ${getRandomItems(colorSchemes[style].en)[0]}${accessories.length > 0 ? `. Complete the look with: ${accessories.map((acc) => extremeColdAccessories.find((a) => a.ru === acc)?.en || acc).join(', ')}` : ''}`
        };

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
                ru: deduplicateAccessories(accessories),
                en: deduplicateAccessories(
                    accessories.map(
                        (acc) =>
                            extremeColdAccessories.find((a) => a.ru === acc)
                                ?.en || acc
                    )
                )
            }
        };
    }

    // Особые правила для пожилых людей (senior)
    if (ageCategory === 'senior') {
        topOptions = topOptions.filter(
            (item) =>
                !item.includes('молодежный') &&
                !item.includes('трендовый') &&
                !item.includes('спортивный')
        );

        bottomOptions = bottomOptions.filter(
            (item) =>
                !item.includes('молодежный') &&
                !item.includes('трендовый') &&
                !item.includes('спортивный')
        );

        shoesOptions = shoesOptions.filter(
            (item) =>
                !item.includes('кроссовки') && !item.includes('спортивные')
        );

        // Добавляем дополнительные аксессуары для пожилых людей
        if (
            !accessories.some(
                (acc) => acc.includes('трость') || acc.includes('cane')
            )
        ) {
            accessories.push(lang === 'ru' ? 'трость' : 'cane');
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
    const selectedColorScheme = getRandomItems(colorSchemes[style].ru)[0];

    // Получаем английские варианты
    const selectedTopEn = getRandomItems(variants.tops[style].en)[0];
    const selectedBottomEn = getRandomItems(variants.bottoms[style].en)[0];
    const selectedShoesEn = getRandomItems(variants.shoes[style].en)[0];

    adaptedOutfit.baseDescription = {
        ru: `${randomGreeting}${selectedTop}, ${selectedBottom}, ${selectedShoes} ${selectedColorScheme}${accessories.length > 0 ? `. Дополните образ: ${accessories.join(', ')}` : ''}`,
        en: `${randomGreeting}${selectedTopEn}, ${selectedBottomEn}, ${selectedShoesEn} ${getRandomItems(colorSchemes[style].en)[0]}${accessories.length > 0 ? `. Complete the look with: ${accessories.join(', ')}` : ''}`
    };

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
            ru: deduplicateAccessories(accessories),
            en: deduplicateAccessories(
                accessories.map((acc) => {
                    const translations: Record<string, string> = {
                        umbrella: 'umbrella',
                        hat: 'hat',
                        gloves: 'gloves',
                        scarf: 'scarf',
                        planner: 'planner',
                        cardHolder: 'card holder',
                        watch: 'watch',
                        belt: 'belt',
                        thermalUnderwear: 'thermal underwear',
                        warmScarf: 'warm scarf',
                        cane: 'cane',
                        warmGloves: 'warm gloves'
                    };
                    return translations[acc] || acc;
                })
            )
        }
    };

    return adaptedOutfit;
};
