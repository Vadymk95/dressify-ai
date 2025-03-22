import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { AuthNavigation, Logo } from '@/components/common';
import { LanguageSelect } from '@/components/features/LanguageSelect';
import { routes } from '@/router/routes';

import { faTags } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Header: FC = () => {
    const { t } = useTranslation();

    return (
        <header className="sticky top-0 z-50 shadow-md py-4 px-4 md:px-8 main-bg">
            <div className="max-w-5xl mx-auto flex justify-between items-center h-[36px]">
                <Logo />

                <div className="flex items-center gap-6 md:gap-4">
                    <AuthNavigation />
                    <Link
                        className="hover:underline hover:text-orange-400"
                        to={routes.pricing}
                    >
                        <div className="md:hidden flex items-center">
                            <FontAwesomeIcon
                                className="text-2xl text-orange-400 hover:text-orange-600"
                                icon={faTags}
                            />
                        </div>
                        <span className="hidden md:inline text-sm md:text-lg">
                            {t('Components.Layout.Header.pricing')}
                        </span>
                    </Link>
                    <LanguageSelect />
                </div>
            </div>
        </header>
    );
};
