import { FC } from 'react';

import { AppRouter } from '@/router/AppRouter';

export const Main: FC = () => {
    return (
        <main className="py-4 px-4 md:px-8">
            <AppRouter />
        </main>
    );
};
