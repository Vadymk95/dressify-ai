import { FC, JSX } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { Loader } from '@/components/common/Loader';
import { routes } from '@/router/routes';
import { useAuthStore } from '@/store/authStore';
import { useUserProfileStore } from '@/store/userProfileStore';

interface PrivateRouteProps {
    children: JSX.Element;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
    const { user, initialized } = useAuthStore();
    const { profile } = useUserProfileStore();
    const location = useLocation();

    if (!initialized) return <Loader />;
    if (!user) return <Navigate to={routes.login} />;

    // Проверяем, пытается ли пользователь с бесплатным планом получить доступ к гардеробу
    if (profile?.plan === 'free' && location.pathname === routes.wardrobe) {
        return <Navigate to={routes.pricing} />;
    }

    return children;
};
