import { t } from 'i18next';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { ComboboxOption } from '@/components/ui/combobox';

import admin1Translations from '@/data/admin1Translations.json';

// const API_KEY = import.meta.env.VITE_OPEN_WEATHER_MAP_KEY;

interface WeatherState {
    country: string;
    city: string;
    cities: ComboboxOption[];
    weatherToday: string | null;
    weatherTomorrow: string | null;
    lastUpdated: number | null;
    loading: boolean;
    error: string | null;
    setLocation: (country: string, city: string) => void;
    fetchWeather: (isTomorrow?: boolean) => Promise<void>;
    fetchCities: (country: string, language: string) => Promise<void>;
    setWeather: (weatherToday: string, weatherTomorrow?: string) => void;
    clearWeather: () => void;
    checkWeatherStaleness: () => void;
}

export const useWeatherStore = create<WeatherState>()(
    persist(
        (set, get) => ({
            country: '',
            city: '',
            cities: [],
            weatherToday: null,
            weatherTomorrow: null,
            lastUpdated: null,
            loading: false,
            error: null,
            setLocation: (country, city) => set({ country, city }),
            setWeather: (weatherToday, weatherTomorrow) =>
                set({ weatherToday, weatherTomorrow: weatherTomorrow || null }),
            fetchWeather: async (isTomorrow = false) => {
                set({ loading: true, error: null });
                try {
                    // Здесь вместо API-вызываем задержку и возвращаем пример данных.
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    const { city } = get();
                    const now = Date.now();
                    if (!isTomorrow) {
                        set({
                            weatherToday: `Sunny in ${city}`,
                            loading: false,
                            weatherTomorrow: null,
                            lastUpdated: now
                        });
                    } else {
                        set({
                            weatherTomorrow: `Cloudy in ${city}`,
                            loading: false,
                            weatherToday: null,
                            lastUpdated: now
                        });
                    }
                } catch (error: any) {
                    console.error(error);
                    set({
                        error: t(
                            'Components.Features.WeatherPanel.errors.fetchWeatherError'
                        ),
                        loading: false,
                        weatherTomorrow: null,
                        weatherToday: null
                    });
                }
            },

            fetchCities: async (country: string, language: string) => {
                if (!country) {
                    set({ cities: [] });
                    return;
                }

                set({ loading: true, error: null });
                try {
                    const citiesData = await import(
                        `@/data/cities/cities_${country}.min.json`
                    );
                    const filteredCities = citiesData.default;

                    // Формируем список городов с переводами
                    const cities = filteredCities.map((city: any) => {
                        const cityName =
                            city.translations[language] || city.name;
                        const stateName =
                            // @ts-expect-error admin1Code is not in the type
                            admin1Translations[city.admin1Code]?.[language] ||
                            '';

                        return {
                            value: `${city.name}|${city.latitude}|${city.longitude}`,
                            label: stateName
                                ? `${cityName}, ${stateName}`
                                : cityName
                        };
                    });

                    set({ cities, loading: false });
                } catch (error: any) {
                    console.error(error);
                    set({
                        error: t(
                            'Components.Features.WeatherPanel.errors.fetchCitiesError'
                        ),
                        loading: false,
                        cities: []
                    });
                }
            },

            clearWeather: () =>
                set({
                    weatherToday: null,
                    weatherTomorrow: null,
                    lastUpdated: null
                }),

            // Проверка, актуальны ли данные погоды (сравниваем дату обновления с сегодняшней)
            checkWeatherStaleness: () => {
                const { lastUpdated, fetchWeather, city, country } = get();
                if (lastUpdated) {
                    const lastDate = new Date(lastUpdated);
                    const now = new Date();
                    if (
                        lastDate.getDate() !== now.getDate() ||
                        lastDate.getMonth() !== now.getMonth() ||
                        lastDate.getFullYear() !== now.getFullYear()
                    ) {
                        // Если данные устарели, очищаем и запускаем новый запрос
                        set({
                            weatherToday: null,
                            weatherTomorrow: null,
                            lastUpdated: null
                        });
                        if (city && country) {
                            fetchWeather();
                        }
                    }
                } else {
                    if (city && country) {
                        fetchWeather();
                    }
                }
            }
        }),
        {
            name: 'weather-store',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
);
