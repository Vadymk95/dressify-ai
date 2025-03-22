import { FC, useEffect } from 'react';

import { Footer, Header, Main } from '@/components/layout';
import { useAuthStore } from '@/store/authStore';
import { useUserProfileStore } from '@/store/userProfileStore';

export const App: FC = () => {
    const { checkAuth, user } = useAuthStore();
    const { fetchUserProfile, clearProfile } = useUserProfileStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    useEffect(() => {
        if (user) {
            fetchUserProfile(user.uid);
        } else {
            clearProfile();
        }
    }, [user, fetchUserProfile, clearProfile]);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <Main />
            <Footer />
        </div>
    );
};
