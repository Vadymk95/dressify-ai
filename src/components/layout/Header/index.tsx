import { Tags } from 'lucide-react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { AuthNavigation } from '@/components/common/AuthNavigation';
import { Logo } from '@/components/common/Logo';
import { LanguageSelect } from '@/components/features/LanguageSelect';
import { routes } from '@/router/routes';
import { useAuthStore } from '@/store/authStore';

export const Header: FC = () => {
    const { t } = useTranslation();
    const { user } = useAuthStore();

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
                            <Tags
                                className="text-2xl text-orange-400 hover:text-orange-600"
                                size={24}
                            />
                        </div>
                        <span className="hidden md:inline text-sm md:text-lg">
                            {t('Components.Layout.Header.pricing')}
                        </span>
                    </Link>

                    {!user && <LanguageSelect />}
                </div>
            </div>
        </header>
    );
};
