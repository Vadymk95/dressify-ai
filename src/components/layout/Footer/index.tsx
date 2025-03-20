import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const Footer: FC = () => {
    const { t } = useTranslation();

    return (
        <footer className="bg-gray-100 py-8 px-4 md:px-8 mt-12 text-gray-600">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between">
                <div className="text-xl font-semibold text-red-500 mb-4 md:mb-0">
                    {t('General.brandName')}
                </div>

                <nav className="flex gap-4 mb-4 md:mb-0">
                    <Link
                        to="/privacy"
                        className="hover:text-red-400 transition"
                    >
                        {t('Components.Footer.privacy')}
                    </Link>
                    <Link to="/terms" className="hover:text-red-400 transition">
                        {t('Components.Footer.terms')}
                    </Link>
                    <Link
                        to="/contact"
                        className="hover:text-red-400 transition"
                    >
                        {t('Components.Footer.contact')}
                    </Link>
                </nav>
            </div>

            <div className="text-center mt-6 text-sm text-gray-500">
                © {new Date().getFullYear()} {t('Components.Footer.copyright')}
            </div>
        </footer>
    );
};
