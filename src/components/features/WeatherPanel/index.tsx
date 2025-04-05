import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { WeatherWidget } from '@/components/common/WeatherWidget';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    TEMPERATURE_VALUES,
    getTemperatureRanges,
    getWeatherConditions
} from '@/constants/weather';
import { getCityName } from '@/helpers/cityNameParser';
import { useCountryOptions } from '@/hooks/useCountryOptions';
import { useLanguageStore } from '@/store/languageStore';
import { useUserProfileStore } from '@/store/userProfileStore';
import { useWeatherStore } from '@/store/weatherStore';

export const WeatherPanel: FC = () => {
    const { t } = useTranslation();
    const { language } = useLanguageStore();
    const { profile, updateLocation, clearLocation } = useUserProfileStore();
    const {
        country,
        city,
        cities,
        cachedCities,
        fetchWeather,
        clearWeather,
        setLocation,
        fetchCities,
        setManualWeather,
        weatherManual
    } = useWeatherStore();
    const countries = useCountryOptions();

    const weatherConditions = getWeatherConditions(t);
    const temperatureRanges = getTemperatureRanges(t);

    const [selectedCondition, setSelectedCondition] = useState<string>('');
    const [selectedTemperature, setSelectedTemperature] = useState<string>('');
    const [currentDate, setCurrentDate] = useState<Date>(new Date());

    // Инициализация значений из стора при монтировании
    useEffect(() => {
        if (weatherManual) {
            const condition = weatherConditions.find(
                (c) => c.label === weatherManual.description
            );
            if (condition) {
                setSelectedCondition(condition.value);
            }

            const tempValue = Object.entries(TEMPERATURE_VALUES).find(
                ([key]) =>
                    TEMPERATURE_VALUES[
                        key as keyof typeof TEMPERATURE_VALUES
                    ] === weatherManual.temp
            );
            if (tempValue) {
                setSelectedTemperature(tempValue[0].toLowerCase());
            }
        }
    }, [weatherManual, weatherConditions]);

    const handleFetchWeather = async (tomorrow = false) => {
        await updateLocation(country, city);
        await fetchWeather(language, tomorrow);
    };

    const handleSetCountry = (value: string) => {
        setLocation(value, '');
        clearWeather();

        if (profile?.location) {
            clearLocation();
        }
    };

    const handleSetCity = (value: string) => {
        setLocation(country, value);
        clearWeather();

        if (profile?.location && !value) {
            clearLocation();
        }
    };

    const handleManualWeatherSet = (condition: string, temperature: string) => {
        if (condition) {
            setSelectedCondition(condition);
        }
        if (temperature) {
            setSelectedTemperature(temperature);
        }

        const tempValue =
            temperature === 'hot'
                ? TEMPERATURE_VALUES.HOT
                : temperature === 'warm'
                  ? TEMPERATURE_VALUES.WARM
                  : temperature === 'moderate'
                    ? TEMPERATURE_VALUES.MODERATE
                    : temperature === 'cool'
                      ? TEMPERATURE_VALUES.COOL
                      : temperature === 'cold'
                        ? TEMPERATURE_VALUES.COLD
                        : null;

        const currentCondition = condition || selectedCondition;
        const currentTemp = temperature || selectedTemperature;

        if (currentCondition && currentTemp) {
            setManualWeather({
                temp: tempValue || TEMPERATURE_VALUES.MODERATE,
                feels_like: tempValue || TEMPERATURE_VALUES.MODERATE,
                description:
                    weatherConditions.find((c) => c.value === currentCondition)
                        ?.label || '',
                icon:
                    weatherConditions.find((c) => c.value === currentCondition)
                        ?.icon || '01d'
            });
        }
    };

    const getCityDisplayName = () => {
        if (!country || !city) {
            return t('Components.Features.WeatherPanel.selectYourLocation');
        }

        const cleanCityName = getCityName(
            city,
            cachedCities,
            country,
            language,
            false
        );

        return `${t(`Countries.${country}`)}, ${cleanCityName}`;
    };

    useEffect(() => {
        if (country) {
            fetchCities(country, language);
        }
    }, [country, language, fetchCities]);

    useEffect(() => {
        if (profile?.location) {
            setLocation(profile.location.country, profile.location.city);
        }
    }, [profile?.location, setLocation]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDate(new Date());
        }, 60000); // Обновляем каждую минуту

        return () => clearInterval(timer);
    }, []);

    const getDayOfWeek = (date: Date) => {
        const days = [
            'sunday',
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday'
        ];
        return t(
            `Components.Features.WeatherPanel.daysOfWeek.${days[date.getDay()]}`
        );
    };

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat(language, {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(date);
    };

    return (
        <div className="w-full mx-auto p-4 flex flex-col items-center main-gradient shadow-md rounded-xl">
            <div className="text-center mb-4">
                <h2 className="text-2xl font-semibold mb-2 text-amber-50">
                    {t('Components.Features.WeatherPanel.title')}
                </h2>
                <div className="text-amber-50/80">
                    <p className="text-lg font-medium">
                        {t('Components.Features.WeatherPanel.dateFormat.today')}
                        :
                    </p>
                    <p className="text-lg font-medium">
                        {getDayOfWeek(currentDate)}
                    </p>
                    <p className="text-sm">{formatDate(currentDate)}</p>
                </div>
            </div>

            <Tabs defaultValue="location" className="w-full mb-4">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger
                        value="location"
                        className="cursor-pointer hover:bg-amber-500/20 transition-all duration-200"
                    >
                        {t('Components.Features.WeatherPanel.tabs.location')}
                    </TabsTrigger>
                    <TabsTrigger
                        value="manual"
                        className="cursor-pointer hover:bg-amber-500/20 transition-all duration-200"
                    >
                        {t('Components.Features.WeatherPanel.tabs.manual')}
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="location">
                    <Accordion
                        type="single"
                        collapsible
                        className="w-full bg-gray-100 px-4 md:px-6 rounded-lg"
                    >
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="cursor-pointer py-4 text-base">
                                {country && city
                                    ? getCityDisplayName()
                                    : t(
                                          'Components.Features.WeatherPanel.selectYourLocation'
                                      )}
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="grid grid-cols-1 gap-4 w-full mb-6">
                                    <div className="w-full">
                                        <Combobox
                                            className="cursor-pointer p-4"
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
                                            className="cursor-pointer p-4"
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

                                <div className="flex flex-col gap-3 mb-4">
                                    <Button
                                        onClick={() => handleFetchWeather()}
                                        disabled={!country || !city}
                                        className="main-gradient text-amber-50 cursor-pointer shadow-sm p-6 w-full text-base"
                                    >
                                        {t(
                                            'Components.Features.WeatherPanel.fetchWeather'
                                        )}
                                    </Button>

                                    <Button
                                        onClick={() => handleFetchWeather(true)}
                                        disabled={!country || !city}
                                        variant="outline"
                                        className="cursor-pointer shadow-sm p-6 w-full text-base"
                                    >
                                        {t(
                                            'Components.Features.WeatherPanel.fetchTomorrow'
                                        )}
                                    </Button>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </TabsContent>

                <TabsContent
                    value="manual"
                    className="bg-gray-100 rounded-lg p-4 md:p-6"
                >
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-lg font-medium mb-6">
                                {t(
                                    'Components.Features.WeatherPanel.manual.conditions'
                                )}
                            </h3>
                            <RadioGroup
                                value={selectedCondition}
                                onValueChange={(value) =>
                                    handleManualWeatherSet(value, '')
                                }
                                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                            >
                                {weatherConditions.map((condition) => (
                                    <div
                                        key={condition.value}
                                        className="flex items-center space-x-3 p-2 hover:bg-white/50 rounded-lg transition-all duration-200"
                                    >
                                        <RadioGroupItem
                                            value={condition.value}
                                            id={condition.value}
                                            className="w-5 h-5"
                                        />
                                        <Label
                                            htmlFor={condition.value}
                                            className="cursor-pointer text-base flex-1"
                                        >
                                            {condition.label}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium mb-6">
                                {t(
                                    'Components.Features.WeatherPanel.manual.temperature'
                                )}
                            </h3>
                            <RadioGroup
                                value={selectedTemperature}
                                onValueChange={(value) =>
                                    handleManualWeatherSet('', value)
                                }
                                className="grid grid-cols-1 gap-4"
                            >
                                {temperatureRanges.map((range) => (
                                    <div
                                        key={range.value}
                                        className="flex items-center space-x-3 p-2 hover:bg-white/50 rounded-lg transition-all duration-200"
                                    >
                                        <RadioGroupItem
                                            value={range.value}
                                            id={range.value}
                                            className="w-5 h-5"
                                        />
                                        <Label
                                            htmlFor={range.value}
                                            className="cursor-pointer text-base flex-1"
                                        >
                                            <span className="block">
                                                {range.label}
                                            </span>
                                            <span className="text-sm text-gray-500 block mt-1">
                                                {range.range}
                                            </span>
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>

            <WeatherWidget />
        </div>
    );
};

export default WeatherPanel;
