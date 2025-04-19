import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DAILY_REQUEST_LIMITS } from '@/constants/plans';
import { BaseOutfit, Language, WeatherData } from '@/data/outfits/types';
import { useEventStore } from '@/store/eventStore';
import { useOutfitResponseStore } from '@/store/outfitResponseStore';
import { useUserProfileStore } from '@/store/userProfileStore';
import { useWeatherStore } from '@/store/weatherStore';
import { EventType, Gender } from '@/types/common';
import { OutfitRequestData } from '@/types/outfitRequestData';

export const useOutfitRequest = () => {
    const { t } = useTranslation();
    const { weatherToday, weatherTomorrow, weatherManual, isManualMode } =
        useWeatherStore();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [standardResponse, setStandardResponse] = useState<string | null>(
        null
    );
    const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Добавляем локальное состояние для значений из профиля
    const [isFreePlan, setIsFreePlan] = useState(false);
    const [remainingRequests, setRemainingRequests] = useState(0);
    const [requestsResetAt, setRequestsResetAt] = useState<string | null>(null);
    const [isEmailVerified, setIsEmailVerified] = useState(false);

    const { selectedEventType } = useEventStore();
    const { profile, updateProfile } = useUserProfileStore();
    const { aiResponse, setAiResponse } = useOutfitResponseStore();

    const hardcodedResponse = 'Lorem ipsum...'; // ваш текст

    // Обновляем локальное состояние только когда профиль меняется
    useEffect(() => {
        if (profile) {
            setIsFreePlan(profile.plan === 'free');
            setRemainingRequests(profile.requestLimits?.remainingRequests ?? 0);
            setRequestsResetAt(profile.requestLimits?.requestsResetAt ?? null);
            setIsEmailVerified(profile.emailVerified ?? false);
        }
    }, [profile]);

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
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        const timeUntilMidnight = tomorrow.getTime() - now.getTime();

        if (resetTimeoutRef.current) {
            clearTimeout(resetTimeoutRef.current);
        }

        resetTimeoutRef.current = setTimeout(() => {
            resetLimits();
            // Планируем следующий сброс сразу после текущего
            scheduleNextReset();
        }, timeUntilMidnight);
    }, [resetLimits]);

    // Устанавливаем таймер при монтировании и изменении профиля
    useEffect(() => {
        if (profile && profile.plan !== 'free') {
            // Проверяем, нужно ли обновить лимиты прямо сейчас
            if (profile.requestLimits?.requestsResetAt) {
                const resetTime = new Date(
                    profile.requestLimits.requestsResetAt
                );
                const now = new Date();
                if (now >= resetTime) {
                    resetLimits();
                }
            } else if (!profile.requestLimits) {
                // Если лимитов нет вообще, инициализируем их
                const now = new Date();
                const nextResetDate = new Date(now);
                nextResetDate.setDate(nextResetDate.getDate() + 1);
                nextResetDate.setHours(0, 0, 0, 0);

                const newLimits = {
                    remainingRequests: DAILY_REQUEST_LIMITS[profile.plan],
                    requestsResetAt: nextResetDate.toISOString()
                };
                updateProfile(
                    { ...profile, requestLimits: newLimits },
                    { silent: true }
                );
            }
            scheduleNextReset();
        }
        return () => {
            if (resetTimeoutRef.current) {
                clearTimeout(resetTimeoutRef.current);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profile?.uid]);

    // Автоматически очищаем ошибку через 5 секунд
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

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

        // Проверяем оставшиеся запросы
        if (!requestLimits || requestLimits.remainingRequests <= 0) {
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
        updateProfile(
            { ...profile, requestLimits: newLimits },
            { silent: true }
        );
    };

    const checkRequiredFields = () => {
        // Проверяем наличие погоды
        const hasWeather = isManualMode
            ? !!weatherManual
            : !!weatherToday || !!weatherTomorrow;

        if (!hasWeather) {
            setError(
                t('Components.Features.OutfitRequestPanel.errors.noWeather')
            );
            return false;
        }

        // Проверяем базовые характеристики
        const characteristics = profile?.characteristics;
        if (
            !characteristics?.gender ||
            !characteristics?.height ||
            !characteristics?.weight ||
            !characteristics?.age
        ) {
            setError(
                t(
                    'Components.Features.OutfitRequestPanel.errors.missingBasicInfo'
                )
            );
            return false;
        }

        // Проверяем тип события
        const supportedEventTypes: EventType[] = [
            'casualFriends',
            'workOffice',
            'dateNight',
            'shopping'
        ];

        if (!selectedEventType) {
            setError(
                t('Components.Features.OutfitRequestPanel.errors.noEventType')
            );
            return false;
        }

        if (!supportedEventTypes.includes(selectedEventType as EventType)) {
            setError(
                t(
                    'Components.Features.OutfitRequestPanel.errors.invalidEventType'
                )
            );
            return false;
        }

        return true;
    };

    const generateAiOutfit = async () => {
        setError(null);
        setIsLoading(true);

        try {
            // Проверяем обязательные поля
            if (!checkRequiredFields()) {
                setIsLoading(false);
                return;
            }

            // Проверяем лимит запросов
            if (!checkRequestLimit()) {
                setIsLoading(false);
                return;
            }

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
        setStandardResponse(null);
        setIsLoading(true);

        try {
            if (!checkRequiredFields()) {
                setIsLoading(false);
                return;
            }

            if (!profile?.emailVerified) {
                setError(
                    t(
                        'Components.Features.OutfitRequestPanel.errors.emailNotVerified'
                    )
                );
                setIsLoading(false);
                return;
            }

            const { generateOutfitResponse } = await import(
                '@/data/outfits/generators/generateOutfitResponse'
            );

            if (!selectedEventType || !profile?.characteristics) {
                setError(
                    t(
                        'Components.Features.OutfitRequestPanel.errors.missingData'
                    )
                );
                setIsLoading(false);
                return;
            }

            // Проверяем, что тип события соответствует допустимым значениям
            const validEventTypes: EventType[] = [
                'casualFriends',
                'workOffice',
                'dateNight',
                'shopping'
            ];
            if (!validEventTypes.includes(selectedEventType as EventType)) {
                setError(
                    t(
                        'Components.Features.OutfitRequestPanel.errors.invalidEventType'
                    )
                );
                setIsLoading(false);
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
                setIsLoading(false);
                return;
            }

            const requestData = {
                lang: profile.lang as Language,
                event: {
                    type: selectedEventType as BaseOutfit['event'],
                    name: t(`Pages.Event.types.${selectedEventType}`)
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
                setIsLoading(false);
                return;
            }

            if (!response.outfit) {
                setError(
                    t(
                        'Components.Features.OutfitRequestPanel.errors.noOutfitFound'
                    )
                );
                setStandardResponse(null);
                setIsLoading(false);
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
                type: selectedEventType as EventType,
                name: t(`Pages.Event.types.${selectedEventType}`)
            },
            location:
                isManualMode || !profile?.location
                    ? null
                    : {
                          city: profile.location.city,
                          country: profile.location.country
                      },
            characteristics: {
                gender: profile.characteristics.gender as Gender,
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

    const clearResponses = useCallback(() => {
        setAiResponse(null);
        setStandardResponse(null);
    }, [setAiResponse]);

    return {
        isLoading,
        showText: !!(aiResponse || standardResponse),
        error,
        generateAiOutfit,
        generateStandardOutfit,
        aiResponse,
        standardResponse,
        clearResponses,
        isFreePlan,
        remainingRequests,
        requestsResetAt,
        isEmailVerified
    };
};
