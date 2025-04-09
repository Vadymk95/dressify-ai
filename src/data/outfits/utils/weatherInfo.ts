import { OutfitRequest } from '@/data/outfits/types';

import { weatherDescriptions } from '@/data/outfits/constants/weatherDescriptions';
import { Language } from '@/data/outfits/types';

export const getWeatherInfo = (
    weather: OutfitRequest['weather']
): Record<Language, string> | null => {
    const weatherData = weather.current || weather.manual;

    if (!weatherData) {
        return null;
    }

    const temp = Math.round(weatherData.temp);

    // Получаем описание на нужном языке
    const description =
        weatherDescriptions[weatherData.description]?.['en'] ||
        weatherData.description;

    return {
        ru: `Погода: ${temp}°C, ${weatherData.description}`,
        en: `Weather: ${temp}°C, ${description}`
    };
};
