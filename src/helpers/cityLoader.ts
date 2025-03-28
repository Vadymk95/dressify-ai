import { ComboboxOption } from '@/components/ui/combobox';
import admin1Translations from '@/data/admin1Translations.json';

export const loadCities = async (
    country: string,
    language: string,
    cachedCities: { [country: string]: any[] },
    set: (state: Partial<any>) => void
): Promise<ComboboxOption[]> => {
    if (cachedCities[country]) {
        const filteredCities = cachedCities[country];
        return filteredCities.map((city: any) => {
            const cityName = city.translations[language] || city.name;
            const stateName =
                (admin1Translations as any)[city.admin1Code]?.[language] || '';
            return {
                value: `${city.name}|${city.latitude}|${city.longitude}`,
                label: stateName ? `${cityName}, ${stateName}` : cityName
            };
        });
    }

    // Загружаем данные, если кэша нет
    const citiesData = await import(`@/data/cities/cities_${country}.min.json`);
    const filteredCities = citiesData.default;

    // Обновляем кэш
    set((state: any) => {
        const newCachedCities = {
            ...state.cachedCities,
            [country]: filteredCities
        };
        // Ограничиваем кэш до 3 стран
        const keys = Object.keys(newCachedCities);
        if (keys.length > 3) {
            const oldestKey = keys[0]; // Удаляем самую старую страну
            delete newCachedCities[oldestKey];
        }
        return { cachedCities: newCachedCities };
    });

    // Формируем ComboboxOption[]
    return filteredCities.map((city: any) => {
        const cityName = city.translations[language] || city.name;
        const stateName =
            (admin1Translations as any)[city.admin1Code]?.[language] || '';
        return {
            value: `${city.name}|${city.latitude}|${city.longitude}`,
            label: stateName ? `${cityName}, ${stateName}` : cityName
        };
    });
};
