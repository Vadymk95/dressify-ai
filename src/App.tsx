import { FC, useEffect } from 'react';

import { RootLayout } from '@/components/layout/RootLayout';
import { useAuthStore } from '@/store/authStore';
import { useUserProfileStore } from '@/store/userProfileStore';

export const App: FC = () => {
    const { checkAuth, user } = useAuthStore();
    const {
        fetchUserProfile,
        subscribeToUserProfile,
        clearProfile,
        checkSubscriptionExpiry
    } = useUserProfileStore();

    useEffect(() => {
        const initializeApp = async () => {
            await checkAuth();
            if (user) {
                await Promise.all([
                    fetchUserProfile(user.uid),
                    checkSubscriptionExpiry()
                ]);
                // Подписываемся на обновления профиля
                const unsubscribe = subscribeToUserProfile(user.uid);
                return () => unsubscribe();
            } else {
                clearProfile();
            }
        };
        initializeApp();
    }, [
        checkAuth,
        user,
        fetchUserProfile,
        subscribeToUserProfile,
        clearProfile,
        checkSubscriptionExpiry
    ]);

    return <RootLayout />;
};
