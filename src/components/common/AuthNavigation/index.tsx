import { FC } from 'react';
import { Link } from 'react-router-dom';

import { routes } from '@/router/routes';
import { useTranslation } from 'react-i18next';

export const AuthNavigation: FC = () => {
    const { t } = useTranslation();

    return (
        <nav>
            <ul className="flex gap-4">
                <li>
                    <Link to={routes.login}>
                        {t('Components.Common.AuthNavigation.login')}
                    </Link>
                </li>
                <li>
                    <Link to={routes.register}>
                        {t('Components.Common.AuthNavigation.register')}
                    </Link>
                </li>
            </ul>
        </nav>
    );
};
