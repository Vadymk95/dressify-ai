import { FC } from 'react';
import { Link } from 'react-router-dom';

import { routes } from '@/router/routes';
import { useTranslation } from 'react-i18next';

import {
    faRightToBracket,
    faUserPlus
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const AuthNavigation: FC = () => {
    const { t } = useTranslation();

    return (
        <nav>
            <ul className="flex gap-6 md:gap-4 text-sm md:text-lg">
                <li>
                    <Link className="hover:underline" to={routes.login}>
                        <div className="md:hidden flex items-center">
                            <FontAwesomeIcon
                                className="text-2xl"
                                icon={faRightToBracket}
                            />
                        </div>
                        <span className="hidden md:inline">
                            {t('Components.Common.AuthNavigation.login')}
                        </span>
                    </Link>
                </li>
                <li>
                    <Link className="hover:underline" to={routes.register}>
                        <div className="md:hidden flex items-center">
                            <FontAwesomeIcon
                                className="text-2xl"
                                icon={faUserPlus}
                            />
                        </div>
                        <span className="hidden md:inline">
                            {t('Components.Common.AuthNavigation.register')}
                        </span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};
