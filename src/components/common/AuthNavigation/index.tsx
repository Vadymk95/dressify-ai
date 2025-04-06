import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { routes } from '@/router/routes';
import { useAuthStore } from '@/store/authStore';
import { useUserProfileStore } from '@/store/userProfileStore';

import {
    faDoorOpen,
    faHouse,
    faRightToBracket,
    faUserPlus
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const AuthNavigation: FC = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const { user, initialized, logout } = useAuthStore();
    const { clearProfile } = useUserProfileStore();

    if (!initialized)
        return (
            <nav>
                <ul className="flex gap-6 md:gap-4">
                    <li className="hidden md:block w-20 h-6 bg-gray-200 animate-pulse rounded"></li>
                    <li className="hidden md:block w-24 h-6 bg-gray-200 animate-pulse rounded"></li>
                    <li className="md:hidden w-8 h-8 bg-gray-200 animate-pulse rounded"></li>
                </ul>
            </nav>
        );

    const handleLogout = () => {
        logout();
        clearProfile();
    };
    const isLogin = location.pathname === routes.login;
    const isRegister = location.pathname === routes.register;

    return (
        <nav>
            <ul className="flex gap-6 md:gap-4 text-sm md:text-lg">
                {user ? (
                    <>
                        <li>
                            <Link
                                className="hover:underline hover:text-orange-400"
                                to={routes.whatToWear}
                            >
                                <div className="md:hidden flex items-center">
                                    <FontAwesomeIcon
                                        className="text-2xl text-orange-400 hover:text-orange-600"
                                        icon={faHouse}
                                    />
                                </div>
                                <span className="hidden md:inline">
                                    {t('Components.Common.AuthNavigation.home')}
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                onClick={handleLogout}
                                className="hover:underline hover:text-orange-400"
                                to={routes.home}
                            >
                                <div className="md:hidden flex items-center">
                                    <FontAwesomeIcon
                                        className="text-2xl text-orange-400 hover:text-orange-600"
                                        icon={faDoorOpen}
                                    />
                                </div>
                                <span className="hidden md:inline">
                                    {t(
                                        'Components.Common.AuthNavigation.logout'
                                    )}
                                </span>
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                        {!isLogin && (
                            <li>
                                <Link
                                    className="hover:underline hover:text-orange-400"
                                    to={routes.login}
                                >
                                    <div className="md:hidden flex items-center">
                                        <FontAwesomeIcon
                                            className="text-2xl text-orange-400 hover:text-orange-600"
                                            icon={faRightToBracket}
                                        />
                                    </div>
                                    <span className="hidden md:inline">
                                        {t(
                                            'Components.Common.AuthNavigation.login'
                                        )}
                                    </span>
                                </Link>
                            </li>
                        )}
                        {!isRegister && (
                            <li>
                                <Link
                                    className="hover:underline hover:text-orange-400"
                                    to={routes.register}
                                >
                                    <div className="md:hidden flex items-center">
                                        <FontAwesomeIcon
                                            className="text-2xl text-orange-400 hover:text-orange-600"
                                            icon={faUserPlus}
                                        />
                                    </div>
                                    <span className="hidden md:inline">
                                        {t(
                                            'Components.Common.AuthNavigation.register'
                                        )}
                                    </span>
                                </Link>
                            </li>
                        )}
                    </>
                )}
            </ul>
        </nav>
    );
};
