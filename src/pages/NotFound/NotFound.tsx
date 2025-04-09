import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { routes } from '@/router/routes';
import { useAuthStore } from '@/store/authStore';

const NotFound: FC = () => {
    const { t } = useTranslation();
    const { user } = useAuthStore();

    return (
        <div className="w-full py-4 px-4 md:px-8 flex flex-col gap-4 justify-center items-center">
            <h1 className="text-center text-7xl">
                {t('Pages.NotFound.title')}
            </h1>

            <p className="text-center text-2xl">
                {t('Pages.NotFound.description')}
            </p>

            <div>
                <Link
                    to={user ? routes.whatToWear : routes.home}
                    className="inline-block main-gradient font-semibold px-6 py-3 hover:scale-105 text-xl rounded-lg shadow-lg transition hover:bg-gray-100 cursor-pointer"
                >
                    {t('General.goBack')}
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
