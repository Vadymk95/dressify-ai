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

export const WeatherPanel: FC = () => {
    const { t } = useTranslation();
    const { weatherToday, weatherTomorrow, loading, error, fetchWeather } =
        useWeatherStore();
    const [country1, setCountry] = useState('');

    const handleFetchWeather = async (tomorrow = false) => {
        await fetchWeather(tomorrow);
    };

    return (
        <div className="w-full p-4">
            <h2 className="text-xl font-semibold mb-4">
                {t('Components.WeatherPanel.title', 'Weather')}
            </h2>

            <h3>погода здесь</h3>

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
                        <Combobox
                            options={countryOptions}
                            value={country1}
                            onValueChange={setCountry}
                            placeholder="Select country..."
                        />

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
        </div>
    );
};

export default WeatherPanel;
