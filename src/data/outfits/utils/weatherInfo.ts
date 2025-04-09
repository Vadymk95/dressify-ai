import { OutfitRequest } from '@/data/outfits/types';

import { weatherDescriptions } from '@/data/outfits/constants/weatherDescriptions';
import { Language } from '@/data/outfits/types';

export const getWeatherInfo = (
    weather: OutfitRequest['weather']
): Record<Language, string> | null => {
    // Приоритет: текущая погода -> мануальные данные -> прогноз на завтра
    const weatherData = weather.current || weather.manual || weather.tomorrow;

    if (!weatherData) {
        return null;
    }

    const temp = Math.round(weatherData.temp);

    // Получаем описание на нужном языке
    const description =
        weatherDescriptions[weatherData.description]?.['en'] ||
        weatherData.description;

    // Добавляем информацию о том, что это прогноз на завтра
    const tomorrowPrefix =
        weather.tomorrow && !weather.current && !weather.manual
            ? (lang: Language) =>
                  lang === 'ru'
                      ? 'Прогноз на завтра: '
                      : "Tomorrow's forecast: "
            : () => '';

    return {
        ru: `${tomorrowPrefix('ru')}Погода: ${temp}°C, ${weatherData.description}`,
        en: `${tomorrowPrefix('en')}Weather: ${temp}°C, ${description}`
    };
};
