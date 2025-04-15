import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { routes } from '@/router/routes';

type GoToHomeButtonProps = {
    variant?: 'first' | 'secondary' | 'third' | 'fourth';
};

export const GoToHomeButton: FC<GoToHomeButtonProps> = ({
    variant = 'first'
}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <Button
            onClick={() => navigate(routes.whatToWear)}
            className={`btn-${variant}-gradient text-amber-50 cursor-pointer shadow-sm py-6 px-12 text-base max-w-3/4 hyphens-auto transition-all duration-200 hover:scale-105 ${variant === 'fourth' ? 'text-gray-700' : ''}`}
        >
            {t('General.goToHome')}
        </Button>
    );
};
