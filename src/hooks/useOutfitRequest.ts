import { DAILY_REQUEST_LIMITS } from '@/constants/plans';
import {
    BaseOutfit,
    generateOutfitResponse,
    Language,
    WeatherData
} from '@/data/outfits/outfitGenerator';
import { useEventStore } from '@/store/eventStore';
import { useOutfitResponseStore } from '@/store/outfitResponseStore';
import { useUserProfileStore } from '@/store/userProfileStore';
import { useWeatherStore } from '@/store/weatherStore';
import { OutfitRequestData } from '@/types/outfitRequestData';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const useOutfitRequest = () => {
    const { t } = useTranslation();
    const { weatherToday, weatherTomorrow, weatherManual, isManualMode } =
        useWeatherStore();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const { selectedEventType } = useEventStore();
    const { profile, updateProfile } = useUserProfileStore();
    const { aiResponse, standardResponse, setAiResponse, setStandardResponse } =
        useOutfitResponseStore();

    const hardcodedResponse = 'Lorem ipsum...'; // ваш текст

    // Функция для обновления лимитов
    const resetLimits = useCallback(() => {
        if (!profile || profile.plan === 'free') return;

        const now = new Date();
        const nextResetDate = new Date(now);
        nextResetDate.setDate(nextResetDate.getDate() + 1); // Следующий день
        nextResetDate.setHours(0, 0, 0, 0); // Начало следующего дня (полночь)

        const newLimits = {
            remainingRequests: DAILY_REQUEST_LIMITS[profile.plan], // 2 для standard, 5 для pro
            requestsResetAt: nextResetDate.toISOString()
        };

        updateProfile({ ...profile, requestLimits: newLimits });
    }, [profile, updateProfile]);

    // Функция для установки таймера на следующую полночь
    const scheduleNextReset = useCallback(() => {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setHours(24, 0, 0, 0);
        const timeUntilMidnight = tomorrow.getTime() - now.getTime();

        if (resetTimeoutRef.current) {
            clearTimeout(resetTimeoutRef.current);
        }

        resetTimeoutRef.current = setTimeout(() => {
            resetLimits();
            scheduleNextReset(); // Планируем следующий сброс
        }, timeUntilMidnight);
    }, [resetLimits]);

    // Устанавливаем таймер при монтировании и изменении профиля
    useEffect(() => {
        if (profile && profile.plan !== 'free') {
            scheduleNextReset();
        }
        return () => {
            if (resetTimeoutRef.current) {
                clearTimeout(resetTimeoutRef.current);
            }
        };
    }, [profile, scheduleNextReset]);

    // Автоматически очищаем ошибку через 5 секунд
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    // Обновляем ответ при изменении языка
    useEffect(() => {
        if (standardResponse) {
            const requestData = {
                lang: profile?.lang as Language,
                event: {
                    type: selectedEventType as BaseOutfit['event'],
                    name: t(
                        `Components.Features.EventPanel.types.${selectedEventType}`
                    )
                },
                characteristics: {
                    gender:
                        (profile?.characteristics?.gender as
                            | 'male'
                            | 'female') || 'male',
                    age: profile?.characteristics?.age || 25,
                    height: profile?.characteristics?.height || 175,
                    heightUnit: profile?.characteristics?.heightUnit || 'cm',
                    weight: profile?.characteristics?.weight || 70,
                    weightUnit: profile?.characteristics?.weightUnit || 'kg'
                },
                weather: {
                    current: isManualMode
                        ? undefined
                        : (weatherToday as WeatherData),
                    manual: isManualMode
                        ? (weatherManual as WeatherData)
                        : undefined
                }
            };

            const response = generateOutfitResponse(requestData);
            if (response.outfit) {
                setStandardResponse(response.outfit.description);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profile?.lang]);

    const checkRequestLimit = () => {
        if (!profile) return false;

        const { plan, requestLimits } = profile;

        // Если бесплатный план, запросы недоступны
        if (plan === 'free') {
            setError(
                t('Components.Features.OutfitRequestPanel.errors.freePlanLimit')
            );
            return false;
        }

        // Проверяем, нужно ли обновить лимиты
        if (requestLimits?.requestsResetAt) {
            const resetTime = new Date(requestLimits.requestsResetAt);
            const now = new Date();

            if (now >= resetTime) {
                // Время сброса наступило, обновляем лимиты
                resetLimits();
                return true;
            }
        }

        // Если нет лимитов, инициализируем их
        if (!requestLimits) {
            const now = new Date();
            const nextResetDate = new Date(now);
            nextResetDate.setDate(nextResetDate.getDate() + 1);
            nextResetDate.setHours(0, 0, 0, 0);

            const newLimits = {
                remainingRequests: DAILY_REQUEST_LIMITS[plan],
                requestsResetAt: nextResetDate.toISOString()
            };
            updateProfile({ ...profile, requestLimits: newLimits });
            return true;
        }

        // Проверяем оставшиеся запросы
        if (requestLimits.remainingRequests <= 0) {
            setError(
                t(
                    'Components.Features.OutfitRequestPanel.errors.requestLimitReached'
                )
            );
            return false;
        }

        return true;
    };

    const decrementRequestLimit = () => {
        if (!profile?.requestLimits) return;

        const newLimits = {
            ...profile.requestLimits,
            remainingRequests: profile.requestLimits.remainingRequests - 1
        };
        updateProfile({ ...profile, requestLimits: newLimits });
    };

    const checkRequiredFields = () => {
        if (!selectedEventType) {
            setError(
                t('Components.Features.OutfitRequestPanel.errors.noEventType')
            );
            return false;
        }

        if (!profile?.characteristics?.gender) {
            setError(
                t('Components.Features.OutfitRequestPanel.errors.noGender')
            );
            return false;
        }

        return true;
    };

    const generateAiOutfit = async () => {
        setError(null);

        // Проверяем обязательные поля
        if (!checkRequiredFields()) {
            return;
        }

        // Проверяем лимит запросов
        if (!checkRequestLimit()) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await mockRequest();
            console.log('AI Response received:', response);
            setAiResponse(response);
            decrementRequestLimit();
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
        setError(null);

        // Проверяем обязательные поля
        if (!checkRequiredFields()) {
            return;
        }

        // Проверяем верификацию email
        if (!profile?.emailVerified) {
            setError(
                t(
                    'Components.Features.OutfitRequestPanel.errors.emailNotVerified'
                )
            );
            return;
        }

        setIsLoading(true);

        try {
            if (!selectedEventType || !profile?.characteristics) {
                setError(
                    t(
                        'Components.Features.OutfitRequestPanel.errors.missingData'
                    )
                );
                return;
            }

            // Проверяем, что тип события соответствует допустимым значениям
            const validEventTypes: BaseOutfit['event'][] = [
                'casualFriends',
                'workOffice',
                'dateNight',
                'shopping'
            ];
            if (
                !validEventTypes.includes(
                    selectedEventType as BaseOutfit['event']
                )
            ) {
                setError(
                    t(
                        'Components.Features.OutfitRequestPanel.errors.invalidEventType'
                    )
                );
                return;
            }

            // Проверяем, что пол соответствует допустимым значениям
            const validGenders: ('male' | 'female')[] = ['male', 'female'];
            const gender = profile.characteristics.gender as 'male' | 'female';
            if (!validGenders.includes(gender)) {
                setError(
                    t(
                        'Components.Features.OutfitRequestPanel.errors.invalidGender'
                    )
                );
                return;
            }

            const requestData = {
                lang: profile.lang as Language,
                event: {
                    type: selectedEventType as BaseOutfit['event'],
                    name: t(
                        `Components.Features.EventPanel.types.${selectedEventType}`
                    )
                },
                characteristics: {
                    gender: gender,
                    age: profile.characteristics.age || 25,
                    height: profile.characteristics.height || 175,
                    heightUnit: profile.characteristics.heightUnit || 'cm',
                    weight: profile.characteristics.weight || 70,
                    weightUnit: profile.characteristics.weightUnit || 'kg'
                },
                weather: {
                    current: isManualMode
                        ? undefined
                        : (weatherToday as WeatherData),
                    tomorrow: isManualMode
                        ? undefined
                        : (weatherTomorrow as WeatherData),
                    manual: isManualMode
                        ? (weatherManual as WeatherData)
                        : undefined
                }
            };

            console.log('REQUEST DATA', requestData);

            const response = generateOutfitResponse(requestData);

            if (response.error) {
                setError(response.error);
                setStandardResponse(null);
                return;
            }

            if (!response.outfit) {
                setError(
                    t(
                        'Components.Features.OutfitRequestPanel.errors.noOutfitFound'
                    )
                );
                setStandardResponse(null);
                return;
            }

            setStandardResponse(response.outfit.description);
            return response.outfit.description;
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
            lang: profile.lang as Language,
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
                    height: profile.characteristics.height,
                    heightUnit: profile.characteristics.heightUnit
                }),
                ...(profile.characteristics.weight && {
                    weight: profile.characteristics.weight,
                    weightUnit: profile.characteristics.weightUnit
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
        isFreePlan: profile?.plan === 'free',
        remainingRequests: profile?.requestLimits?.remainingRequests ?? 0,
        requestsResetAt: profile?.requestLimits?.requestsResetAt,
        isEmailVerified: profile?.emailVerified ?? false
    };
};
