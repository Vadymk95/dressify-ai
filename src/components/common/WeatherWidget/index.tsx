import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useLanguageStore } from '@/store/languageStore';
import { useWeatherStore } from '@/store/weatherStore';
import { useUserProfileStore } from '@/store/userProfileStore';

export const WeatherWidget: FC = () => {
    const { t } = useTranslation();
    const { language } = useLanguageStore();
    const { profile } = useUserProfileStore();
    const {
        loadingWeather,
        weatherToday,
        weatherTomorrow,
        error,
        fetchWeather,
        checkWeatherStaleness
    } = useWeatherStore();

    useEffect(() => {
        checkWeatherStaleness(language);
    }, [checkWeatherStaleness, language]);

    useEffect(() => {
        if (profile?.location) {
            fetchWeather(language);
        }
    }, [language, profile?.location, fetchWeather]);

    return loadingWeather ? (
        <p className="mb-4 text-white p-4 text-semibold">
            {t('Components.Common.WeatherWidget.loading')}
        </p>
    ) : (
        <>
            {weatherToday && (
                <p className="mb-4 text-white p-4 text-semibold bg-gray-100/30 rounded-lg">
                    {t('Components.Common.WeatherWidget.currentWeather')}{' '}
                    {weatherToday}
                </p>
            )}
            {weatherTomorrow && (
                <p className="mb-4 text-white p-4 text-semibold bg-gray-100/30 rounded-lg">
                    {t('Components.Common.WeatherWidget.tomorrowWeather')}{' '}
                    {weatherTomorrow}
                </p>
            )}
            {error && (
                <p className="mb-4 text-red-600 text-semibold">{error}</p>
            )}
        </>
    );
};
