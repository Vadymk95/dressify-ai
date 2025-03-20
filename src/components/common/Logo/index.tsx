import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { routes } from '@/router/routes';

export const Logo: FC = () => {
    const { t } = useTranslation();

    return (
        <div className="flex items-center gap-2">
            <Link to={routes.home}>
                <span className="text-md md:text-xl font-bold">
                    {t('General.brandName')}
                </span>
            </Link>
        </div>
    );
};
