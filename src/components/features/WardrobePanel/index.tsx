import { ArrowRight } from 'lucide-react';
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
            className={`w-full relative ${isFreePlan ? 'pointer-events-none' : ''}`}
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
            <h2 className="text-2xl font-bold text-amber-50 text-center mb-4">
                {t('Components.Features.WardrobePanel.title')}
            </h2>

            <Link
                to={routes.wardrobe}
                className={`flex items-center justify-center px-4 py-2 rounded-lg text-amber-200 font-medium transition-all transform border shadow-lg mb-4 group ${
                    isFreePlan
                        ? 'bg-amber-600/20 border-amber-200/10 cursor-not-allowed'
                        : 'bg-amber-600/50 hover:bg-amber-600/30 hover:text-amber-100 hover:scale-105 border-amber-200/20 hover:border-amber-200/40 hover:shadow-amber-900/20'
                }`}
            >
                <span className="relative">
                    {t('Components.Features.WardrobePanel.openWardrobe')}
                    {!isFreePlan && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-200/40 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                    )}
                </span>
                <ArrowRight
                    className={`ml-2 h-4 w-4 transform ${
                        isFreePlan
                            ? ''
                            : 'group-hover:translate-x-1 transition-transform'
                    }`}
                />
            </Link>

            {(error || localError) && (
                <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md text-center">
                    {getErrorMessage(localError || error || '')}
                </div>
            )}

            <div className="space-y-4">
                <p
                    className={`text-center ${
                        isFreePlan ? 'text-amber-50/50' : 'text-amber-50'
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
                            (profile?.wardrobe?.useWardrobeForOutfits || false)
                        }
                        onCheckedChange={handleToggleUseWardrobe}
                        disabled={isFreePlan || totalItems === 0}
                        className={`h-5 w-5 border-2 ${
                            isFreePlan || totalItems === 0
                                ? 'border-amber-300/50 data-[state=checked]:bg-amber-600/50 data-[state=checked]:border-amber-600/50'
                                : 'border-amber-300 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600'
                        } data-[state=unchecked]:bg-transparent focus:ring-amber-500 focus:ring-offset-0`}
                    />
                    <label
                        htmlFor="useWardrobe"
                        className={`text-sm cursor-pointer ${
                            isFreePlan || totalItems === 0
                                ? 'text-amber-50/50'
                                : 'text-amber-50'
                        }`}
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
