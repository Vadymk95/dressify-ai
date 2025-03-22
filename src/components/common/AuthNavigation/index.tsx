import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { routes } from '@/router/routes';
import { useAuthStore } from '@/store/authStore';
import { useUserProfileStore } from '@/store/userProfileStore';

import {
    faDoorOpen,
    faRightToBracket,
    faUserPlus
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const AuthNavigation: FC = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const { user, logout } = useAuthStore();
    const { clearProfile } = useUserProfileStore();
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
                                {t('Components.Common.AuthNavigation.logout')}
                            </span>
                        </Link>
                    </li>
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
