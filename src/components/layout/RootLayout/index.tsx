import { FC } from 'react';

import { CookieBanner } from '@/components/common/CookieBanner';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Main } from '@/components/layout/Main';
import { Toaster } from '@/components/ui/sonner';

export const RootLayout: FC = () => {
    return (
        <>
            <div className="min-h-screen flex flex-col">
                <Header />
                <Main />
                <Footer />
                <CookieBanner />
            </div>

            <Toaster position="top-right" toastOptions={{ duration: 5000 }} />
        </>
    );
};
