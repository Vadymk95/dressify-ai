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
        label: t('Components.Features.WeatherPanel.conditions.sunny'),
        icon: WEATHER_ICONS.SUNNY
    },
    {
        value: 'partlyCloudy',
        label: t('Components.Features.WeatherPanel.conditions.partlyCloudy'),
        icon: WEATHER_ICONS.PARTLY_CLOUDY
    },
    {
        value: 'cloudy',
        label: t('Components.Features.WeatherPanel.conditions.cloudy'),
        icon: WEATHER_ICONS.CLOUDY
    },
    {
        value: 'rain',
        label: t('Components.Features.WeatherPanel.conditions.rain'),
        icon: WEATHER_ICONS.RAIN
    },
    {
        value: 'heavyRain',
        label: t('Components.Features.WeatherPanel.conditions.heavyRain'),
        icon: WEATHER_ICONS.HEAVY_RAIN
    },
    {
        value: 'snow',
        label: t('Components.Features.WeatherPanel.conditions.snow'),
        icon: WEATHER_ICONS.SNOW
    },
    {
        value: 'thunderstorm',
        label: t('Components.Features.WeatherPanel.conditions.thunderstorm'),
        icon: WEATHER_ICONS.THUNDERSTORM
    }
];

export const getTemperatureRanges = (
    t: (key: string) => string
): TemperatureRange[] => [
    {
        value: 'hot',
        label: t('Components.Features.WeatherPanel.temperature.hot'),
        range: '> +30°C'
    },
    {
        value: 'warm',
        label: t('Components.Features.WeatherPanel.temperature.warm'),
        range: '+15°C to +30°C'
    },
    {
        value: 'moderate',
        label: t('Components.Features.WeatherPanel.temperature.moderate'),
        range: '0°C to +15°C'
    },
    {
        value: 'cool',
        label: t('Components.Features.WeatherPanel.temperature.cool'),
        range: '-10°C to 0°C'
    },
    {
        value: 'cold',
        label: t('Components.Features.WeatherPanel.temperature.cold'),
        range: '< -10°C'
    }
];
