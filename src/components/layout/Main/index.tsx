import { FC } from 'react';

import { AppRouter } from '@root/router/AppRouter';

export const Main: FC = () => {
    return (
        <main className="py-4 px-8">
            <AppRouter />
        </main>
    );
};
