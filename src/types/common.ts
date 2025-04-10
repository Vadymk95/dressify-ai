export type Language = 'ru' | 'en';
export type Gender = 'male' | 'female';
export type EventType =
    | 'casualFriends'
    | 'workOffice'
    | 'dateNight'
    | 'shopping';

export type WeatherData = {
    temp: number;
    feels_like: number;
    description: string;
    icon: string;
};
