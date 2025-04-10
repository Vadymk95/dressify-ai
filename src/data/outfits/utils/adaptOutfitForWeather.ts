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
import { handleColdWeather } from '@/data/outfits/utils/handleColdWeather';
import { handleCoolWeather } from '@/data/outfits/utils/handleCoolWeather';
import { getRandomItems } from '@/data/outfits/utils/helpers';
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

    if (temp <= 5) {
        return handleColdWeather(
            outfit,
            temp,
            lang,
            characteristics,
            randomGreeting,
            ageCategory,
            isRainy,
            isWindy,
            isSnowy,
            isSunny,
            isCold,
            isOvercast,
            isThunderstorm,
            isHot,
            isFoggy,
            heightCategory,
            weightCategory
        );
    } else if (temp <= 15) {
        return handleCoolWeather(
            outfit,
            lang,
            randomGreeting,
            isRainy,
            isWindy,
            heightCategory,
            weightCategory,
            ageCategory,
            weather.description.toLowerCase().split(' '),
            temp
        );
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
    const style = determineStyle(
        outfit.event,
        ageCategory,
        temp,
        isRainy,
        isSnowy,
        isWindy
    );
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
