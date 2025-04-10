import { BaseOutfit, Language } from '@/data/outfits/types';
import { determineWeightCategory } from './categoryDeterminers';

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
    isHot: boolean,
    isFoggy: boolean,
    gender: 'male' | 'female',
    lang: Language,
    weight: number
): string[] => {
    const accessories: string[] = [];

    // Жаркая погода
    if (isHot || temp >= 25) {
        accessories.push(
            lang === 'ru' ? 'солнцезащитные очки' : 'sunglasses',
            lang === 'ru' ? 'головной убор' : 'hat'
        );
    }

    // Холодная погода
    if (isCold || temp <= 10) {
        accessories.push(
            lang === 'ru' ? 'перчатки' : 'gloves',
            lang === 'ru' ? 'шарф' : 'scarf'
        );
    }

    // Дождь или гроза
    if (isRainy || isThunderstorm) {
        accessories.push(lang === 'ru' ? 'зонт' : 'umbrella');
        if (temp <= 15) {
            accessories.push(lang === 'ru' ? 'дождевик' : 'raincoat');
        }
    }

    // Ветреная погода
    if (isWindy) {
        if (temp <= 15) {
            accessories.push(lang === 'ru' ? 'шапка' : 'hat');
        }
        if (temp <= 10) {
            accessories.push(lang === 'ru' ? 'шарф' : 'scarf');
        }
    }

    // Снежная погода
    if (isSnowy) {
        accessories.push(
            lang === 'ru' ? 'шапка' : 'hat',
            lang === 'ru' ? 'перчатки' : 'gloves'
        );
    }

    // Солнечная погода
    if (isSunny && temp > 15) {
        accessories.push(lang === 'ru' ? 'солнцезащитные очки' : 'sunglasses');
    }

    // Пасмурная погода
    if (isOvercast && temp <= 15) {
        accessories.push(lang === 'ru' ? 'шарф' : 'scarf');
    }

    // Туманная погода
    if (isFoggy) {
        accessories.push(
            lang === 'ru' ? 'светоотражающие элементы' : 'reflective elements'
        );
    }

    // Адаптация под вес (только для умеренной погоды)
    if (temp > 10 && temp < 25) {
        const weightCategory = determineWeightCategory(
            { value: weight, unit: 'kg' },
            gender
        );

        if (weightCategory === 'thin') {
            accessories.push(
                lang === 'ru' ? 'сумка через плечо' : 'crossbody bag'
            );
        } else if (weightCategory === 'heavy') {
            accessories.push(lang === 'ru' ? 'часы' : 'watch');
        }
    }

    return [...new Set(accessories)]; // Убираем дубликаты
};
