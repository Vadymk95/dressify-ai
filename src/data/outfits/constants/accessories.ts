import { BaseOutfit, Language } from '../types';
import { determineWeightCategory } from '../utils/categoryDeterminers';

// Типы аксессуаров
export type AccessoryType = {
    ru: string;
    en: string;
    priority?: number;
    similar?: string[];
};

// Аксессуары для событий
export const eventAccessories: Record<
    BaseOutfit['event'],
    Record<Language, AccessoryType[]>
> = {
    shopping: {
        ru: [
            { ru: 'рюкзак', en: 'backpack', priority: 1 },
            { ru: 'сумка', en: 'bag', priority: 2 },
            { ru: 'кошелек', en: 'wallet', priority: 3 }
        ],
        en: [
            { ru: 'рюкзак', en: 'backpack', priority: 1 },
            { ru: 'сумка', en: 'bag', priority: 2 },
            { ru: 'кошелек', en: 'wallet', priority: 3 }
        ]
    },
    casualFriends: {
        ru: [
            { ru: 'сумка через плечо', en: 'crossbody bag', priority: 1 },
            { ru: 'часы', en: 'watch', priority: 2 }
        ],
        en: [
            { ru: 'сумка через плечо', en: 'crossbody bag', priority: 1 },
            { ru: 'часы', en: 'watch', priority: 2 }
        ]
    },
    dateNight: {
        ru: [
            { ru: 'элегантная сумка', en: 'elegant bag', priority: 1 },
            { ru: 'часы', en: 'watch', priority: 2 },
            { ru: 'парфюм', en: 'perfume', priority: 3 }
        ],
        en: [
            { ru: 'элегантная сумка', en: 'elegant bag', priority: 1 },
            { ru: 'часы', en: 'watch', priority: 2 },
            { ru: 'парфюм', en: 'perfume', priority: 3 }
        ]
    },
    workOffice: {
        ru: [
            { ru: 'портфель', en: 'briefcase', priority: 1 },
            { ru: 'часы', en: 'watch', priority: 2 },
            { ru: 'визитница', en: 'card holder', priority: 3 }
        ],
        en: [
            { ru: 'портфель', en: 'briefcase', priority: 1 },
            { ru: 'часы', en: 'watch', priority: 2 },
            { ru: 'визитница', en: 'card holder', priority: 3 }
        ]
    }
};

// Аксессуары для погоды
export const weatherAccessories: Record<string, AccessoryType[]> = {
    snowy: [
        { ru: 'шапка', en: 'hat', priority: 1 },
        { ru: 'перчатки', en: 'gloves', priority: 2 }
    ],
    rainy: [{ ru: 'зонт', en: 'umbrella', priority: 1 }],
    cold: [
        { ru: 'шарф', en: 'scarf', priority: 1 },
        { ru: 'шапка', en: 'hat', priority: 2 }
    ],
    sunny: [
        { ru: 'солнцезащитные очки', en: 'sunglasses', priority: 1 },
        { ru: 'головной убор', en: 'hat', priority: 2 }
    ],
    overcast: [{ ru: 'шарф', en: 'scarf', priority: 1 }],
    windy: [{ ru: 'шапка', en: 'hat', priority: 1 }],
    hot: [
        { ru: 'солнцезащитные очки', en: 'sunglasses', priority: 1 },
        { ru: 'головной убор', en: 'hat', priority: 2 }
    ],
    foggy: [
        {
            ru: 'светоотражающие элементы',
            en: 'reflective elements',
            priority: 1
        }
    ]
};

// Функции для работы с аксессуарами
export const getEventAccessories = (
    eventType: BaseOutfit['event'],
    language: Language
): string[] => {
    if (!eventAccessories[eventType]?.[language]) {
        console.error('Invalid event type or language:', eventType, language);
        return [];
    }
    return eventAccessories[eventType][language].map((acc) => acc[language]);
};

export const getWeatherAccessories = (
    temp: number,
    isRainy: boolean,
    isWindy: boolean,
    isSnowy: boolean,
    isSunny: boolean,
    isCold: boolean,
    isOvercast: boolean,
    isThunderstorm: boolean,
    isHot: boolean,
    isFoggy: boolean,
    gender: 'male' | 'female',
    lang: Language,
    weight: number
): string[] => {
    const accessories: string[] = [];
    const weightCategory = determineWeightCategory(
        { value: weight, unit: 'kg' },
        gender
    );

    // Добавляем аксессуары в зависимости от погоды
    if (isSnowy)
        accessories.push(...weatherAccessories.snowy.map((acc) => acc[lang]));
    if (isRainy || isThunderstorm)
        accessories.push(...weatherAccessories.rainy.map((acc) => acc[lang]));
    if (isCold && temp < 15)
        accessories.push(...weatherAccessories.cold.map((acc) => acc[lang]));
    if (isSunny && temp > 10)
        accessories.push(...weatherAccessories.sunny.map((acc) => acc[lang]));
    if (isOvercast && temp <= 15)
        accessories.push(
            ...weatherAccessories.overcast.map((acc) => acc[lang])
        );
    if (isWindy && temp <= 15)
        accessories.push(...weatherAccessories.windy.map((acc) => acc[lang]));
    if (isHot)
        accessories.push(...weatherAccessories.hot.map((acc) => acc[lang]));
    if (isFoggy)
        accessories.push(...weatherAccessories.foggy.map((acc) => acc[lang]));

    // Адаптация под вес
    if (weightCategory === 'thin') {
        accessories.push(lang === 'ru' ? 'сумка через плечо' : 'crossbody bag');
    } else if (weightCategory === 'heavy') {
        accessories.push(lang === 'ru' ? 'часы' : 'watch');
    }

    return [...new Set(accessories)];
};

export const deduplicateAccessories = (accessories: string[]): string[] => {
    const result: string[] = [];
    const lowercased: string[] = [];

    // Список похожих аксессуаров
    const similarItems: Record<string, string[]> = {
        рюкзак: ['сумка', 'рюкзак или сумка', 'сумка через плечо'],
        сумка: ['рюкзак', 'рюкзак или сумка', 'сумка через плечо'],
        'сумка через плечо': ['сумка', 'рюкзак', 'рюкзак или сумка'],
        шапка: ['теплая шапка', 'головной убор'],
        перчатки: ['теплые перчатки'],
        шарф: ['теплый шарф', 'утепленный шарф'],
        backpack: ['bag', 'backpack or bag', 'crossbody bag'],
        bag: ['backpack', 'backpack or bag', 'crossbody bag'],
        'crossbody bag': ['bag', 'backpack', 'backpack or bag'],
        hat: ['warm hat', 'headwear'],
        gloves: ['warm gloves'],
        scarf: ['warm scarf', 'insulated scarf']
    };

    // Приоритетные аксессуары
    const priorities: Record<string, string[]> = {
        'сумка через плечо': ['сумка'],
        'crossbody bag': ['bag']
    };

    // Проверяем приоритетные аксессуары
    const hasPriorityItems = new Map<string, string>();
    for (const acc of accessories) {
        const lowerAcc = acc.toLowerCase();
        for (const [priority, general] of Object.entries(priorities)) {
            if (lowerAcc === priority.toLowerCase()) {
                for (const gen of general) {
                    hasPriorityItems.set(gen.toLowerCase(), priority);
                }
            }
        }
    }

    // Проверяем каждый аксессуар
    for (const acc of accessories) {
        const lowerAcc = acc.toLowerCase();
        let isLowPriority = false;

        // Проверяем приоритет
        for (const general of hasPriorityItems.keys()) {
            if (lowerAcc === general) {
                isLowPriority = true;
                break;
            }
        }

        if (isLowPriority) continue;

        // Проверяем дубликаты
        let isDuplicate = false;
        if (lowercased.includes(lowerAcc)) {
            isDuplicate = true;
        } else {
            for (const [key, synonyms] of Object.entries(similarItems)) {
                if (lowerAcc.includes(key.toLowerCase())) {
                    for (const synonym of synonyms) {
                        if (
                            lowercased.some((item) =>
                                item.includes(synonym.toLowerCase())
                            )
                        ) {
                            isDuplicate = true;
                            break;
                        }
                    }
                }
                if (isDuplicate) break;
            }
        }

        if (!isDuplicate) {
            result.push(acc);
            lowercased.push(lowerAcc);
        }
    }

    return result;
};
