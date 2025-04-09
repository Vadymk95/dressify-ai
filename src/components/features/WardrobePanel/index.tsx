import { Shirt } from 'lucide-react';
import { FC, useCallback, useEffect, useState } from 'react';
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

    const isFreePlan = profile?.plan === 'free';
    const totalItems =
        profile?.wardrobe?.categories.reduce(
            (sum, category) => sum + category.items.length,
            0
        ) || 0;

    const handleToggleUseWardrobe = useCallback(async () => {
        if (!profile?.wardrobe || totalItems === 0) return;

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
    }, [profile?.wardrobe, updateWardrobe, totalItems]);

    useEffect(() => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const unsubscribe = subscribeToUserProfile(currentUser.uid);
            return () => unsubscribe();
        }
    }, [subscribeToUserProfile]);

    // Автоматически отключаем использование гардероба при переходе на бесплатный план или если гардероб пуст
    useEffect(() => {
        if (
            (isFreePlan || totalItems === 0) &&
            profile?.wardrobe?.useWardrobeForOutfits
        ) {
            handleToggleUseWardrobe();
        }
    }, [
        isFreePlan,
        totalItems,
        profile?.wardrobe?.useWardrobeForOutfits,
        handleToggleUseWardrobe
    ]);

    useEffect(() => {
        if (localError) {
            const timer = setTimeout(() => setLocalError(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [localError]);

    const getErrorMessage = (errorKey: string) => {
        const translation = t(`errors.${errorKey}`);
        return translation === `errors.${errorKey}`
            ? t('errors.unknownError')
            : translation;
    };

    return (
        <div
            className={`w-full max-w-[200px] mx-auto relative ${isFreePlan ? 'pointer-events-none' : ''}`}
        >
            {loading && <Loader />}
            {isFreePlan && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="bg-gray-100 text-sm text-amber-500 italic rounded-md text-center p-4 shadow-lg">
                        {t(
                            'Components.Features.WardrobePanel.wardrobeNotAvailable'
                        )}
                    </div>
                </div>
            )}
            <Link
                to={routes.wardrobe}
                className="group p-4 flex flex-col items-center fourth-gradient shadow-md rounded-xl cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out transform-gpu"
            >
                <div className="flex items-center gap-2 mb-2">
                    <Shirt className="w-6 h-6 text-amber-50 group-hover:text-amber-100 transition-colors duration-300" />
                    <h2 className="text-amber-50 font-medium group-hover:text-amber-100 transition-colors duration-300">
                        {t('Components.Features.WardrobePanel.title')}
                    </h2>
                </div>

                {(error || localError) && (
                    <div className="mb-2 p-2 bg-red-100 text-red-800 rounded-md text-center text-xs">
                        {getErrorMessage(localError || error || '')}
                    </div>
                )}

                <div className="space-y-2">
                    <p
                        className={`text-center text-sm ${
                            isFreePlan ? 'text-amber-50/50' : 'text-amber-50/80'
                        }`}
                    >
                        {t('Components.Features.WardrobePanel.itemCount', {
                            count: totalItems
                        })}
                    </p>

                    <div className="flex items-center justify-center space-x-2">
                        <Checkbox
                            id="useWardrobe"
                            checked={
                                totalItems > 0 &&
                                (profile?.wardrobe?.useWardrobeForOutfits ||
                                    false)
                            }
                            onCheckedChange={handleToggleUseWardrobe}
                            disabled={isFreePlan || totalItems === 0}
                            className={`h-4 w-4 border-2 ${
                                isFreePlan || totalItems === 0
                                    ? 'border-amber-300/50 data-[state=checked]:bg-amber-600/50 data-[state=checked]:border-amber-600/50'
                                    : 'border-amber-300 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600'
                            } data-[state=unchecked]:bg-transparent focus:ring-amber-500 focus:ring-offset-0`}
                        />
                        <label
                            htmlFor="useWardrobe"
                            className={`text-xs cursor-pointer ${
                                isFreePlan || totalItems === 0
                                    ? 'text-amber-50/50'
                                    : 'text-amber-50/80'
                            }`}
                        >
                            {t(
                                'Components.Features.WardrobePanel.useWardrobeForOutfits'
                            )}
                        </label>
                    </div>
                </div>
            </Link>
        </div>
    );
};
