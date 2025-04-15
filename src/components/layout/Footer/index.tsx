import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { DeleteAccountButton } from '@/components/common/DeleteAccountButton';
import { Logo } from '@/components/common/Logo';
import { LanguageSelect } from '@/components/features/LanguageSelect';
import { routes } from '@/router/routes';
import { useAuthStore } from '@/store/authStore';
import { PrivateRoutePaths } from '@/types/ruotes';

export const Footer: FC = () => {
    const { t } = useTranslation();
    const { user } = useAuthStore();
    const location = useLocation();
    const { wardrobe, personalDetails, weather } = routes;
    const withoutMarginPages = [wardrobe, personalDetails, weather].includes(
        location.pathname as PrivateRoutePaths
    );

    return (
        <footer
            className={`bg-gray-100 py-8 px-4 md:px-8 ${withoutMarginPages ? '' : 'mt-12'} text-gray-600`}
        >
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0 text-2xl">
                    <Logo variant="secondary" />
                </div>

                <div className="flex flex-col gap-4 justify-center items-center">
                    <nav className="flex flex-col gap-2 items-center md:items-start">
                        <Link
                            to={routes.privacyPolicy}
                            className="hover:text-red-400 transition"
                        >
                            {t('Components.Layout.Footer.privacy')}
                        </Link>
                        <Link
                            to={routes.termsOfUse}
                            className="hover:text-red-400 transition"
                        >
                            {t('Components.Layout.Footer.terms')}
                        </Link>
                        <Link
                            to={routes.contactUs}
                            className="hover:text-red-400 transition"
                        >
                            {t('Components.Layout.Footer.contact')}
                        </Link>
                    </nav>

                    <div className="flex items-center md:justify-start justify-center gap-2 w-full">
                        <p>{t('Components.Layout.Footer.lang')}</p>
                        {user && <LanguageSelect />}
                    </div>

                    {user && <DeleteAccountButton />}
                </div>
            </div>

            <div className="text-center mt-6 text-sm text-gray-500">
                © {new Date().getFullYear()}{' '}
                {t('Components.Layout.Footer.copyright')}
            </div>
        </footer>
    );
};
