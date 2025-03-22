import { FC, JSX } from 'react';
import { Navigate } from 'react-router-dom';

import { routes } from '@/router/routes';
import { useAuthStore } from '@/store/authStore';
import { Loader } from '@/components/common/Loader';

interface PrivateRouteProps {
    children: JSX.Element;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
    const { user, initialized } = useAuthStore();

    if (!initialized) return <Loader />;
    if (!user) return <Navigate to={routes.login} />;

    return children;
};
