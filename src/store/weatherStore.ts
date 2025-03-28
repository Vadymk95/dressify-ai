import { t } from 'i18next';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { ComboboxOption } from '@/components/ui/combobox';
import { loadCities } from '@/helpers/cityLoader';
import { getCityName } from '@/helpers/cityNameParser';

// const API_KEY = import.meta.env.VITE_OPEN_WEATHER_MAP_KEY;

interface WeatherState {
    country: string;
    city: string;
    cities: ComboboxOption[];
    cachedCities: { [country: string]: any[] };
    weatherToday: string | null;
    weatherTomorrow: string | null;
    lastUpdated: number | null;
    loading: boolean;
    error: string | null;
    setLocation: (country: string, city: string) => void;
    fetchWeather: (language: string, isTomorrow?: boolean) => Promise<void>;
    fetchCities: (country: string, language: string) => Promise<void>;
    setWeather: (weatherToday: string, weatherTomorrow?: string) => void;
    clearWeather: () => void;
    checkWeatherStaleness: (language: string) => void;
}

export const useWeatherStore = create<WeatherState>()(
    persist(
        (set, get) => ({
            country: '',
            city: '',
            cities: [],
            cachedCities: {},
            weatherToday: null,
            weatherTomorrow: null,
            lastUpdated: null,
            loading: false,
            error: null,
            setLocation: (country, city) => set({ country, city }),
            setWeather: (weatherToday, weatherTomorrow) =>
                set({ weatherToday, weatherTomorrow: weatherTomorrow || null }),
            fetchWeather: async (language, isTomorrow = false) => {
                set({ loading: true, error: null });
                try {
                    // Здесь вместо API-вызываем задержку и возвращаем пример данных.
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    const { city, country, cachedCities } = get();
                    const cleanCityName = getCityName(
                        city,
                        cachedCities,
                        country,
                        language,
                        false
                    );
                    const now = Date.now();
                    if (!isTomorrow) {
                        set({
                            weatherToday: `Sunny in ${cleanCityName}`,
                            loading: false,
                            weatherTomorrow: null,
                            lastUpdated: now
                        });
                    } else {
                        set({
                            weatherTomorrow: `Cloudy in ${cleanCityName}`,
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
                    const cities = await loadCities(
                        country,
                        language,
                        get().cachedCities,
                        set
                    );
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
            checkWeatherStaleness: (language) => {
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
                            fetchWeather(language);
                        }
                    }
                } else {
                    if (city && country) {
                        fetchWeather(language);
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
