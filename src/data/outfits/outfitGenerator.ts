import { baseOutfits } from './baseOutfits';

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

// Базовые образы
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

// Правила адаптации
const adaptationRules = {
    // Физические характеристики
    height: {
        short: {
            add: {
                ru: 'вертикальные линии, монохромные сочетания',
                en: 'vertical lines, monochrome combinations'
            },
            remove: {
                ru: 'горизонтальные полосы',
                en: 'horizontal stripes'
            }
        },
        medium: {
            add: null,
            remove: null
        },
        tall: {
            add: {
                ru: 'балансировка пропорций',
                en: 'proportion balancing'
            },
            remove: null
        }
    },

    weight: {
        thin: {
            add: {
                ru: 'многослойность, объемные вещи',
                en: 'layering, voluminous pieces'
            },
            remove: null
        },
        medium: {
            add: null,
            remove: null
        },
        heavy: {
            add: {
                ru: 'вертикальные линии, структурированные вещи',
                en: 'vertical lines, structured pieces'
            },
            remove: {
                ru: 'горизонтальные полосы, объемные вещи',
                en: 'horizontal stripes, voluminous pieces'
            }
        }
    },

    // Возрастные рекомендации
    age: {
        young: {
            range: { min: 18, max: 25 },
            add: {
                ru: 'молодежные акценты, современные тренды',
                en: 'youthful accents, modern trends'
            },
            remove: {
                ru: 'слишком строгие элементы',
                en: 'too formal elements'
            }
        },
        middle: {
            range: { min: 26, max: 40 },
            add: {
                ru: 'сбалансированный стиль',
                en: 'balanced style'
            },
            remove: null
        },
        adult: {
            range: { min: 41, max: 60 },
            add: {
                ru: 'классические элементы, качественные ткани',
                en: 'classic elements, quality fabrics'
            },
            remove: {
                ru: 'слишком молодежные детали',
                en: 'too youthful details'
            }
        }
    },

    // Погодные условия
    weather: {
        cold: {
            temperature: { max: 10 },
            add: {
                ru: 'теплое пальто, шарф, перчатки',
                en: 'warm coat, scarf, gloves'
            },
            remove: {
                ru: 'легкие элементы',
                en: 'light elements'
            }
        },
        cool: {
            temperature: { min: 11, max: 20 },
            add: {
                ru: 'легкая куртка, кардиган',
                en: 'light jacket, cardigan'
            },
            remove: null
        },
        warm: {
            temperature: { min: 21 },
            add: {
                ru: 'легкие ткани, открытые элементы',
                en: 'light fabrics, open elements'
            },
            remove: {
                ru: 'теплые вещи',
                en: 'warm pieces'
            }
        }
    }
};

// Хелперы для определения категорий
const determineHeightCategory = (
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

const determineWeightCategory = (
    weight: OutfitGenerationParams['weight']
): keyof typeof adaptationRules.weight | null => {
    const weightInKg =
        weight.unit === 'kg' ? weight.value : weight.value * 0.453592;

    if (weightInKg < 60) return 'thin';
    if (weightInKg > 80) return 'heavy';
    return 'medium';
};

const determineAgeCategory = (
    age: number
): keyof typeof adaptationRules.age | null => {
    if (age >= 18 && age <= 25) return 'young';
    if (age >= 26 && age <= 40) return 'middle';
    if (age >= 41 && age <= 60) return 'adult';
    return null;
};

const determineWeatherCategory = (
    weather: OutfitGenerationParams['weather']
): keyof typeof adaptationRules.weather | null => {
    if (weather.temperature <= 10) return 'cold';
    if (weather.temperature >= 21) return 'warm';
    return 'cool';
};

// Функция генерации образа
export function generateOutfit(
    base: BaseOutfit,
    params: OutfitGenerationParams,
    language: 'ru' | 'en'
) {
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
    const weightCategory = determineWeightCategory(params.weight);
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
}

// Функция для генерации рекомендаций
function generateRecommendations(
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
    };
}

// Функция для поиска подходящего образа
export function findMatchingOutfit(request: OutfitRequest): BaseOutfit | null {
    // Фильтруем образы по полу и типу события
    const matchingOutfits = baseOutfits.filter(
        (outfit: BaseOutfit) =>
            outfit.gender === request.characteristics.gender &&
            outfit.event === request.event.type
    );

    if (matchingOutfits.length === 0) {
        return null;
    }

    // Случайный выбор из подходящих образов
    const randomIndex = Math.floor(Math.random() * matchingOutfits.length);
    return matchingOutfits[randomIndex];
}

// Функция для генерации полного описания образа
export function generateOutfitDescription(
    outfit: BaseOutfit,
    request: OutfitRequest
): string {
    let description = outfit.baseDescription[request.lang];

    // Добавляем информацию о погоде
    const weatherInfo = getWeatherInfo(request.weather);
    if (weatherInfo) {
        description += ` ${weatherInfo[request.lang]}`;
    }

    return description;
}

// Базовые аксессуары для разных типов событий
function getEventAccessories(
    eventType: BaseOutfit['event'],
    language: Language
): string[] {
    const accessories = {
        shopping: {
            ru: ['рюкзак или сумка', 'кошелек'],
            en: ['backpack or bag', 'wallet']
        },
        casualFriends: {
            ru: ['сумка через плечо', 'часы'],
            en: ['crossbody bag', 'watch']
        },
        dateNight: {
            ru: ['элегантная сумка', 'часы', 'парфюм'],
            en: ['elegant bag', 'watch', 'perfume']
        },
        workOffice: {
            ru: ['портфель', 'часы', 'визитница'],
            en: ['briefcase', 'watch', 'card holder']
        }
    };

    if (!accessories[eventType]) {
        console.error('Invalid event type:', eventType);
        return [];
    }

    if (!accessories[eventType][language]) {
        console.error('Invalid language:', language);
        return [];
    }

    return accessories[eventType][language];
}

// Вспомогательная функция для получения информации о погоде
function getWeatherInfo(
    weather: OutfitRequest['weather']
): Record<Language, string> | null {
    const weatherData = weather.current || weather.manual;

    if (!weatherData) {
        return null;
    }

    const temp = Math.round(weatherData.temp);

    // Маппинг описаний погоды на разные языки
    const weatherDescriptions: Record<string, Record<Language, string>> = {
        пасмурно: {
            ru: 'пасмурно',
            en: 'cloudy'
        },
        Солнечно: {
            ru: 'солнечно',
            en: 'sunny'
        },
        дождь: {
            ru: 'дождь',
            en: 'rain'
        },
        снег: {
            ru: 'снег',
            en: 'snow'
        },
        облачно: {
            ru: 'облачно',
            en: 'overcast'
        },
        туман: {
            ru: 'туман',
            en: 'foggy'
        },
        гроза: {
            ru: 'гроза',
            en: 'thunderstorm'
        }
    };

    // Получаем описание на нужном языке
    const description =
        weatherDescriptions[weatherData.description]?.['en'] ||
        weatherData.description;

    return {
        ru: `Погода: ${temp}°C, ${weatherData.description}`,
        en: `Weather: ${temp}°C, ${description}`
    };
}

function adaptOutfitForWeather(
    outfit: BaseOutfit,
    weather: WeatherData,
    lang: Language,
    characteristics: {
        height: number;
        heightUnit: 'cm' | 'ft' | 'in';
        weight: number;
        weightUnit: 'kg' | 'lb';
        age: number;
    }
): BaseOutfit {
    const temp = weather.temp;
    const adaptedOutfit = { ...outfit };
    const isMale = outfit.gender === 'male';

    // Определяем категории физических характеристик
    const heightCategory = determineHeightCategory({
        value: characteristics.height,
        unit: characteristics.heightUnit
    });
    const weightCategory = determineWeightCategory({
        value: characteristics.weight,
        unit: characteristics.weightUnit
    });
    const ageCategory = determineAgeCategory(characteristics.age);

    // Определяем тип погоды
    const isRainy =
        weather.description.toLowerCase().includes('дождь') ||
        weather.description.toLowerCase().includes('rain');
    const isSnowy =
        weather.description.toLowerCase().includes('снег') ||
        weather.description.toLowerCase().includes('snow');
    const isWindy =
        weather.description.toLowerCase().includes('ветер') ||
        weather.description.toLowerCase().includes('wind');

    // Вступительные фразы
    const greetings = {
        ru: [
            'Готово! ',
            'Вот что я подобрал: ',
            'Думаю, тебе подойдет: ',
            'Специально для тебя: ',
            'У меня есть идея! '
        ],
        en: [
            'Done! ',
            "Here's what I picked: ",
            'I think this will suit you: ',
            'Specially for you: ',
            'I have an idea! '
        ]
    };

    const randomGreeting =
        greetings[lang][Math.floor(Math.random() * greetings[lang].length)];

    // Переформулированные рекомендации для роста
    const heightRecommendations = {
        short: {
            add: {
                ru: 'выбирай одежду с вертикальными полосками и однотонные вещи - это визуально вытянет силуэт',
                en: 'choose clothes with vertical stripes and monochrome pieces - this will visually elongate your silhouette'
            }
        },
        tall: {
            add: {
                ru: 'обрати внимание на многослойность - это поможет сбалансировать пропорции',
                en: 'pay attention to layering - it will help balance your proportions'
            }
        }
    };

    // Переформулированные рекомендации для веса
    const weightRecommendations = {
        thin: {
            add: {
                ru: 'попробуй многослойные образы и объемные вещи - они добавят фактуры',
                en: 'try layered looks and voluminous pieces - they will add texture'
            }
        },
        heavy: {
            add: {
                ru: 'выбирай одежду с вертикальными линиями и структурированные вещи - они создадут гармоничный силуэт',
                en: 'choose clothes with vertical lines and structured pieces - they will create a harmonious silhouette'
            }
        }
    };

    // Базовые рекомендации по физическим характеристикам
    let physicalRecommendations = {
        ru: [] as string[],
        en: [] as string[]
    };

    // Добавляем рекомендации по росту
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

    // Добавляем рекомендации по весу
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

    // Добавляем рекомендации по возрасту
    if (ageCategory && adaptationRules.age[ageCategory].add) {
        physicalRecommendations.ru.push(
            adaptationRules.age[ageCategory].add!.ru
        );
        physicalRecommendations.en.push(
            adaptationRules.age[ageCategory].add!.en
        );
    }

    // Варианты одежды для разной погоды
    const clothingVariants = {
        cold: {
            male: {
                tops: {
                    ru: [
                        'свитер с пальто',
                        'водолазка с пальто',
                        'джемпер с пальто',
                        'свитер с шерстяным пальто'
                    ],
                    en: [
                        'sweater with coat',
                        'turtleneck with coat',
                        'jumper with coat',
                        'sweater with wool coat'
                    ]
                },
                bottoms: {
                    ru: [
                        'брюки',
                        'шерстяные брюки',
                        'классические брюки',
                        'темные брюки'
                    ],
                    en: ['pants', 'wool pants', 'classic pants', 'dark pants']
                },
                shoes: {
                    ru: [
                        'туфли',
                        'кожаные туфли',
                        'классические туфли',
                        'утепленные туфли'
                    ],
                    en: [
                        'shoes',
                        'leather shoes',
                        'classic shoes',
                        'warm shoes'
                    ]
                }
            },
            female: {
                tops: {
                    ru: [
                        'свитер с пальто',
                        'водолазка с пальто',
                        'джемпер с пальто',
                        'свитер с шерстяным пальто'
                    ],
                    en: [
                        'sweater with coat',
                        'turtleneck with coat',
                        'jumper with coat',
                        'sweater with wool coat'
                    ]
                },
                bottoms: {
                    ru: [
                        'юбка с теплыми колготками',
                        'брюки',
                        'шерстяная юбка с колготками',
                        'теплые брюки'
                    ],
                    en: [
                        'skirt with warm tights',
                        'pants',
                        'wool skirt with tights',
                        'warm pants'
                    ]
                },
                shoes: {
                    ru: [
                        'ботинки',
                        'кожаные ботинки',
                        'утепленные ботинки',
                        'зимние ботинки'
                    ],
                    en: ['boots', 'leather boots', 'warm boots', 'winter boots']
                }
            }
        }
    };

    // Дополнительные аксессуары по типу события
    const eventExtraAccessories = {
        dateNight: {
            ru: ['парфюм', 'часы', 'кольцо', 'запонки', 'браслет', 'ремень'],
            en: ['perfume', 'watch', 'ring', 'cufflinks', 'bracelet', 'belt']
        },
        workOffice: {
            ru: ['ежедневник', 'визитница', 'портфель', 'часы', 'ремень'],
            en: ['planner', 'card holder', 'briefcase', 'watch', 'belt']
        },
        casualFriends: {
            ru: ['часы', 'шарф', 'перчатки', 'сумка через плечо'],
            en: ['watch', 'scarf', 'gloves', 'crossbody bag']
        },
        shopping: {
            ru: ['рюкзак', 'сумка', 'кошелек', 'часы'],
            en: ['backpack', 'bag', 'wallet', 'watch']
        }
    };

    // Функция для случайного выбора элементов
    const getRandomItems = (arr: string[], count: number = 1): string[] => {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    if (temp <= 10) {
        // Холодная погода
        const gender = isMale ? 'male' : 'female';
        const variants = clothingVariants.cold[gender];

        // Базовые аксессуары для холодной погоды
        let accessories = ['шапка', 'перчатки'];
        if (isSnowy) {
            accessories.push('шарф');
        } else if (isRainy) {
            accessories.push('зонт');
        }

        // Добавляем 2-3 случайных аксессуара для события
        const extraAccessories = getRandomItems(
            eventExtraAccessories[outfit.event].ru,
            Math.floor(Math.random() * 2) + 2
        );
        accessories.push(...extraAccessories);

        adaptedOutfit.coreItems = {
            ...outfit.coreItems,
            top: {
                ru: getRandomItems(variants.tops.ru)[0],
                en: getRandomItems(variants.tops.en)[0]
            },
            bottom: {
                ru: getRandomItems(variants.bottoms.ru)[0],
                en: getRandomItems(variants.bottoms.en)[0]
            },
            shoes: {
                ru: getRandomItems(variants.shoes.ru)[0],
                en: getRandomItems(variants.shoes.en)[0]
            },
            accessories: {
                ru: accessories,
                en: accessories.map((acc) => acc) // Здесь нужно добавить перевод
            }
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
    let weatherConditions = [];
    if (isRainy) weatherConditions.push('дождь');
    if (isSnowy) weatherConditions.push('снег');
    if (isWindy) weatherConditions.push('ветер');

    const weatherText =
        weatherConditions.length > 0 ? `, ${weatherConditions.join(', ')}` : '';
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

    adaptedOutfit.baseDescription = {
        ru: `${randomGreeting}${adaptedOutfit.coreItems.top.ru}, ${adaptedOutfit.coreItems.bottom.ru}, ${adaptedOutfit.coreItems.shoes.ru}${weatherText}${physicalText.ru}`,
        en: `${randomGreeting}${adaptedOutfit.coreItems.top.en}, ${adaptedOutfit.coreItems.bottom.en}, ${adaptedOutfit.coreItems.shoes.en}${weatherText}${physicalText.en}`
    };

    return adaptedOutfit;
}

export function generateOutfitResponse(request: OutfitRequest) {
    const outfit = findMatchingOutfit(request);
    if (!outfit) {
        return {
            error:
                request.lang === 'ru'
                    ? 'Не удалось найти подходящий образ'
                    : 'Could not find a matching outfit'
        };
    }

    // Адаптируем образ под погодные условия и физические характеристики
    const weatherData = request.weather.current || request.weather.manual;
    const adaptedOutfit = weatherData
        ? adaptOutfitForWeather(outfit, weatherData, request.lang, {
              height: request.characteristics.height,
              heightUnit: request.characteristics.heightUnit,
              weight: request.characteristics.weight,
              weightUnit: request.characteristics.weightUnit,
              age: request.characteristics.age
          })
        : outfit;

    const description = generateOutfitDescription(adaptedOutfit, request);

    return {
        outfit: {
            description,
            items: {
                top: adaptedOutfit.coreItems.top[request.lang],
                bottom: adaptedOutfit.coreItems.bottom[request.lang],
                shoes: adaptedOutfit.coreItems.shoes[request.lang],
                accessories: adaptedOutfit.coreItems.accessories[request.lang]
            },
            event: request.event.name
        }
    };
}
