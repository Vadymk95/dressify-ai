import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { PrivateRoute, PublicRoute, WithSuspense } from '@/hocs';
import {
    ContactUs,
    Event,
    FailedPayment,
    Home,
    Login,
    NotFound,
    PersonalDetails,
    Pricing,
    PrivacyPolicy,
    Register,
    SuccessPayment,
    TermsOfUse,
    Wardrobe,
    Weather,
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
                path={routes.weather}
                element={
                    <PrivateRoute>{WithSuspense(<Weather />)}</PrivateRoute>
                }
            />

            <Route
                path={routes.personalDetails}
                element={
                    <PrivateRoute>
                        {WithSuspense(<PersonalDetails />)}
                    </PrivateRoute>
                }
            />

            <Route
                path={routes.wardrobe}
                element={
                    <PrivateRoute>{WithSuspense(<Wardrobe />)}</PrivateRoute>
                }
            />

            <Route
                path={routes.event}
                element={<PrivateRoute>{WithSuspense(<Event />)}</PrivateRoute>}
            />

            <Route
                path={routes.successPayment}
                element={WithSuspense(<SuccessPayment />)}
            />

            <Route
                path={routes.failedPayment}
                element={WithSuspense(<FailedPayment />)}
            />

            {/* always available routes*/}
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

            <Route path={routes.pricing} element={WithSuspense(<Pricing />)} />

            {/* not found */}
            <Route
                path={routes.notFound}
                element={WithSuspense(<NotFound />)}
            />
        </Routes>
    );
};
