import { BaseOutfit } from '@/data/outfits/types';

import { OutfitRequest } from '@/data/outfits/types';
import { getWeatherInfo } from '@/data/outfits/utils/weatherInfo';

export function generateOutfitDescription(
    outfit: BaseOutfit,
    request: OutfitRequest
): string {
    let description = outfit.baseDescription[request.lang];

    // Добавляем информацию о погоде
    const weatherInfo = getWeatherInfo(request.weather);
    if (weatherInfo) {
        description += ` ${weatherInfo[request.lang]}`;
    }

    return description;
}
