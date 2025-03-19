import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Home } from '@root/pages/Home';
import { routes } from '@root/router/routes';

export const AppRouter: FC = () => {
    return (
        <Routes>
            <Route path={routes.home} element={<Home />} />
        </Routes>
    );
};
