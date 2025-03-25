import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Combobox, ComboboxOption } from '@/components/ui/combobox';
import { useWeatherStore } from '@/store/weatherStore';

const countryOptions: ComboboxOption[] = [
    { value: 'UA', label: 'Украина' },
    { value: 'US', label: 'United States' }
    // ...другие страны
];

const cityOptions: ComboboxOption[] = [{ value: 'KH', label: 'Харьков' }];

export const WeatherPanel: FC = () => {
    const { t } = useTranslation();
    const { weatherToday, weatherTomorrow, loading, error, fetchWeather } =
        useWeatherStore();
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');

    const handleFetchWeather = async (tomorrow = false) => {
        await fetchWeather(tomorrow);
    };

    const handleSetCountry = (value: string) => {
        setCountry(value);
    };

    const handleSetCity = (value: string) => {
        setCity(value);
    };

    return (
        <div className="w-full mx-auto p-4 flex flex-col items-center main-gradient shadow-md rounded-xl">
            <h2 className="text-2xl font-semibold mb-4 text-white">
                {t('Components.WeatherPanel.title', 'Weather Overview')}
            </h2>

            {loading ? (
                <p className="mb-4 text-white">
                    {t('Components.WeatherPanel.loading', 'Loading weather...')}
                </p>
            ) : (
                <>
                    {error && <p className="mb-4 text-red-600">{error}</p>}
                    {weatherToday && (
                        <p className="mb-4 text-white">
                            {t(
                                'Components.WeatherPanel.currentWeather',
                                'Current weather:'
                            )}{' '}
                            {weatherToday}
                        </p>
                    )}
                    {weatherTomorrow && (
                        <p className="mb-4 text-white">
                            {t(
                                'Components.WeatherPanel.tomorrowWeather',
                                "Tomorrow's weather:"
                            )}{' '}
                            {weatherTomorrow}
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
                        Select your location
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-8 w-full mb-8">
                            <div className="w-full">
                                <Combobox
                                    className="cursor-pointer md:p-4 p-6"
                                    options={countryOptions}
                                    value={country}
                                    onValueChange={handleSetCountry}
                                    placeholder="Select country..."
                                    emptyMessage="No countries found"
                                />
                            </div>
                            <div className="w-full">
                                <Combobox
                                    className="cursor-pointer md:p-4 p-6"
                                    options={cityOptions}
                                    value={city}
                                    onValueChange={handleSetCity}
                                    placeholder="Select city..."
                                    emptyMessage="No cities found"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <Button
                                onClick={() => handleFetchWeather()}
                                className="main-gradient text-white cursor-pointer shadow-sm md:p-4 p-6 md:w-fit w-full"
                            >
                                {t(
                                    'Components.WeatherPanel.fetchWeather',
                                    'Get Current Weather'
                                )}
                            </Button>

                            <Button
                                onClick={() => handleFetchWeather(true)}
                                variant="outline"
                                className="cursor-pointer shadow-sm md:p-4 p-6 md:w-fit w-full"
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
        </div>
    );
};

export default WeatherPanel;
