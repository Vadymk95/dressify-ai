import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useWeatherStore } from '@/store/weatherStore';

export const WeatherPanel: FC = () => {
    const { t } = useTranslation();
    const {
        country,
        city,
        weatherToday,
        weatherTomorrow,
        loading,
        error,
        setLocation,
        fetchWeather
    } = useWeatherStore();
    const [manualOverride, setManualOverride] = useState(false);

    // Если геолокация доступна и пользователь не выбрал вручную, попытка определить локацию
    useEffect(() => {
        if (navigator.geolocation && !manualOverride && !country && !city) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    console.log(position);
                    // Здесь можно вызвать API для обратного геокодинга.
                    // Для примера установим фиксированные данные.
                    setLocation('USA', 'New York');
                    await fetchWeather();
                },
                (err) => {
                    console.error(err);
                    setManualOverride(true);
                }
            );
        }
    }, [manualOverride, country, city, setLocation, fetchWeather]);

    const handleCountryChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLocation(e.target.value, city);
    };

    const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLocation(country, e.target.value);
    };

    const handleFetchWeather = async (tomorrow = false) => {
        await fetchWeather(tomorrow);
    };

    return (
        <div className="w-full p-4">
            <h2 className="text-xl font-semibold mb-4">
                {t('Components.WeatherPanel.title', 'Weather')}
            </h2>

            <h3>погода здесь</h3>

            <Accordion
                type="single"
                collapsible
                className="w-full bg-blue-300 px-6 rounded-lg max-w-xl mx-auto"
            >
                <AccordionItem value="item-1">
                    <AccordionTrigger className="cursor-pointer">
                        Is it accessible?
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="mb-4">
                            <label className="block text-sm mb-1">
                                {t(
                                    'Components.WeatherPanel.country',
                                    'Country'
                                )}
                            </label>
                            <Input
                                className="bg-gray-100"
                                type="text"
                                value={country}
                                onChange={handleCountryChange}
                                placeholder={t(
                                    'Components.WeatherPanel.countryPlaceholder',
                                    'Enter country'
                                )}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm mb-1">
                                {t('Components.WeatherPanel.city', 'City')}
                            </label>
                            <Input
                                className="bg-gray-100"
                                type="text"
                                value={city}
                                onChange={handleCityChange}
                                placeholder={t(
                                    'Components.WeatherPanel.cityPlaceholder',
                                    'Enter city'
                                )}
                            />
                        </div>

                        <div className="flex items-center justify-center gap-4 flex-wrap">
                            <Button
                                onClick={() => handleFetchWeather()}
                                className="bg-red-500 text-white cursor-pointer"
                            >
                                {t(
                                    'Components.WeatherPanel.fetchWeather',
                                    'Get Current Weather'
                                )}
                            </Button>
                            <Button
                                onClick={() => handleFetchWeather(true)}
                                className="bg-red-500 text-white cursor-pointer"
                            >
                                {t(
                                    'Components.WeatherPanel.fetchTomorrow',
                                    "Get Tomorrow's Weather"
                                )}
                            </Button>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            {loading && (
                <p>
                    {t('Components.WeatherPanel.loading', 'Loading weather...')}
                </p>
            )}
            {error && <p className="text-red-600">{error}</p>}
            {weatherToday && (
                <p className="mt-4">
                    {t(
                        'Components.WeatherPanel.currentWeather',
                        'Current weather:'
                    )}{' '}
                    {weatherToday}
                </p>
            )}
            {weatherTomorrow && (
                <p className="mt-4">
                    {t(
                        'Components.WeatherPanel.tomorrowWeather',
                        "Tomorrow's weather:"
                    )}{' '}
                    {weatherTomorrow}
                </p>
            )}
        </div>
    );
};

export default WeatherPanel;
