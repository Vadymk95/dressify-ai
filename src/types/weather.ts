import { TEMPERATURE_VALUES } from '@/constants/weather';

export type WeatherIconType =
    | '01d'
    | '02d'
    | '03d'
    | '04d'
    | '09d'
    | '10d'
    | '11d'
    | '13d'
    | '50d'
    | '01n'
    | '02n'
    | '03n'
    | '04n'
    | '09n'
    | '10n'
    | '11n'
    | '13n'
    | '50n';

export interface WeatherCondition {
    value: string;
    label: string;
    icon: WeatherIconType;
}

export interface TemperatureRange {
    value: string;
    label: string;
    range: string;
}

export interface ComboboxOption {
    value: string;
    label: string;
}

export type TemperatureValueType =
    (typeof TEMPERATURE_VALUES)[keyof typeof TEMPERATURE_VALUES];
