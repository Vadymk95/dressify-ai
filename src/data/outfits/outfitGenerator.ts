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

    // Пока просто возвращаем первый подходящий образ
    // В будущем можно добавить более сложную логику выбора
    return matchingOutfits[0];
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

// Функция для генерации полного ответа
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

    const description = generateOutfitDescription(outfit, request);

    return {
        outfit: {
            description,
            items: {
                top: outfit.coreItems.top[request.lang],
                bottom: outfit.coreItems.bottom[request.lang],
                shoes: outfit.coreItems.shoes[request.lang],
                accessories: outfit.coreItems.accessories[request.lang]
            },
            event: request.event.name
        }
    };
}
