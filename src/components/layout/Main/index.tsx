import { FC } from 'react';

import { AppRouter } from '@/router/AppRouter';

export const Main: FC = () => {
    return (
        <main className="flex-grow">
            <AppRouter />
        </main>
    );
};
