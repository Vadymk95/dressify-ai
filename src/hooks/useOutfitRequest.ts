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
    const { currentResponse, setCurrentResponse } = useOutfitResponseStore();

    const hardcodedResponse = 'Lorem ipsum...'; // ваш текст

    const generateOutfit = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await mockRequest();
            console.log('Response received:', response);
            setCurrentResponse(response);
            return response;
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : t('Components.Features.OutfitRequestPanel.errors.generic')
            );
            setCurrentResponse(null);
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

        if (useWardrobe && hasWardrobeItems && profile?.wardrobe?.categories) {
            requestData.wardrobe = {
                categories: profile.wardrobe.categories.map((category) => ({
                    name: category.name,
                    items: category.items.map((item) => item.name)
                }))
            };
        }

        console.log('Request data:', requestData);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        return hardcodedResponse;
    };

    return {
        isLoading,
        showText: !!currentResponse,
        error,
        generateOutfit,
        hardcodedResponse: currentResponse || hardcodedResponse
    };
};
