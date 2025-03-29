import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useLanguageStore } from '@/store/languageStore';
import { useWeatherStore } from '@/store/weatherStore';

export const WeatherWidget: FC = () => {
    const { t } = useTranslation();
    const { language } = useLanguageStore();
    const {
        loadingWeather,
        weatherToday,
        weatherTomorrow,
        error,
        checkWeatherStaleness
    } = useWeatherStore();

    useEffect(() => {
        checkWeatherStaleness(language);
    }, [checkWeatherStaleness, language]);

    if (loadingWeather)
        return (
            <p className="text-center p-4 text-gray-500">
                {t('Components.Common.WeatherWidget.loading')}
            </p>
        );

    if (error) return <p className="text-center p-4 text-red-500">{error}</p>;

    const weather = weatherToday || weatherTomorrow;

    if (!weather) return null;

    return (
        <div className="w-full flex flex-col items-center gap-2 py-4 px-6 mb-4 bg-gray-100/30 text-white rounded-xl shadow-lg">
            <p className="mt-2 opacity-75">
                {weatherToday
                    ? t('Components.Common.WeatherWidget.currentWeather')
                    : t('Components.Common.WeatherWidget.tomorrowWeather')}
            </p>
            <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt={weather.description}
                className="w-16 h-16"
            />

            <p className="text-4xl font-semibold">{weather.temp}&deg;C</p>

            <p className="text-lg capitalize">{weather.description}</p>

            <p className="text-sm font-medium">
                <span>{t('Components.Common.WeatherWidget.feelsLike')}</span>
                <span className="font-bold">{weather.feels_like}&deg;C</span>
            </p>
        </div>
    );
};
