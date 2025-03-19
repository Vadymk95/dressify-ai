import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { WithSuspense } from '@root/hocs/WithSuspense';
import {
    Home,
    Login,
    NotFound,
    Register,
    Wardrobe,
    WhatToWear
} from '@root/pages';
import { routes } from '@root/router/routes';

export const AppRouter: FC = () => {
    return (
        <Routes>
            <Route path={routes.home} element={<Home />} />

            <Route
                path={routes.notFound}
                element={WithSuspense(<NotFound />)}
            />

            <Route
                path={routes.whatToWear}
                element={WithSuspense(<WhatToWear />)}
            />

            <Route
                path={routes.wardrobe}
                element={WithSuspense(<Wardrobe />)}
            />

            <Route path={routes.login} element={WithSuspense(<Login />)} />

            <Route
                path={routes.register}
                element={WithSuspense(<Register />)}
            />
        </Routes>
    );
};
