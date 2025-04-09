import { TemperatureRange, WeatherCondition } from '@/types/weather';

export const WEATHER_ICONS = {
    SUNNY: '01d',
    PARTLY_CLOUDY: '02d',
    CLOUDY: '03d',
    RAIN: '09d',
    HEAVY_RAIN: '10d',
    SNOW: '13d',
    THUNDERSTORM: '11d'
} as const;

export const TEMPERATURE_VALUES = {
    HOT: 35,
    WARM: 25,
    MODERATE: 10,
    COOL: -5,
    COLD: -15
} as const;

export const getWeatherConditions = (
    t: (key: string) => string
): WeatherCondition[] => [
    {
        value: 'sunny',
        label: t('Pages.Weather.conditions.sunny'),
        icon: WEATHER_ICONS.SUNNY
    },
    {
        value: 'partlyCloudy',
        label: t('Pages.Weather.conditions.partlyCloudy'),
        icon: WEATHER_ICONS.PARTLY_CLOUDY
    },
    {
        value: 'cloudy',
        label: t('Pages.Weather.conditions.cloudy'),
        icon: WEATHER_ICONS.CLOUDY
    },
    {
        value: 'rain',
        label: t('Pages.Weather.conditions.rain'),
        icon: WEATHER_ICONS.RAIN
    },
    {
        value: 'heavyRain',
        label: t('Pages.Weather.conditions.heavyRain'),
        icon: WEATHER_ICONS.HEAVY_RAIN
    },
    {
        value: 'snow',
        label: t('Pages.Weather.conditions.snow'),
        icon: WEATHER_ICONS.SNOW
    },
    {
        value: 'thunderstorm',
        label: t('Pages.Weather.conditions.thunderstorm'),
        icon: WEATHER_ICONS.THUNDERSTORM
    }
];

export const getTemperatureRanges = (
    t: (key: string) => string
): TemperatureRange[] => [
    {
        value: 'hot',
        label: t('Pages.Weather.temperature.hot'),
        range: '> +30°C'
    },
    {
        value: 'warm',
        label: t('Pages.Weather.temperature.warm'),
        range: '+15°C to +30°C'
    },
    {
        value: 'moderate',
        label: t('Pages.Weather.temperature.moderate'),
        range: '0°C to +15°C'
    },
    {
        value: 'cool',
        label: t('Pages.Weather.temperature.cool'),
        range: '-10°C to 0°C'
    },
    {
        value: 'cold',
        label: t('Pages.Weather.temperature.cold'),
        range: '< -10°C'
    }
];
