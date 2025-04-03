import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TypeAnimation } from 'react-type-animation';

import { Button } from '@/components/ui/button';
import { useEventStore } from '@/store/eventStore';
import { useUserProfileStore } from '@/store/userProfileStore';
import { OutfitRequestData } from '@/types/outfitRequestData';

export const OutfitRequestPanel: FC = () => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [showText, setShowText] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { selectedEventType } = useEventStore();
    const { profile } = useUserProfileStore();

    const hardcodedResponse =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

    const mockRequest = async () => {
        if (!selectedEventType) {
            throw new Error(
                t('Components.Features.OutfitRequestPanel.errors.noEventType')
            );
        }

        if (!profile?.location?.city || !profile?.location?.country) {
            throw new Error(
                t('Components.Features.OutfitRequestPanel.errors.noLocation')
            );
        }

        if (!profile?.characteristics?.gender) {
            throw new Error(
                t('Components.Features.OutfitRequestPanel.errors.noGender')
            );
        }

        // Базовые данные, которые всегда нужны
        const requestData: OutfitRequestData = {
            event: {
                type: selectedEventType,
                name: t(
                    `Components.Features.EventPanel.types.${selectedEventType}`
                )
            },
            location: {
                city: profile.location.city,
                country: profile.location.country
            },
            characteristics: {
                gender: profile.characteristics.gender,
                // Опциональные характеристики добавляем только если они есть
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
            }
        };

        // Добавляем данные гардероба только если он используется и в нем есть предметы
        const useWardrobe = profile?.wardrobe?.useWardrobeForOutfits;
        const hasWardrobeItems = profile?.wardrobe?.categories?.some(
            (category) => category.items.length > 0
        );

        if (useWardrobe && hasWardrobeItems && profile?.wardrobe?.categories) {
            requestData.wardrobe = {
                categories: profile.wardrobe.categories.map((category) => ({
                    name: category.name,
                    items: category.items
                }))
            };
        }

        console.log('Request data:', requestData);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        return hardcodedResponse;
    };

    const handleGenerateOutfit = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await mockRequest();
            console.log('Response received:', response);
            setShowText(true);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : t('Components.Features.OutfitRequestPanel.errors.generic')
            );
            setShowText(false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold text-center mb-2">
                {t('Components.Features.OutfitRequestPanel.title')}
            </h2>
            <p className="text-center mb-4">
                {t('Components.Features.OutfitRequestPanel.description')}
            </p>

            <div className="flex flex-col items-center gap-4 mb-6">
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-2 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <Button
                    onClick={handleGenerateOutfit}
                    disabled={isLoading}
                    className={`
                        px-8 py-3 rounded-xl text-white font-semibold
                        shadow-lg transform transition-all duration-200
                        bg-gradient-to-r from-orange-400 to-red-400
                        hover:from-red-400 hover:to-orange-400
                        hover:scale-105 active:scale-95
                        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                        cursor-pointer
                        ${isLoading ? 'animate-pulse' : ''}
                    `}
                >
                    {isLoading
                        ? t('Components.Features.OutfitRequestPanel.generating')
                        : showText
                          ? t(
                                'Components.Features.OutfitRequestPanel.generateMore'
                            )
                          : t(
                                'Components.Features.OutfitRequestPanel.generate'
                            )}
                </Button>
            </div>

            {isLoading && (
                <div className="flex justify-center mb-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-400"></div>
                </div>
            )}

            {showText && (
                <div className="bg-gradient-to-br from-amber-950/40 to-orange-900/40 backdrop-blur-sm p-8 rounded-2xl shadow-xl text-amber-50 break-words max-w-full overflow-hidden border border-amber-500/20">
                    <div className="prose prose-invert max-w-none whitespace-pre-wrap prose-p:text-amber-50/90">
                        <TypeAnimation
                            sequence={[hardcodedResponse]}
                            wrapper="div"
                            speed={75}
                            repeat={0}
                            cursor={false}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
