import { ArrowRight } from 'lucide-react';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Loader } from '@/components/common/Loader';
import { Checkbox } from '@/components/ui/checkbox';
import { auth } from '@/firebase/firebaseConfig';
import { routes } from '@/router/routes';
import { useUserProfileStore } from '@/store/userProfileStore';
import { Wardrobe } from '@/types/user';

export const WardrobePanel: FC = () => {
    const { t } = useTranslation();
    const { profile, loading, error, updateWardrobe, subscribeToUserProfile } =
        useUserProfileStore();
    const [localError, setLocalError] = useState<string | null>(null);

    useEffect(() => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            // Подписываемся на изменения профиля
            const unsubscribe = subscribeToUserProfile(currentUser.uid);
            // Отписываемся при размонтировании компонента
            return () => unsubscribe();
        }
    }, [subscribeToUserProfile]);

    // Автоматически очищаем ошибку через 5 секунд
    useEffect(() => {
        if (localError) {
            const timer = setTimeout(() => setLocalError(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [localError]);

    // Функция для безопасного получения перевода ошибки
    const getErrorMessage = (errorKey: string) => {
        const translation = t(`errors.${errorKey}`);
        // Если перевод не найден, возвращаем общее сообщение об ошибке
        return translation === `errors.${errorKey}`
            ? t('errors.unknownError')
            : translation;
    };

    const handleToggleUseWardrobe = async () => {
        if (!profile?.wardrobe) return;

        const updatedWardrobe: Wardrobe = {
            ...profile.wardrobe,
            useWardrobeForOutfits: !profile.wardrobe.useWardrobeForOutfits
        };

        try {
            await updateWardrobe(updatedWardrobe);
        } catch (error: any) {
            console.error('Error toggling wardrobe usage:', error);
            setLocalError(error.message || 'unknownError');
        }
    };

    const totalItems =
        profile?.wardrobe?.categories.reduce(
            (sum, category) => sum + category.items.length,
            0
        ) || 0;

    return (
        <div className="w-full">
            {loading && <Loader />}
            <h2 className="text-2xl font-bold text-amber-50 text-center mb-4">
                {t('Components.Features.WardrobePanel.title')}
            </h2>
            <Link
                to={routes.wardrobe}
                className="flex items-center justify-center text-amber-200 hover:text-amber-100 font-medium transition-colors mb-4"
            >
                {t('Components.Features.WardrobePanel.openWardrobe')}
                <ArrowRight className="ml-2 h-4 w-4" />
            </Link>

            {(error || localError) && (
                <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md text-center">
                    {getErrorMessage(localError || error || '')}
                </div>
            )}

            <div className="space-y-4">
                <p className="text-amber-50 text-center">
                    {t('Components.Features.WardrobePanel.itemCount', {
                        count: totalItems
                    })}
                </p>

                <div className="flex items-center justify-center space-x-2">
                    <Checkbox
                        id="useWardrobe"
                        checked={
                            profile?.wardrobe?.useWardrobeForOutfits || false
                        }
                        onCheckedChange={handleToggleUseWardrobe}
                        className="h-5 w-5 border-2 border-amber-300 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600 data-[state=unchecked]:bg-transparent focus:ring-amber-500 focus:ring-offset-0"
                    />
                    <label
                        htmlFor="useWardrobe"
                        className="text-sm text-amber-50 cursor-pointer"
                    >
                        {t(
                            'Components.Features.WardrobePanel.useWardrobeForOutfits'
                        )}
                    </label>
                </div>
            </div>
        </div>
    );
};
