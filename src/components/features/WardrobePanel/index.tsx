import { Lock, Shirt } from 'lucide-react';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Loader } from '@/components/common/Loader';
import { WardrobeCheckbox } from '@/components/features/WardrobeCheckbox';
import { auth } from '@/firebase/firebaseConfig';
import { routes } from '@/router/routes';
import { useUserProfileStore } from '@/store/userProfileStore';

interface WardrobePanelProps {
    isMinimalistic?: boolean;
}

export const WardrobePanel: FC<WardrobePanelProps> = ({
    isMinimalistic = false
}) => {
    const { t } = useTranslation();
    const { profile, loading, error, subscribeToUserProfile } =
        useUserProfileStore();
    const [localError, setLocalError] = useState<string | null>(null);

    const isFreePlan = profile?.plan === 'free';
    const totalItems =
        profile?.wardrobe?.categories.reduce(
            (sum, category) => sum + category.items.length,
            0
        ) || 0;

    useEffect(() => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const unsubscribe = subscribeToUserProfile(currentUser.uid);
            return () => unsubscribe();
        }
    }, [subscribeToUserProfile]);

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
        <section className="w-full h-full relative">
            {loading && <Loader />}
            {isFreePlan && (
                <div
                    className={`absolute inset-0 flex flex-col items-center justify-center z-10 bg-amber-950/30 backdrop-blur-[2px] rounded-xl ${isMinimalistic ? 'p-2' : ''}`}
                >
                    <Lock
                        className={`text-amber-50/90 ${isMinimalistic ? 'w-6 h-6' : 'w-8 h-8 mb-2'}`}
                    />
                    {!isMinimalistic && (
                        <div className="bg-amber-950/60 text-xs text-amber-50/90 rounded-lg text-center px-4 py-2 max-w-[80%] shadow-lg">
                            {t(
                                'Components.Features.WardrobePanel.wardrobeNotAvailable'
                            )}
                        </div>
                    )}
                </div>
            )}
            <Link
                to={routes.wardrobe}
                className="group h-full p-6 flex flex-col items-center justify-center gap-4 fourth-gradient shadow-md rounded-xl cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out transform-gpu"
            >
                <div className="flex flex-col items-center gap-2">
                    <Shirt
                        className={`text-amber-50 group-hover:text-amber-100 transition-colors duration-300 ${
                            isMinimalistic ? 'w-8 h-8' : 'w-12 h-12'
                        }`}
                    />
                    {!isMinimalistic && (
                        <span className="text-amber-50 text-base font-medium group-hover:text-amber-100 transition-colors duration-300">
                            {t('Components.Features.WardrobePanel.title')}
                        </span>
                    )}
                </div>
                {!isMinimalistic && (
                    <>
                        <span className="text-amber-50/60 text-sm">
                            {t(
                                'Components.Features.WardrobePanel.openWardrobe'
                            )}
                        </span>

                        {(error || localError) && (
                            <div className="mb-2 p-2 bg-red-100 text-red-800 rounded-md text-center text-xs">
                                {getErrorMessage(localError || error || '')}
                            </div>
                        )}

                        <div className="flex flex-col items-center gap-2 w-full">
                            <p
                                className={`text-center text-sm ${
                                    isFreePlan
                                        ? 'text-amber-50/50'
                                        : 'text-amber-50/80'
                                }`}
                            >
                                {t(
                                    'Components.Features.WardrobePanel.itemCount',
                                    {
                                        count: totalItems
                                    }
                                )}
                            </p>

                            <div
                                className="flex items-center justify-center gap-2 w-full"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }}
                            >
                                <WardrobeCheckbox preventPropagation />
                            </div>
                        </div>
                    </>
                )}
            </Link>
        </section>
    );
};
