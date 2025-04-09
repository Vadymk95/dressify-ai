import { useWeatherStore } from '@/store/weatherStore';
import { Sun } from 'lucide-react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const WeatherPanel: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
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
        <section
            className="group w-full max-w-[200px] mx-auto p-4 flex flex-col items-center main-gradient shadow-md rounded-xl cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out transform-gpu"
            onClick={() => navigate('/weather')}
        >
            <div className="flex items-center gap-2 mb-2">
                <Sun className="w-6 h-6 text-amber-50 group-hover:text-amber-100 transition-colors duration-300" />
                <span className="text-amber-50 font-medium group-hover:text-amber-100 transition-colors duration-300">
                    {t('Components.Features.WeatherPanel.title')}
                </span>
            </div>
            {weather ? (
                <div className="flex flex-col items-center">
                    <span className="text-amber-50/90 text-sm font-medium">
                        {getWeatherType()}
                    </span>
                    <span className="text-amber-50/80 text-sm mt-1">
                        {weather.description}
                    </span>
                    <span className="text-amber-50/70 text-xs mt-1">
                        {weather.temp}°C
                    </span>
                </div>
            ) : (
                <span className="text-amber-50/60 text-sm mt-1">
                    {t('Components.Features.WeatherPanel.noWeather')}
                </span>
            )}
        </section>
    );
};
