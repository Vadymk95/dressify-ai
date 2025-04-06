import { useEventStore } from '@/store/eventStore';
import { useOutfitResponseStore } from '@/store/outfitResponseStore';
import { useUserProfileStore } from '@/store/userProfileStore';
import { useWeatherStore } from '@/store/weatherStore';
import { OutfitRequestData } from '@/types/outfitRequestData';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const useOutfitRequest = () => {
    const { t } = useTranslation();
    const { weatherToday, weatherTomorrow, weatherManual, isManualMode } =
        useWeatherStore();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { selectedEventType } = useEventStore();
    const { profile } = useUserProfileStore();
    const { aiResponse, standardResponse, setAiResponse, setStandardResponse } =
        useOutfitResponseStore();

    const hardcodedResponse = 'Lorem ipsum...'; // ваш текст
    const standardHardcodedResponse =
        'Стандартный образ: черные брюки, белая рубашка, классические туфли';

    const generateAiOutfit = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await mockRequest();
            console.log('AI Response received:', response);
            setAiResponse(response);
            return response;
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : t('Components.Features.OutfitRequestPanel.errors.generic')
            );
            setAiResponse(null);
        } finally {
            setIsLoading(false);
        }
    };

    const generateStandardOutfit = async () => {
        setIsLoading(true);
        setError(null);

        try {
            // Здесь будет логика для стандартных образов
            console.log('Generating standard outfit...');
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Имитация задержки
            setStandardResponse(standardHardcodedResponse);
            return standardHardcodedResponse;
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : t('Components.Features.OutfitRequestPanel.errors.generic')
            );
            setStandardResponse(null);
        } finally {
            setIsLoading(false);
        }
    };

    const mockRequest = async () => {
        if (!selectedEventType) {
            throw new Error(
                t('Components.Features.OutfitRequestPanel.errors.noEventType')
            );
        }

        if (
            !isManualMode &&
            (!profile?.location?.city || !profile?.location?.country)
        ) {
            throw new Error(
                t('Components.Features.OutfitRequestPanel.errors.noLocation')
            );
        }

        if (!profile?.characteristics?.gender) {
            throw new Error(
                t('Components.Features.OutfitRequestPanel.errors.noGender')
            );
        }

        const requestData: OutfitRequestData = {
            event: {
                type: selectedEventType,
                name: t(
                    `Components.Features.EventPanel.types.${selectedEventType}`
                )
            },
            location:
                isManualMode || !profile?.location
                    ? null
                    : {
                          city: profile.location.city,
                          country: profile.location.country
                      },
            characteristics: {
                gender: profile.characteristics.gender,
                ...(profile.characteristics.stylePreference?.length && {
                    stylePreference: profile.characteristics.stylePreference
                }),
                ...(profile.characteristics.age && {
                    age: profile.characteristics.age
                }),
                ...(profile.characteristics.height && {
                    height: profile.characteristics.height
                }),
                ...(profile.characteristics.weight && {
                    weight: profile.characteristics.weight
                }),
                ...(profile.characteristics.skinTone && {
                    skinTone: profile.characteristics.skinTone
                }),
                ...(profile.characteristics.hairColor && {
                    hairColor: profile.characteristics.hairColor
                }),
                ...(profile.characteristics.eyeColor && {
                    eyeColor: profile.characteristics.eyeColor
                }),
                ...(profile.characteristics.bodyType && {
                    bodyType: profile.characteristics.bodyType
                }),
                ...(profile.characteristics.preferredColors?.length && {
                    preferredColors: profile.characteristics.preferredColors
                })
            },
            weather: {
                current: isManualMode ? null : weatherToday,
                tomorrow: isManualMode ? null : weatherTomorrow,
                manual: isManualMode ? weatherManual : null
            }
        };

        const useWardrobe = profile?.wardrobe?.useWardrobeForOutfits;
        const hasWardrobeItems = profile?.wardrobe?.categories?.some(
            (category) => category.items.length > 0
        );

        console.log('BEFORE', requestData);

        if (useWardrobe && hasWardrobeItems && profile?.wardrobe?.categories) {
            requestData.wardrobe = {
                categories: profile.wardrobe.categories
                    .filter((category) => category.items.length > 0)
                    .map((category) => ({
                        name: category.name,
                        items: category.items.map((item) => item.name)
                    }))
            };
        }

        // Очищаем объект от пустых значений
        const cleanObject = (obj: any): any => {
            if (Array.isArray(obj)) {
                return obj
                    .map((item) => cleanObject(item))
                    .filter(
                        (item) =>
                            item !== null && item !== undefined && item !== ''
                    );
            }

            if (obj && typeof obj === 'object') {
                const cleaned: any = {};
                for (const [key, value] of Object.entries(obj)) {
                    const cleanedValue = cleanObject(value);
                    if (
                        cleanedValue !== null &&
                        cleanedValue !== undefined &&
                        cleanedValue !== ''
                    ) {
                        cleaned[key] = cleanedValue;
                    }
                }
                return Object.keys(cleaned).length ? cleaned : null;
            }

            return obj;
        };

        const cleanedRequestData = cleanObject(requestData);
        console.log('Cleaned request data:', cleanedRequestData);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        return hardcodedResponse;
    };

    return {
        isLoading,
        showText: !!(aiResponse || standardResponse),
        error,
        generateAiOutfit,
        generateStandardOutfit,
        aiResponse,
        standardResponse,
        isFreePlan: profile?.plan === 'free'
    };
};
