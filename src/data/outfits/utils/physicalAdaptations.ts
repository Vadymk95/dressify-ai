export const getPhysicalAdaptations = (
    weatherDescription: string,
    temp: number,
    height: number,
    age: number
) => {
    const isVeryShort = height < 140;
    // Особые случаи для пожилого возраста
    const isElderly = age >= 70;

    // Определяем тип погоды
    const isRainy =
        weatherDescription.toLowerCase().includes('дождь') ||
        weatherDescription.toLowerCase().includes('ливень') ||
        weatherDescription.toLowerCase().includes('rain');
    const isSnowy =
        weatherDescription.toLowerCase().includes('снег') ||
        weatherDescription.toLowerCase().includes('snow');
    const isWindy =
        weatherDescription.toLowerCase().includes('ветер') ||
        weatherDescription.toLowerCase().includes('wind');

    const isSunny =
        weatherDescription.toLowerCase().includes('солнечно') ||
        weatherDescription.toLowerCase().includes('ясно') ||
        weatherDescription.toLowerCase().includes('sunny') ||
        weatherDescription.toLowerCase().includes('clear');

    const isHot = temp >= 25;
    const isCold = temp <= 10; // Изменено с 5 на 10 для более теплой одежды
    const isFoggy =
        weatherDescription.toLowerCase().includes('туман') ||
        weatherDescription.toLowerCase().includes('fog');
    const isThunderstorm =
        weatherDescription.toLowerCase().includes('гроза') ||
        weatherDescription.toLowerCase().includes('thunderstorm');
    const isOvercast =
        weatherDescription.toLowerCase().includes('пасмурно') ||
        weatherDescription.toLowerCase().includes('облачно') ||
        weatherDescription.toLowerCase().includes('overcast') ||
        weatherDescription.toLowerCase().includes('cloudy');

    return {
        isVeryShort,
        isElderly,
        isRainy,
        isSnowy,
        isWindy,
        isSunny,
        isHot,
        isCold,
        isFoggy,
        isThunderstorm,
        isOvercast
    };
};
