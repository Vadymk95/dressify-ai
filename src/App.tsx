import { FC, useEffect } from 'react';

import { RootLayout } from '@/components/layout/RootLayout';
import { useAuthStore } from '@/store/authStore';
import { useUserProfileStore } from '@/store/userProfileStore';

export const App: FC = () => {
    const { checkAuth, user } = useAuthStore();
    const { fetchUserProfile, clearProfile, checkSubscriptionExpiry } =
        useUserProfileStore();

    useEffect(() => {
        const initializeApp = async () => {
            await checkAuth();
            if (user) {
                await Promise.all([
                    fetchUserProfile(user.uid),
                    checkSubscriptionExpiry()
                ]);
            } else {
                clearProfile();
            }
        };
        initializeApp();
    }, [
        checkAuth,
        user,
        fetchUserProfile,
        clearProfile,
        checkSubscriptionExpiry
    ]);

    return <RootLayout />;
};
