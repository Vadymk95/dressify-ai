import { Language } from '@/data/outfits/types';

export const weatherDescriptions: Record<string, Record<Language, string>> = {
    cloudy: {
        ru: 'пасмурно',
        en: 'cloudy'
    },
    sunny: {
        ru: 'солнечно',
        en: 'sunny'
    },
    rain: {
        ru: 'дождь',
        en: 'rain'
    },
    heavyRain: {
        ru: 'ливень',
        en: 'heavy rain'
    },
    snow: {
        ru: 'снег',
        en: 'snow'
    },
    overcast: {
        ru: 'облачно',
        en: 'overcast'
    },
    foggy: {
        ru: 'туман',
        en: 'foggy'
    },
    thunderstorm: {
        ru: 'гроза',
        en: 'thunderstorm'
    },
    clear: {
        ru: 'ясно',
        en: 'clear'
    }
};
