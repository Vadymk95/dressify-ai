import { Language } from '@/data/outfits/types';
import { determineWeightCategory } from './categoryDeterminers';

import { BaseOutfit } from '@/data/outfits/types';

export const getEventAccessories = (
    eventType: BaseOutfit['event'],
    language: Language
): string[] => {
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
    lang: Language,
    weight: number
): string[] => {
    const accessories = [];

    // Определяем весовую категорию
    const weightCategory = determineWeightCategory(
        {
            value: weight,
            unit: 'kg'
        },
        'male' // Используем 'male' как значение по умолчанию, так как это не влияет на аксессуары
    );

    if (isSnowy) {
        accessories.push(
            lang === 'ru' ? 'шапка' : 'hat',
            lang === 'ru' ? 'перчатки' : 'gloves'
        );
    }

    if (isRainy || isThunderstorm) {
        accessories.push(lang === 'ru' ? 'зонт' : 'umbrella');
    }

    // Добавляем шарф и перчатки только если очень холодно (ниже 5°C)
    if (isCold && temp < 5) {
        accessories.push(
            lang === 'ru' ? 'шарф' : 'scarf',
            lang === 'ru' ? 'перчатки' : 'gloves'
        );
        if (!isSunny) {
            accessories.push(lang === 'ru' ? 'шапка' : 'hat');
        }
    } else if (isCold && temp < 10) {
        // При температуре от 5 до 10°C добавляем только шарф
        accessories.push(lang === 'ru' ? 'шарф' : 'scarf');
        if (!isSunny) {
            accessories.push(lang === 'ru' ? 'шапка' : 'hat');
        }
    }

    // Ветреная погода
    if (isWindy && temp <= 15) {
        if (!accessories.includes(lang === 'ru' ? 'шапка' : 'hat')) {
            accessories.push(lang === 'ru' ? 'шапка' : 'hat');
        }
    }

    // Пасмурная погода
    if (isOvercast && temp <= 15) {
        accessories.push(lang === 'ru' ? 'шарф' : 'scarf');
    }

    // Адаптация аксессуаров под вес
    if (weightCategory === 'thin') {
        // Для худых людей добавляем аксессуары, которые визуально увеличат объем
        accessories.push(lang === 'ru' ? 'сумка через плечо' : 'crossbody bag');
    } else if (weightCategory === 'heavy') {
        // Для полных людей выбираем более строгие аксессуары
        accessories.push(lang === 'ru' ? 'часы' : 'watch');
    }

    return [...new Set(accessories)]; // Убираем дубликаты
};
