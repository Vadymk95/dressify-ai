import { FC, useEffect } from 'react';

import { Footer, Header, Main } from '@/components/layout';
import { useAuthStore } from '@/store/authStore';

export const App: FC = () => {
    const { checkAuth } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <Main />
            <Footer />
        </div>
    );
};
