import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { PrivateRoute, PublicRoute, WithSuspense } from '@/hocs';
import {
    ContactUs,
    Home,
    Login,
    NotFound,
    PrivacyPolicy,
    Register,
    TermsOfUse,
    Wardrobe,
    WhatToWear
} from '@/pages';
import { routes } from '@/router/routes';

export const AppRouter: FC = () => {
    return (
        <Routes>
            {/* public routes */}
            <Route
                path={routes.home}
                element={
                    <PublicRoute>
                        <Home />
                    </PublicRoute>
                }
            />

            <Route
                path={routes.login}
                element={<PublicRoute>{WithSuspense(<Login />)}</PublicRoute>}
            />

            <Route
                path={routes.register}
                element={
                    <PublicRoute>{WithSuspense(<Register />)}</PublicRoute>
                }
            />

            {/* private routes */}
            <Route
                path={routes.whatToWear}
                element={
                    <PrivateRoute>{WithSuspense(<WhatToWear />)}</PrivateRoute>
                }
            />

            <Route
                path={routes.wardrobe}
                element={
                    <PrivateRoute>{WithSuspense(<Wardrobe />)}</PrivateRoute>
                }
            />

            {/* always available routes*/}
            <Route
                path={routes.notFound}
                element={WithSuspense(<NotFound />)}
            />

            <Route
                path={routes.privacyPolicy}
                element={WithSuspense(<PrivacyPolicy />)}
            />

            <Route
                path={routes.termsOfUse}
                element={WithSuspense(<TermsOfUse />)}
            />

            <Route
                path={routes.contactUs}
                element={WithSuspense(<ContactUs />)}
            />
        </Routes>
    );
};
