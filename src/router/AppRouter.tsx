import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { WithSuspense } from '@/hocs/WithSuspense';
import { Home, Login, NotFound, Register, Wardrobe, WhatToWear } from '@/pages';
import { routes } from '@/router/routes';

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
