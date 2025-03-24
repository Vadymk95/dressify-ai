import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WeatherState {
    country: string;
    city: string;
    weatherToday: string | null;
    weatherTomorrow: string | null;
    loading: boolean;
    error: string | null;
    setLocation: (country: string, city: string) => void;
    fetchWeather: (isTomorrow?: boolean) => Promise<void>;
    setWeather: (weatherToday: string, weatherTomorrow?: string) => void;
}

export const useWeatherStore = create<WeatherState>()(
    persist(
        (set, get) => ({
            country: '',
            city: '',
            weatherToday: null,
            weatherTomorrow: null,
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
                    if (!isTomorrow) {
                        set({
                            weatherToday: `Sunny in ${city}`,
                            loading: false
                        });
                    } else {
                        set({
                            weatherTomorrow: `Cloudy in ${city}`,
                            loading: false
                        });
                    }
                } catch (error: any) {
                    set({ error: error.message, loading: false });
                }
            }
        }),
        {
            name: 'weather-store'
        }
    )
);
