import { Sun } from 'lucide-react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { routes } from '@/router/routes';
import { useWeatherStore } from '@/store/weatherStore';

export const WeatherPanel: FC = () => {
    const { t } = useTranslation();
    const { weatherToday, weatherTomorrow, weatherManual, isManualMode } =
        useWeatherStore();

    const weather = isManualMode
        ? weatherManual
        : weatherToday || weatherTomorrow;

    const getWeatherType = () => {
        if (isManualMode)
            return t('Components.Common.WeatherWidget.manualWeather');
        if (weatherToday)
            return t('Components.Common.WeatherWidget.currentWeather');
        if (weatherTomorrow)
            return t('Components.Common.WeatherWidget.tomorrowWeather');
        return '';
    };

    return (
        <section className="w-full h-full">
            <Link
                to={routes.weather}
                className="group h-full p-6 flex flex-col items-center justify-center gap-4 main-gradient shadow-md rounded-xl cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out transform-gpu"
            >
                <div className="flex flex-col items-center gap-2">
                    <Sun className="w-12 h-12 text-amber-50 group-hover:text-amber-100 transition-colors duration-300" />
                    <span className="text-amber-50 text-base font-medium group-hover:text-amber-100 transition-colors duration-300">
                        {t('Components.Features.WeatherPanel.title')}
                    </span>
                </div>
                {weather ? (
                    <div className="flex items-center gap-1">
                        <span className="text-amber-50/90 text-sm font-medium">
                            {getWeatherType()}:
                        </span>
                        <span className="text-amber-50/80 text-sm">
                            {weather.description}
                        </span>
                        <span className="text-amber-50/70 text-sm">
                            {weather.temp}°C
                        </span>
                    </div>
                ) : (
                    <span className="text-amber-50/60 text-sm">
                        {t('Components.Features.WeatherPanel.noWeather')}
                    </span>
                )}
            </Link>
        </section>
    );
};
