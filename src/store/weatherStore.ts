import { t } from 'i18next';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { ComboboxOption } from '@/components/ui/combobox';
import { loadCities } from '@/helpers/cityLoader';
import { useUserProfileStore } from '@/store/userProfileStore';

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_MAP_KEY;
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface Weather {
    temp: number;
    feels_like: number;
    description: string;
    icon: string;
}

interface WeatherState {
    country: string;
    city: string;
    cities: ComboboxOption[];
    cachedCities: { [country: string]: any[] };
    weatherToday: Weather | null;
    weatherTomorrow: Weather | null;
    weatherManual: Weather | null;
    lastUpdated: number | null;
    loadingWeather: boolean;
    loadingCities: boolean;
    error: string | null;
    isManualMode: boolean;
    activeTab: 'location' | 'manual';
    setLocation: (country: string, city: string) => void;
    fetchWeather: (language: string, isTomorrow?: boolean) => Promise<void>;
    fetchCities: (country: string, language: string) => Promise<void>;
    clearWeather: () => void;
    checkWeatherStaleness: (language: string) => void;
    setManualWeather: (weather: Weather) => void;
    setIsManualMode: (isManual: boolean) => void;
    setActiveTab: (tab: 'location' | 'manual') => void;
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
            weatherManual: null,
            lastUpdated: null,
            loadingWeather: false,
            loadingCities: false,
            error: null,
            isManualMode: false,
            activeTab: 'location',
            setLocation: (country, city) => set({ country, city }),
            fetchWeather: async (language, isTomorrow = false) => {
                set({ loadingWeather: true, error: null });
                try {
                    const city =
                        useUserProfileStore.getState().profile?.location
                            ?.city || '';
                    const country =
                        useUserProfileStore.getState().profile?.location
                            ?.country || '';

                    if (!city || !country) {
                        set({
                            loadingWeather: false,
                            weatherTomorrow: null,
                            weatherToday: null,
                            weatherManual: null,
                            lastUpdated: null
                        });
                        return;
                    }

                    const latitude =
                        useUserProfileStore.getState().profile?.location
                            ?.latitude || 0;
                    const longitude =
                        useUserProfileStore.getState().profile?.location
                            ?.longitude || 0;

                    const endpoint = isTomorrow ? 'forecast' : 'weather';
                    const response = await fetch(
                        `${WEATHER_BASE_URL}/${endpoint}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=${language}`
                    );
                    const data = await response.json();

                    const now = Date.now();
                    if (!isTomorrow) {
                        set({
                            weatherToday: {
                                temp: Math.round(data.main.temp),
                                feels_like: Math.round(data.main.feels_like),
                                description: data.weather[0].description,
                                icon: data.weather[0].icon
                            },
                            loadingWeather: false,
                            lastUpdated: now,
                            weatherTomorrow: null,
                            weatherManual: null,
                            isManualMode: false
                        });
                    } else {
                        const tomorrowData = data.list[8];
                        set({
                            weatherTomorrow: {
                                temp: Math.round(tomorrowData.main.temp),
                                feels_like: Math.round(
                                    tomorrowData.main.feels_like
                                ),
                                description:
                                    tomorrowData.weather[0].description,
                                icon: tomorrowData.weather[0].icon
                            },
                            loadingWeather: false,
                            lastUpdated: now,
                            weatherToday: null,
                            weatherManual: null,
                            isManualMode: false
                        });
                    }
                } catch (error: any) {
                    console.error(error);
                    set({
                        error: t(
                            'Components.Features.WeatherPanel.errors.fetchWeatherError'
                        ),
                        loadingWeather: false,
                        weatherTomorrow: null,
                        weatherToday: null,
                        weatherManual: null,
                        lastUpdated: null
                    });
                }
            },

            fetchCities: async (country: string, language: string) => {
                if (!country) {
                    set({ cities: [] });
                    return;
                }

                set({ loadingCities: true, error: null });
                try {
                    const cities = await loadCities(
                        country,
                        language,
                        get().cachedCities,
                        set
                    );
                    set({ cities, loadingCities: false });
                } catch (error: any) {
                    console.error(error);
                    set({
                        error: t(
                            'Components.Features.WeatherPanel.errors.fetchCitiesError'
                        ),
                        loadingCities: false,
                        cities: []
                    });
                }
            },

            clearWeather: () =>
                set({
                    weatherToday: null,
                    weatherTomorrow: null,
                    weatherManual: null,
                    lastUpdated: null,
                    isManualMode: false
                }),

            checkWeatherStaleness: (language) => {
                const { lastUpdated, fetchWeather, isManualMode } = get();
                const THREE_HOURS = 3 * 60 * 60 * 1000;

                if (
                    !isManualMode &&
                    (!lastUpdated || Date.now() - lastUpdated > THREE_HOURS)
                ) {
                    fetchWeather(language);
                }
            },

            setManualWeather: (weather: Weather) => {
                set({
                    weatherToday: null,
                    weatherTomorrow: null,
                    weatherManual: weather,
                    lastUpdated: Date.now(),
                    isManualMode: true,
                    country: '',
                    city: ''
                });
            },

            setIsManualMode: (isManual: boolean) =>
                set({ isManualMode: isManual }),

            setActiveTab: (tab) => set({ activeTab: tab })
        }),
        {
            name: 'weather-store'
        }
    )
);
