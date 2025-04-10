import { colorSchemes } from '@/data/outfits/constants/colorSchemes';
import { eventExtraAccessories } from '@/data/outfits/constants/eventExtraAccessories';
import { greetings } from '@/data/outfits/constants/greetings';
import {
    BaseOutfit,
    Characteristics,
    Language,
    WeatherData
} from '@/data/outfits/types';
import { deduplicateAccessories } from '@/data/outfits/utils/accessoryUtils';
import {
    determineAgeCategory,
    determineHeightCategory,
    determineStyle,
    determineWeightCategory
} from '@/data/outfits/utils/categoryDeterminers';
import { clothingFilters } from '@/data/outfits/utils/clothingFilters';
import { clothingVariants } from '@/data/outfits/utils/clothingVariants';
import { filterClothing, getRandomItems } from '@/data/outfits/utils/helpers';
import { getPhysicalAdaptations } from '@/data/outfits/utils/physicalAdaptations';
import { getPhysacalRecommendations } from '@/data/outfits/utils/recommendations';
import {
    getEventAccessories,
    getWeatherAccessories
} from '@/data/outfits/utils/weatherAccessories';

export const adaptOutfitForWeather = (
    outfit: BaseOutfit,
    weather: WeatherData,
    lang: Language,
    characteristics: Characteristics
): BaseOutfit => {
    const temp = weather.temp;
    const adaptedOutfit = { ...outfit };
    const isMale = outfit.gender === 'male';
    const ageCategory = determineAgeCategory(characteristics.age);
    const {
        isRainy,
        isSnowy,
        isWindy,
        isSunny,
        isHot,
        isCold,
        isFoggy,
        isThunderstorm,
        isOvercast,
        isVeryShort,
        isElderly
    } = getPhysicalAdaptations(
        weather.description,
        temp,
        characteristics.height,
        characteristics.age
    );

    const randomGreeting =
        greetings[lang][Math.floor(Math.random() * greetings[lang].length)];

    // Базовые аксессуары в зависимости от погоды

    if (temp <= 5) {
        // Холодная погода (ниже +5)
        const gender = isMale ? 'male' : 'female';
        const style: 'formal' | 'casual' = determineStyle(outfit.event);
        const variants = clothingVariants.cold[gender] as {
            tops: Record<'formal' | 'casual', { ru: string[]; en: string[] }>;
            bottoms: Record<
                'formal' | 'casual',
                { ru: string[]; en: string[] }
            >;
            shoes: Record<'formal' | 'casual', { ru: string[]; en: string[] }>;
        };

        // Определяем категории
        const heightCategory = determineHeightCategory({
            value: characteristics.height,
            unit: characteristics.heightUnit
        });
        const weightCategory = determineWeightCategory(
            {
                value: characteristics.weight,
                unit: characteristics.weightUnit
            },
            outfit.gender
        );

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
                    accessories.push(
                        lang === 'ru' ? 'теплый шарф' : 'warm scarf'
                    );
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
    } else if (temp <= 15) {
        // Прохладная погода (от +5 до +15)
        const gender = isMale ? 'male' : 'female';
        const style: 'formal' | 'casual' = determineStyle(outfit.event);
        const variants = clothingVariants.cool[gender] as {
            tops: Record<'formal' | 'casual', { ru: string[]; en: string[] }>;
            bottoms: Record<
                'formal' | 'casual',
                { ru: string[]; en: string[] }
            >;
            shoes: Record<'formal' | 'casual', { ru: string[]; en: string[] }>;
        };

        // Определяем категории
        const heightCategory = determineHeightCategory({
            value: characteristics.height,
            unit: characteristics.heightUnit
        });
        const weightCategory = determineWeightCategory(
            {
                value: characteristics.weight,
                unit: characteristics.weightUnit
            },
            outfit.gender
        );

        // Базовые аксессуары для прохладной погоды
        let accessories = ['шапка', 'перчатки'];
        if (isRainy) {
            accessories.push('зонт');
        } else if (isWindy) {
            accessories.push('шапка');
        }

        // Добавляем 2-3 случайных аксессуара для события
        const extraAccessories = getRandomItems(
            eventExtraAccessories[outfit.event][lang],
            Math.floor(Math.random() * 2) + 2
        );
        accessories.push(...extraAccessories);

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
                    !item.includes('объемный') &&
                    !item.includes('voluminous') &&
                    !item.includes('многослойный') &&
                    !item.includes('layered')
            );
            bottomOptions = bottomOptions.filter(
                (item) =>
                    (item.includes('брюки') || item.includes('pants')) &&
                    !item.includes('карго') &&
                    !item.includes('cargo') &&
                    !item.includes('объемные') &&
                    !item.includes('voluminous')
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
                ru: deduplicateAccessories(accessories),
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
                            ремень: 'belt'
                        };
                        return translations[acc] || acc;
                    })
                )
            }
        };

        // Добавляем цветовую схему в описание
        const selectedColorScheme = getRandomItems(colorSchemes[style].ru)[0];
        adaptedOutfit.baseDescription = {
            ru: `${randomGreeting}${adaptedOutfit.coreItems.top.ru}, ${adaptedOutfit.coreItems.bottom.ru}, ${adaptedOutfit.coreItems.shoes.ru} ${selectedColorScheme}${accessories.length > 0 ? `. Дополните образ: ${accessories.join(', ')}` : ''}`,
            en: `${randomGreeting}${adaptedOutfit.coreItems.top.en}, ${adaptedOutfit.coreItems.bottom.en}, ${adaptedOutfit.coreItems.shoes.en} ${getRandomItems(colorSchemes[style].en)[0]}${accessories.length > 0 ? `. Complete the look with: ${accessories.join(', ')}` : ''}`
        };
    } else if (temp >= 25) {
        // Жаркая погода
        const accessories = [
            ...getEventAccessories(outfit.event, lang),
            'солнцезащитные очки',
            'головной убор'
        ];

        if (outfit.event === 'shopping') {
            adaptedOutfit.coreItems = {
                ...outfit.coreItems,
                top: {
                    ru: isMale ? 'футболка' : 'топ или футболка',
                    en: isMale ? 't-shirt' : 'top or t-shirt'
                },
                bottom: {
                    ru: isMale ? 'шорты' : 'юбка или шорты',
                    en: isMale ? 'shorts' : 'skirt or shorts'
                },
                shoes: {
                    ru: isMale ? 'сандалии' : 'сандалии или босоножки',
                    en: isMale ? 'sandals' : 'sandals or flats'
                },
                accessories: {
                    ru: [...accessories, 'бутылка воды'],
                    en: [...accessories, 'water bottle']
                }
            };
        } else if (outfit.event === 'casualFriends') {
            adaptedOutfit.coreItems = {
                ...outfit.coreItems,
                top: {
                    ru: isMale ? 'футболка с принтом' : 'топ с принтом',
                    en: isMale ? 'printed t-shirt' : 'printed top'
                },
                bottom: {
                    ru: isMale ? 'шорты' : 'юбка или шорты',
                    en: isMale ? 'shorts' : 'skirt or shorts'
                },
                shoes: {
                    ru: isMale ? 'сандалии' : 'босоножки',
                    en: isMale ? 'sandals' : 'sandals'
                },
                accessories: {
                    ru: [...accessories, 'повязка на голову'],
                    en: [...accessories, 'headband']
                }
            };
        } else if (outfit.event === 'dateNight') {
            adaptedOutfit.coreItems = {
                ...outfit.coreItems,
                top: {
                    ru: isMale
                        ? 'рубашка из легкой ткани'
                        : 'блузка из легкой ткани',
                    en: isMale ? 'light fabric shirt' : 'light fabric blouse'
                },
                bottom: {
                    ru: isMale ? 'брюки чинос' : 'юбка или платье',
                    en: isMale ? 'chinos' : 'skirt or dress'
                },
                shoes: {
                    ru: isMale ? 'мокасины' : 'босоножки',
                    en: isMale ? 'loafers' : 'sandals'
                },
                accessories: {
                    ru: [...accessories, 'парфюм', 'браслет'],
                    en: [...accessories, 'perfume', 'bracelet']
                }
            };
        } else if (outfit.event === 'workOffice') {
            adaptedOutfit.coreItems = {
                ...outfit.coreItems,
                top: {
                    ru: isMale
                        ? 'рубашка из легкой ткани'
                        : 'блузка из легкой ткани',
                    en: isMale ? 'light fabric shirt' : 'light fabric blouse'
                },
                bottom: {
                    ru: isMale ? 'брюки чинос' : 'юбка или брюки',
                    en: isMale ? 'chinos' : 'skirt or pants'
                },
                shoes: {
                    ru: isMale ? 'мокасины' : 'балетки',
                    en: isMale ? 'loafers' : 'flats'
                },
                accessories: {
                    ru: [...accessories, 'блокнот', 'ручка'],
                    en: [...accessories, 'notebook', 'pen']
                }
            };
        }
    } else if (temp >= 15) {
        // Умеренная погода
        let accessories = [...getEventAccessories(outfit.event, lang)];

        if (isRainy) {
            accessories.push('зонт');
        } else if (isWindy) {
            accessories.push('шапка');
        }

        if (outfit.event === 'shopping') {
            adaptedOutfit.coreItems = {
                ...outfit.coreItems,
                top: {
                    ru: isMale ? 'футболка с ветровкой' : 'топ с ветровкой',
                    en: isMale
                        ? 't-shirt with windbreaker'
                        : 'top with windbreaker'
                },
                bottom: {
                    ru: isMale ? 'джинсы' : 'джинсы или юбка',
                    en: isMale ? 'jeans' : 'jeans or skirt'
                },
                shoes: {
                    ru: isMale ? 'кроссовки' : 'кроссовки или балетки',
                    en: isMale ? 'sneakers' : 'sneakers or flats'
                },
                accessories: {
                    ru: [...accessories, 'рюкзак'],
                    en: [...accessories, 'backpack']
                }
            };
        } else if (outfit.event === 'casualFriends') {
            adaptedOutfit.coreItems = {
                ...outfit.coreItems,
                top: {
                    ru: isMale ? 'футболка с джинсовкой' : 'топ с джинсовкой',
                    en: isMale
                        ? 't-shirt with denim jacket'
                        : 'top with denim jacket'
                },
                bottom: {
                    ru: isMale ? 'джинсы' : 'джинсы или юбка',
                    en: isMale ? 'jeans' : 'jeans or skirt'
                },
                shoes: {
                    ru: isMale ? 'кроссовки' : 'кроссовки или балетки',
                    en: isMale ? 'sneakers' : 'sneakers or flats'
                },
                accessories: {
                    ru: [...accessories, 'кепка'],
                    en: [...accessories, 'cap']
                }
            };
        } else if (outfit.event === 'dateNight') {
            adaptedOutfit.coreItems = {
                ...outfit.coreItems,
                top: {
                    ru: isMale ? 'рубашка с пиджаком' : 'блузка с жакетом',
                    en: isMale ? 'shirt with blazer' : 'blouse with jacket'
                },
                bottom: {
                    ru: isMale ? 'брюки' : 'юбка или платье',
                    en: isMale ? 'pants' : 'skirt or dress'
                },
                shoes: {
                    ru: isMale ? 'туфли' : 'туфли или балетки',
                    en: isMale ? 'shoes' : 'shoes or flats'
                },
                accessories: {
                    ru: [...accessories, 'парфюм', 'кольцо'],
                    en: [...accessories, 'perfume', 'ring']
                }
            };
        } else if (outfit.event === 'workOffice') {
            adaptedOutfit.coreItems = {
                ...outfit.coreItems,
                top: {
                    ru: isMale ? 'рубашка с пиджаком' : 'блузка с жакетом',
                    en: isMale ? 'shirt with blazer' : 'blouse with jacket'
                },
                bottom: {
                    ru: isMale ? 'брюки' : 'юбка или брюки',
                    en: isMale ? 'pants' : 'skirt or pants'
                },
                shoes: {
                    ru: isMale ? 'туфли' : 'туфли или балетки',
                    en: isMale ? 'shoes' : 'shoes or flats'
                },
                accessories: {
                    ru: [...accessories, 'ежедневник', 'визитница'],
                    en: [...accessories, 'planner', 'card holder']
                }
            };
        }
    }

    // Обновляем описание с учетом всех условий
    let weatherConditions = {
        ru: [] as string[],
        en: [] as string[]
    };

    if (isRainy) {
        weatherConditions.ru.push('дождь');
        weatherConditions.en.push('rain');
    }
    if (isSnowy) {
        weatherConditions.ru.push('снег');
        weatherConditions.en.push('snow');
    }
    if (isWindy) {
        weatherConditions.ru.push('ветер');
        weatherConditions.en.push('wind');
    }
    if (isOvercast) {
        weatherConditions.ru.push('пасмурно');
        weatherConditions.en.push('cloudy');
    }

    const physicalText = getPhysacalRecommendations(
        isVeryShort,
        isElderly,
        outfit.gender,
        characteristics,
        ageCategory
    );

    // Добавляем цветовую схему в описание
    const style = determineStyle(outfit.event);
    const selectedColorScheme = getRandomItems(colorSchemes[style].ru)[0];

    // Получаем аксессуары для образа
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
            outfit.gender,
            lang,
            characteristics.weight
        ),
        ...getEventAccessories(outfit.event, lang),
        ...getRandomItems(
            eventExtraAccessories[outfit.event][lang],
            Math.floor(Math.random() * 2) + 1
        )
    ];

    // Убираем дубликаты и погодные условия из списка аксессуаров
    const uniqueAccessories = deduplicateAccessories(
        accessories.filter((acc) => {
            const lowerAcc = acc.toLowerCase();
            return ![
                'дождь',
                'ливень',
                'rain',
                'heavy rain',
                'снег',
                'snow',
                'ветер',
                'wind',
                'пасмурно',
                'cloudy',
                'туман',
                'fog',
                'гроза',
                'thunderstorm',
                'ясно',
                'clear',
                'солнечно',
                'sunny'
            ].includes(lowerAcc);
        })
    );

    const description = {
        ru: `${randomGreeting}\n${adaptedOutfit.coreItems.top.ru}, ${adaptedOutfit.coreItems.bottom.ru}, ${adaptedOutfit.coreItems.shoes.ru} ${selectedColorScheme}.${uniqueAccessories.length > 0 ? `\nДополните образ: ${uniqueAccessories.join(', ')}` : ''}${physicalText.ru}.`,
        en: `${randomGreeting}\n${adaptedOutfit.coreItems.top.en}, ${adaptedOutfit.coreItems.bottom.en}, ${adaptedOutfit.coreItems.shoes.en} ${getRandomItems(colorSchemes[style].en)[0]}.${uniqueAccessories.length > 0 ? `\nComplete the look with: ${uniqueAccessories.join(', ')}` : ''}${physicalText.en}.`
    };

    // Удаляем дублирование погоды в базовом описании
    adaptedOutfit.baseDescription = description;

    adaptedOutfit.description = {
        ru: `Генерация AI образов доступна только для премиум пользователей`,
        en: `AI outfit generation is available only for premium users`
    };

    return adaptedOutfit;
};
