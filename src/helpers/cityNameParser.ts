import admin1Translations from '@/data/admin1Translations.json';

export const getCityName = (
    city: string, // Строка вида "Одеса|46.48572|30.74383"
    cachedCities: { [country: string]: any[] }, // Кэш из стора
    country: string, // Текущая страна
    language: string, // Текущий язык
    withState: boolean = false // Включать область или нет
): string => {
    const cityName = city.split('|')[0]; // Извлекаем имя из строки
    const cityData = cachedCities[country]?.find(
        (c: any) => c.name === cityName
    );

    if (!cityData) {
        return cityName; // Если данных нет, возвращаем базовое имя
    }

    const translatedCityName = cityData.translations[language] || cityName;
    if (!withState) {
        return translatedCityName; // Только имя города
    }

    const translatedStateName =
        (admin1Translations as any)[cityData.admin1Code]?.[language] || '';
    return translatedStateName
        ? `${translatedCityName}, ${translatedStateName}`
        : translatedCityName;
};
