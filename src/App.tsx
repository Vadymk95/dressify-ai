import { Footer, Header, Main } from '@/components/layout';
import { FC } from 'react';

export const App: FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <Main />
            <Footer />
        </div>
    );
};
