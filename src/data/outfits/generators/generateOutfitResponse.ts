import { generateOutfitDescription } from '@/data/outfits/generators/generateOutfitDescription';
import { OutfitRequest } from '@/data/outfits/types';
import { adaptOutfitForWeather } from '@/data/outfits/utils/adaptOutfitForWeather';
import { findMatchingOutfit } from '@/data/outfits/utils/helpers';

export const generateOutfitResponse = (request: OutfitRequest) => {
    const outfit = findMatchingOutfit(request);
    if (!outfit) {
        return {
            error:
                request.lang === 'ru'
                    ? 'Не удалось найти подходящий образ'
                    : 'Could not find a matching outfit'
        };
    }

    // Адаптируем образ под погодные условия и физические характеристики
    // Приоритет: текущая погода -> мануальные данные -> прогноз на завтра
    const weatherData =
        request.weather.current ||
        request.weather.manual ||
        request.weather.tomorrow;
    const adaptedOutfit = weatherData
        ? adaptOutfitForWeather(outfit, weatherData, request.lang, {
              height: request.characteristics.height,
              heightUnit: request.characteristics.heightUnit,
              weight: request.characteristics.weight,
              weightUnit: request.characteristics.weightUnit,
              age: request.characteristics.age
          })
        : outfit;

    const description = generateOutfitDescription(adaptedOutfit, request);

    return {
        outfit: {
            description,
            items: {
                top: adaptedOutfit.coreItems.top[request.lang],
                bottom: adaptedOutfit.coreItems.bottom[request.lang],
                shoes: adaptedOutfit.coreItems.shoes[request.lang],
                accessories: adaptedOutfit.coreItems.accessories[request.lang]
            },
            event: request.event.name
        }
    };
};
