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
        mature: {
            range: { min: 41, max: 60 },
            add: {
                ru: 'классические элементы, качественные ткани',
                en: 'classic elements, quality fabrics'
            },
            remove: {
                ru: 'слишком молодежные детали',
                en: 'too youthful details'
            }
        },
        senior: {
            range: { min: 61, max: 120 },
            add: {
                ru: 'комфортные вещи, удобная обувь, практичные аксессуары',
                en: 'comfortable pieces, comfortable shoes, practical accessories'
            },
            remove: {
                ru: 'молодежные элементы, неудобная обувь, сложные застежки',
                en: 'youthful elements, uncomfortable shoes, complex fasteners'
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
    if (age >= 41 && age <= 60) return 'mature';
    if (age >= 61 && age <= 120) return 'senior';
    return null;
};

const determineWeatherCategory = (
    weather: OutfitGenerationParams['weather']
): keyof typeof adaptationRules.weather | null => {
    if (weather.temperature <= 10) return 'cold';
    if (weather.temperature >= 21) return 'warm';
    return 'cool';
};

// Функция для определения стиля по событию
const determineStyle = (event: string): 'formal' | 'casual' => {
    return event === 'workOffice' || event === 'dateNight'
        ? 'formal'
        : 'casual';
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
                ru: 'выбирай одежду с вертикальными полосками и однотонные вещи - это визуально вытянет силуэт. Избегай объемных вещей и многослойности',
                en: 'choose clothes with vertical stripes and monochrome pieces - this will visually elongate your silhouette. Avoid voluminous items and layering'
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
                ru: 'обрати внимание на многослойность и структурированные вещи - это поможет сбалансировать пропорции и создать гармоничный силуэт',
                en: 'pay attention to layering and structured pieces - this will help balance your proportions and create a harmonious silhouette'
            }
        }
    };

    // Переформулированные рекомендации для веса
    const weightRecommendations = {
        thin: {
            add: {
                ru: 'попробуй многослойные образы и объемные вещи - они добавят фактуры и визуально увеличат объем',
                en: 'try layered looks and voluminous pieces - they will add texture and visually increase volume'
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

    // Базовые аксессуары в зависимости от погоды
    const getWeatherAccessories = (
        temp: number,
        isRainy: boolean,
        isWindy: boolean,
        isSnowy: boolean,
        lang: Language
    ): string[] => {
        const weatherAccessories = {
            ru: {
                hat: 'шапка',
                gloves: 'перчатки',
                scarf: 'шарф',
                umbrella: 'зонт'
            },
            en: {
                hat: 'hat',
                gloves: 'gloves',
                scarf: 'scarf',
                umbrella: 'umbrella'
            }
        };

        const accessories = [];

        if (temp <= 0) {
            accessories.push(
                weatherAccessories[lang].hat,
                weatherAccessories[lang].gloves,
                weatherAccessories[lang].scarf
            );
        } else if (temp <= 5) {
            accessories.push(
                weatherAccessories[lang].hat,
                weatherAccessories[lang].gloves
            );
            if (isWindy || isSnowy) {
                accessories.push(weatherAccessories[lang].scarf);
            }
        } else if (temp <= 10) {
            if (isWindy || isSnowy) {
                accessories.push(weatherAccessories[lang].scarf);
            }
            if (isWindy) {
                accessories.push(weatherAccessories[lang].hat);
            }
        }

        if (isRainy) {
            accessories.push(weatherAccessories[lang].umbrella);
        }

        return accessories;
    };

    // Цветовые схемы для разных стилей
    const colorSchemes = {
        formal: {
            ru: [
                'в классических темных тонах',
                'в благородных серых оттенках',
                'в глубоком синем цвете',
                'в элегантном черном',
                'в теплых коричневых тонах'
            ],
            en: [
                'in classic dark tones',
                'in noble grey shades',
                'in deep blue',
                'in elegant black',
                'in warm brown tones'
            ]
        },
        casual: {
            ru: [
                'в стильных монохромных тонах',
                'в контрастных сочетаниях',
                'в базовых нейтральных цветах',
                'в современных урбан-оттенках',
                'в минималистичной палитре'
            ],
            en: [
                'in stylish monochrome tones',
                'in contrasting combinations',
                'in basic neutral colors',
                'in modern urban shades',
                'in minimalist palette'
            ]
        }
    };

    // Правила фильтрации одежды
    const clothingFilters = {
        temperature: {
            hot: {
                exclude: [
                    'пуховик',
                    'пальто',
                    'шерстяной',
                    'утепленный',
                    'дутый'
                ],
                include: ['легкий', 'хлопковый', 'льняной']
            },
            cold: {
                exclude: ['шорты', 'сандалии', 'босоножки', 'майка'],
                include: ['утепленный', 'шерстяной', 'дутый']
            }
        },
        height: {
            short: {
                exclude: ['длинный', 'объемный', 'многослойный'],
                include: ['укороченный', 'приталенный']
            },
            medium: {
                exclude: [],
                include: []
            },
            tall: {
                exclude: ['укороченный'],
                include: ['длинный', 'структурированный']
            }
        },
        weight: {
            thin: {
                exclude: ['приталенный', 'облегающий'],
                include: ['объемный', 'многослойный']
            },
            medium: {
                exclude: [],
                include: []
            },
            heavy: {
                exclude: ['объемный', 'горизонтальные полосы'],
                include: ['приталенный', 'вертикальные линии']
            }
        },
        age: {
            young: {
                exclude: ['классический', 'элегантный'],
                include: ['молодежный', 'трендовый']
            },
            middle: {
                exclude: [],
                include: []
            },
            mature: {
                exclude: ['молодежный', 'трендовый'],
                include: ['классический', 'элегантный']
            },
            senior: {
                exclude: [
                    'молодежный',
                    'трендовый',
                    'объемный',
                    'многослойный',
                    'кроссовки',
                    'джинсы',
                    'худи',
                    'свитшот',
                    'ветровка',
                    'карго',
                    'спортивный',
                    'молодежный',
                    'трендовый',
                    'объемный',
                    'многослойный'
                ],
                include: [
                    'классический',
                    'элегантный',
                    'комфортный',
                    'удобный',
                    'брюки',
                    'платье',
                    'туфли',
                    'кардиган',
                    'джемпер',
                    'пальто',
                    'брюки классические',
                    'туфли классические',
                    'рубашка',
                    'свитер'
                ]
            }
        },
        event: {
            workOffice: {
                exclude: ['джинсы', 'кроссовки', 'футболка'],
                include: ['брюки', 'рубашка', 'пиджак']
            },
            dateNight: {
                exclude: ['спортивный', 'повседневный'],
                include: ['элегантный', 'стильный']
            },
            casualFriends: {
                exclude: ['формальный', 'строгий'],
                include: ['повседневный', 'комфортный']
            },
            shopping: {
                exclude: ['формальный', 'строгий'],
                include: ['удобный', 'практичный']
            }
        }
    };

    // Функция для фильтрации одежды по правилам
    const filterClothing = (
        items: string[],
        filters: { exclude?: string[]; include?: string[] }
    ): string[] => {
        return items.filter((item) => {
            const shouldExclude = filters.exclude?.some((exclude) =>
                item.toLowerCase().includes(exclude.toLowerCase())
            );
            const shouldInclude =
                !filters.include ||
                filters.include.some((include) =>
                    item.toLowerCase().includes(include.toLowerCase())
                );
            return !shouldExclude && shouldInclude;
        });
    };

    // Варианты одежды для разной погоды
    const clothingVariants = {
        cold: {
            male: {
                tops: {
                    formal: {
                        ru: [
                            'шерстяной свитер с пальто',
                            'водолазка с шерстяным пальто',
                            'джемпер с двубортным пальто',
                            'свитер с утепленным тренчем',
                            'водолазка с пальто'
                        ],
                        en: [
                            'wool sweater with coat',
                            'turtleneck with wool coat',
                            'jumper with double-breasted coat',
                            'sweater with insulated trench',
                            'turtleneck with coat'
                        ]
                    },
                    casual: {
                        ru: [
                            'свитер с пуховиком',
                            'худи с утепленной курткой',
                            'свитшот с дутой курткой',
                            'джемпер с зимней курткой',
                            'толстовка с пуховиком'
                        ],
                        en: [
                            'sweater with down jacket',
                            'hoodie with padded jacket',
                            'sweatshirt with puffer jacket',
                            'jumper with winter jacket',
                            'sweatshirt with down jacket'
                        ]
                    }
                },
                bottoms: {
                    formal: {
                        ru: [
                            'прямые брюки',
                            'классические брюки',
                            'брюки со стрелками',
                            'шерстяные брюки',
                            'брюки чинос'
                        ],
                        en: [
                            'straight pants',
                            'classic trousers',
                            'creased pants',
                            'wool trousers',
                            'chinos'
                        ]
                    },
                    casual: {
                        ru: [
                            'джинсы',
                            'брюки чинос',
                            'брюки карго',
                            'джоггеры',
                            'прямые брюки'
                        ],
                        en: [
                            'jeans',
                            'chinos',
                            'cargo pants',
                            'joggers',
                            'straight pants'
                        ]
                    }
                },
                shoes: {
                    formal: {
                        ru: [
                            'кожаные оксфорды',
                            'классические дерби',
                            'кожаные лоферы',
                            'замшевые ботинки',
                            'челси'
                        ],
                        en: [
                            'leather oxfords',
                            'classic derbies',
                            'leather loafers',
                            'suede boots',
                            'chelsea boots'
                        ]
                    },
                    casual: {
                        ru: [
                            'кожаные кроссовки',
                            'замшевые кеды',
                            'ботинки на шнуровке',
                            'слипоны',
                            'кеды'
                        ],
                        en: [
                            'leather sneakers',
                            'suede sneakers',
                            'lace-up boots',
                            'slip-ons',
                            'canvas shoes'
                        ]
                    }
                }
            },
            female: {
                tops: {
                    formal: {
                        ru: [
                            'блузка с тренчем',
                            'джемпер с легким пальто',
                            'водолазка с жакетом',
                            'блузка с кардиганом',
                            'свитер с блейзером'
                        ],
                        en: [
                            'blouse with trench coat',
                            'jumper with light coat',
                            'turtleneck with jacket',
                            'blouse with cardigan',
                            'sweater with blazer'
                        ]
                    },
                    casual: {
                        ru: [
                            'футболка с джинсовой курткой',
                            'лонгслив с кожаной курткой',
                            'свитшот с ветровкой',
                            'футболка с бомбером',
                            'худи с легкой курткой'
                        ],
                        en: [
                            't-shirt with denim jacket',
                            'longsleeve with leather jacket',
                            'sweatshirt with windbreaker',
                            't-shirt with bomber',
                            'hoodie with light jacket'
                        ]
                    }
                },
                bottoms: {
                    formal: {
                        ru: [
                            'прямые брюки',
                            'юбка-карандаш',
                            'классические брюки',
                            'плиссированная юбка',
                            'брюки со стрелками'
                        ],
                        en: [
                            'straight pants',
                            'pencil skirt',
                            'classic trousers',
                            'pleated skirt',
                            'creased pants'
                        ]
                    },
                    casual: {
                        ru: [
                            'джинсы',
                            'брюки чинос',
                            'трикотажная юбка',
                            'джинсовая юбка',
                            'брюки карго'
                        ],
                        en: [
                            'jeans',
                            'chinos',
                            'knit skirt',
                            'denim skirt',
                            'cargo pants'
                        ]
                    }
                },
                shoes: {
                    formal: {
                        ru: [
                            'кожаные ботильоны',
                            'классические лоферы',
                            'кожаные туфли',
                            'замшевые ботинки',
                            'челси на каблуке'
                        ],
                        en: [
                            'leather ankle boots',
                            'classic loafers',
                            'leather shoes',
                            'suede boots',
                            'heeled chelsea boots'
                        ]
                    },
                    casual: {
                        ru: [
                            'кожаные кроссовки',
                            'замшевые кеды',
                            'ботинки на шнуровке',
                            'слипоны',
                            'кеды'
                        ],
                        en: [
                            'leather sneakers',
                            'suede sneakers',
                            'lace-up boots',
                            'slip-ons',
                            'canvas shoes'
                        ]
                    }
                }
            }
        },
        cool: {
            male: {
                tops: {
                    formal: {
                        ru: [
                            'рубашка с тренчем',
                            'джемпер с легким пальто',
                            'водолазка с пиджаком',
                            'рубашка с кардиганом',
                            'свитер с блейзером'
                        ],
                        en: [
                            'shirt with trench coat',
                            'jumper with light coat',
                            'turtleneck with blazer',
                            'shirt with cardigan',
                            'sweater with blazer'
                        ]
                    },
                    casual: {
                        ru: [
                            'футболка с джинсовой курткой',
                            'лонгслив с кожаной курткой',
                            'свитшот с ветровкой',
                            'футболка с бомбером',
                            'худи с легкой курткой'
                        ],
                        en: [
                            't-shirt with denim jacket',
                            'longsleeve with leather jacket',
                            'sweatshirt with windbreaker',
                            't-shirt with bomber',
                            'hoodie with light jacket'
                        ]
                    }
                },
                bottoms: {
                    formal: {
                        ru: [
                            'прямые брюки',
                            'классические брюки',
                            'брюки со стрелками',
                            'шерстяные брюки',
                            'брюки чинос'
                        ],
                        en: [
                            'straight pants',
                            'classic trousers',
                            'creased pants',
                            'wool trousers',
                            'chinos'
                        ]
                    },
                    casual: {
                        ru: [
                            'джинсы',
                            'брюки чинос',
                            'брюки карго',
                            'джоггеры',
                            'прямые брюки'
                        ],
                        en: [
                            'jeans',
                            'chinos',
                            'cargo pants',
                            'joggers',
                            'straight pants'
                        ]
                    }
                },
                shoes: {
                    formal: {
                        ru: [
                            'кожаные оксфорды',
                            'классические дерби',
                            'кожаные лоферы',
                            'замшевые ботинки',
                            'челси'
                        ],
                        en: [
                            'leather oxfords',
                            'classic derbies',
                            'leather loafers',
                            'suede boots',
                            'chelsea boots'
                        ]
                    },
                    casual: {
                        ru: [
                            'кожаные кроссовки',
                            'замшевые кеды',
                            'ботинки на шнуровке',
                            'слипоны',
                            'кеды'
                        ],
                        en: [
                            'leather sneakers',
                            'suede sneakers',
                            'lace-up boots',
                            'slip-ons',
                            'canvas shoes'
                        ]
                    }
                }
            },
            female: {
                tops: {
                    formal: {
                        ru: [
                            'блузка с тренчем',
                            'джемпер с легким пальто',
                            'водолазка с жакетом',
                            'блузка с кардиганом',
                            'свитер с блейзером'
                        ],
                        en: [
                            'blouse with trench coat',
                            'jumper with light coat',
                            'turtleneck with jacket',
                            'blouse with cardigan',
                            'sweater with blazer'
                        ]
                    },
                    casual: {
                        ru: [
                            'футболка с джинсовой курткой',
                            'лонгслив с кожаной курткой',
                            'свитшот с ветровкой',
                            'футболка с бомбером',
                            'худи с легкой курткой'
                        ],
                        en: [
                            't-shirt with denim jacket',
                            'longsleeve with leather jacket',
                            'sweatshirt with windbreaker',
                            't-shirt with bomber',
                            'hoodie with light jacket'
                        ]
                    }
                },
                bottoms: {
                    formal: {
                        ru: [
                            'прямые брюки',
                            'юбка-карандаш',
                            'классические брюки',
                            'плиссированная юбка',
                            'брюки со стрелками'
                        ],
                        en: [
                            'straight pants',
                            'pencil skirt',
                            'classic trousers',
                            'pleated skirt',
                            'creased pants'
                        ]
                    },
                    casual: {
                        ru: [
                            'джинсы',
                            'брюки чинос',
                            'трикотажная юбка',
                            'джинсовая юбка',
                            'брюки карго'
                        ],
                        en: [
                            'jeans',
                            'chinos',
                            'knit skirt',
                            'denim skirt',
                            'cargo pants'
                        ]
                    }
                },
                shoes: {
                    formal: {
                        ru: [
                            'кожаные ботильоны',
                            'классические лоферы',
                            'кожаные туфли',
                            'замшевые ботинки',
                            'челси на каблуке'
                        ],
                        en: [
                            'leather ankle boots',
                            'classic loafers',
                            'leather shoes',
                            'suede boots',
                            'heeled chelsea boots'
                        ]
                    },
                    casual: {
                        ru: [
                            'кожаные кроссовки',
                            'замшевые кеды',
                            'ботинки на шнуровке',
                            'слипоны',
                            'кеды'
                        ],
                        en: [
                            'leather sneakers',
                            'suede sneakers',
                            'lace-up boots',
                            'slip-ons',
                            'canvas shoes'
                        ]
                    }
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

    // Логирование параметров
    console.log('Генерация образа для:', {
        gender: isMale ? 'male' : 'female',
        age: characteristics.age,
        ageCategory: determineAgeCategory(characteristics.age),
        height: characteristics.height,
        heightCategory: determineHeightCategory({
            value: characteristics.height,
            unit: characteristics.heightUnit
        }),
        weight: characteristics.weight,
        weightCategory: determineWeightCategory({
            value: characteristics.weight,
            unit: characteristics.weightUnit
        }),
        event: outfit.event,
        style: determineStyle(outfit.event),
        weather: {
            temp,
            isRainy,
            isSnowy,
            isWindy
        }
    });

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
        const weightCategory = determineWeightCategory({
            value: characteristics.weight,
            unit: characteristics.weightUnit
        });
        const ageCategory = determineAgeCategory(characteristics.age);

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
            ...getWeatherAccessories(temp, isRainy, isWindy, isSnowy, lang),
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
                en: accessories
            }
        };
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
        const weightCategory = determineWeightCategory({
            value: characteristics.weight,
            unit: characteristics.weightUnit
        });
        const ageCategory = determineAgeCategory(characteristics.age);

        // Логирование выбранных категорий
        console.log('Определены категории:', {
            heightCategory,
            weightCategory,
            ageCategory,
            style
        });

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

        // Логирование выбранных опций
        console.log('Доступные опции:', {
            topOptions,
            bottomOptions,
            shoesOptions,
            accessories
        });

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
                ru: accessories,
                en: accessories
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

    // Добавляем цветовую схему в описание
    const style = determineStyle(outfit.event);
    const selectedColorScheme = getRandomItems(colorSchemes[style].ru)[0];

    // Получаем аксессуары для образа
    const accessories = [
        ...getWeatherAccessories(temp, isRainy, isWindy, isSnowy, lang),
        ...getRandomItems(
            eventExtraAccessories[outfit.event][lang],
            Math.floor(Math.random() * 2) + 1
        )
    ];

    adaptedOutfit.baseDescription = {
        ru: `${randomGreeting}${adaptedOutfit.coreItems.top.ru}, ${adaptedOutfit.coreItems.bottom.ru}, ${adaptedOutfit.coreItems.shoes.ru} ${selectedColorScheme}${accessories.length > 0 ? `. Дополните образ: ${accessories.join(', ')}` : ''}${weatherText}${physicalText.ru}`,
        en: `${randomGreeting}${adaptedOutfit.coreItems.top.en}, ${adaptedOutfit.coreItems.bottom.en}, ${adaptedOutfit.coreItems.shoes.en} ${getRandomItems(colorSchemes[style].en)[0]}${accessories.length > 0 ? `. Complete the look with: ${accessories.join(', ')}` : ''}${weatherText}${physicalText.en}`
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
