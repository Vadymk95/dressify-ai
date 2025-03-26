import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import { useCountryOptions } from '@/hooks/useCountryOptions';
import { useLanguageStore } from '@/store/languageStore';
import { useWeatherStore } from '@/store/weatherStore';

export const WeatherPanel: FC = () => {
    const { t } = useTranslation();
    const { language } = useLanguageStore();
    const {
        country,
        city,
        cities,
        weatherToday,
        weatherTomorrow,
        loading,
        error,
        fetchWeather,
        checkWeatherStaleness,
        clearWeather,
        setLocation,
        fetchCities
    } = useWeatherStore();
    const countries = useCountryOptions();

    const handleFetchWeather = async (tomorrow = false) => {
        await fetchWeather(tomorrow);
    };

    const handleSetCountry = (value: string) => {
        setLocation(value, '');
        clearWeather();
    };

    const handleSetCity = (value: string) => {
        setLocation(country, value);
        clearWeather();
    };

    useEffect(() => {
        checkWeatherStaleness();
    }, [checkWeatherStaleness]);

    useEffect(() => {
        if (country && !city) {
            fetchCities(country);
        }
    }, [country, language, fetchCities, city]);

    return (
        <div className="w-full mx-auto p-4 flex flex-col items-center main-gradient shadow-md rounded-xl">
            <h2 className="text-2xl font-semibold mb-4 text-white">
                {t('Components.Features.WeatherPanel.title')}
            </h2>

            {loading ? (
                <p className="mb-4 text-white p-4 text-semibold">
                    {t('Components.Features.WeatherPanel.loading')}
                </p>
            ) : (
                <>
                    {weatherToday && (
                        <p className="mb-4 text-white p-4 text-semibold bg-gray-100/30 rounded-lg">
                            {t(
                                'Components.Features.WeatherPanel.currentWeather'
                            )}{' '}
                            {weatherToday}
                        </p>
                    )}
                    {weatherTomorrow && (
                        <p className="mb-4 text-white p-4 text-semibold bg-gray-100/30 rounded-lg">
                            {t(
                                'Components.Features.WeatherPanel.tomorrowWeather'
                            )}{' '}
                            {weatherTomorrow}
                        </p>
                    )}
                    {error && (
                        <p className="mb-4 text-red-600 text-semibold">
                            {error}
                        </p>
                    )}
                </>
            )}

            <Accordion
                type="single"
                collapsible
                className="w-full bg-gray-100 px-6 rounded-lg"
            >
                <AccordionItem value="item-1">
                    <AccordionTrigger className="cursor-pointer">
                        {country && city
                            ? `${t(`Countries.${country}`)}, ${t(`Countries.${city}`)}`
                            : t(
                                  'Components.Features.WeatherPanel.selectYourLocation'
                              )}
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-8 w-full mb-8">
                            <div className="w-full">
                                <Combobox
                                    className="cursor-pointer md:p-4 p-6"
                                    options={countries}
                                    value={country}
                                    onValueChange={handleSetCountry}
                                    placeholder={t(
                                        'Components.Features.WeatherPanel.selectCountry'
                                    )}
                                    emptyMessage={t(
                                        'Components.Features.WeatherPanel.noCountryFound'
                                    )}
                                />
                            </div>
                            <div className="w-full">
                                <Combobox
                                    className="cursor-pointer md:p-4 p-6"
                                    disabled={!country}
                                    options={cities}
                                    value={city}
                                    onValueChange={handleSetCity}
                                    placeholder={t(
                                        'Components.Features.WeatherPanel.selectCity'
                                    )}
                                    emptyMessage={t(
                                        'Components.Features.WeatherPanel.noCityFound'
                                    )}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <Button
                                onClick={() => handleFetchWeather()}
                                disabled={!country || !city}
                                className="main-gradient text-white cursor-pointer shadow-sm md:p-4 p-6 md:w-fit w-full"
                            >
                                {t(
                                    'Components.Features.WeatherPanel.fetchWeather'
                                )}
                            </Button>

                            <Button
                                onClick={() => handleFetchWeather(true)}
                                disabled={!country || !city}
                                variant="outline"
                                className="cursor-pointer shadow-sm md:p-4 p-6 md:w-fit w-full"
                            >
                                {t(
                                    'Components.Features.WeatherPanel.fetchTomorrow'
                                )}
                            </Button>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default WeatherPanel;
