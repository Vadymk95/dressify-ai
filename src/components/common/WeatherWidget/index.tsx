import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useWeatherStore } from '@/store/weatherStore';

export const WeatherWidget: FC = () => {
    const { t } = useTranslation();
    const { loadingWeather, weatherToday, weatherTomorrow, error } =
        useWeatherStore();

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
