import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { WithSuspense } from '@/hocs/WithSuspense';
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
