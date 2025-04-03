import { Button } from '@/components/ui/button';
import { useEventStore } from '@/store/eventStore';
import { useUserProfileStore } from '@/store/userProfileStore';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TypeAnimation } from 'react-type-animation';

export const OutfitRequestPanel: FC = () => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [showText, setShowText] = useState(false);

    const { selectedEventType } = useEventStore();
    const { profile } = useUserProfileStore();

    const hardcodedResponse =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

    const mockRequest = async () => {
        // Собираем данные для запроса
        const requestData = {
            event: {
                type: selectedEventType,
                name: t(
                    `Components.Features.EventPanel.types.${selectedEventType}`
                )
            },
            location: {
                city: profile?.location?.city,
                country: profile?.location?.country
            },
            characteristics: {
                gender: profile?.characteristics?.gender,
                stylePreference: profile?.characteristics?.stylePreference,
                age: profile?.characteristics?.age,
                height: profile?.characteristics?.height,
                weight: profile?.characteristics?.weight
            },
            wardrobe: {
                categories: profile?.wardrobe?.categories.map((category) => ({
                    name: category.name,
                    itemsCount: category.items.length
                }))
            }
        };

        // Логируем данные запроса
        console.log('Request data:', requestData);

        // Имитация API запроса
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // В реальном приложении здесь будет ответ от API
        return 'test';
    };

    const handleGenerateOutfit = async () => {
        setIsLoading(true);
        setShowText(false);

        try {
            const response = await mockRequest();
            console.log('Response received:', response);
            setShowText(true);
        } catch (error) {
            console.error('Error generating outfit:', error);
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

            <div className="flex justify-center mb-6">
                <Button
                    onClick={handleGenerateOutfit}
                    disabled={isLoading}
                    className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-2 rounded-lg cursor-pointer"
                >
                    {isLoading
                        ? t('Components.Features.OutfitRequestPanel.generating')
                        : t('Components.Features.OutfitRequestPanel.generate')}
                </Button>
            </div>

            {isLoading && (
                <div className="flex justify-center mb-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
                </div>
            )}

            {showText && (
                <div className="bg-amber-900/30 p-6 rounded-lg text-amber-50 break-words max-w-full overflow-hidden">
                    <div className="prose prose-invert max-w-none whitespace-pre-wrap">
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
