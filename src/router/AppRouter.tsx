import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { PrivateRoute } from '@/hocs/PrivateRoute';
import { PublicRoute } from '@/hocs/PublicRoute';
import { WithSuspense } from '@/hocs/WithSuspense';

import { ContactUs } from '@/pages/ContactUs';
import { FailedPayment } from '@/pages/FailedPayment';
import { Home } from '@/pages/Home';
import { Login } from '@/pages/Login';
import { NotFound } from '@/pages/NotFound';
import { PersonalDetails } from '@/pages/PersonalDetails';
import { Pricing } from '@/pages/Pricing';
import { PrivacyPolicy } from '@/pages/PrivacyPolicy';
import { Register } from '@/pages/Register';
import { SuccessPayment } from '@/pages/SuccessPayment';
import { TermsOfUse } from '@/pages/TermsOfUse';
import { Wardrobe } from '@/pages/Wardrobe';
import { Weather } from '@/pages/Weather';
import { WhatToWear } from '@/pages/WhatToWear';

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
