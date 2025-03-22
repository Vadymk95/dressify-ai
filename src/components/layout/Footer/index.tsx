import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Logo } from '@/components/common/Logo';
import { routes } from '@/router/routes';

export const Footer: FC = () => {
    const { t } = useTranslation();

    return (
        <footer className="bg-gray-100 py-8 px-4 md:px-8 mt-12 text-gray-600">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between">
                <Logo variant="secondary" />

                <nav className="flex gap-4 mb-4 md:mb-0">
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
            </div>

            <div className="text-center mt-6 text-sm text-gray-500">
                © {new Date().getFullYear()}{' '}
                {t('Components.Layout.Footer.copyright')}
            </div>
        </footer>
    );
};
