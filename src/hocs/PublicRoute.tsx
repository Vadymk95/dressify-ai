import { FC, JSX } from 'react';
import { Navigate } from 'react-router-dom';

import { routes } from '@/router/routes';
import { useAuthStore } from '@/store/authStore';

interface PublicRouteProps {
    children: JSX.Element;
}

export const PublicRoute: FC<PublicRouteProps> = ({ children }) => {
    const { user } = useAuthStore();

    if (user) return <Navigate to={routes.whatToWear} />;

    return children;
};
