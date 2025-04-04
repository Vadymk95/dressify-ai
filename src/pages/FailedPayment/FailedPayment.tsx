import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { routes } from '@/router/routes';

import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FailedPayment: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center flex-1 min-h-[calc(100vh-4rem)] p-6">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-amber-100">
                <div className="text-red-500 mb-6">
                    <FontAwesomeIcon
                        icon={faCircleXmark}
                        size="4x"
                        className="animate-pulse"
                    />
                </div>

                <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    {t('Pages.FailedPayment.title')}
                </h1>

                <p className="text-lg text-gray-600 mb-8">
                    {t('Pages.FailedPayment.description')}
                </p>

                <Button
                    onClick={() => navigate(routes.whatToWear)}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-orange-500 hover:to-amber-500 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                    {t('Pages.FailedPayment.goToHome')}
                </Button>
            </div>
        </div>
    );
};

export default FailedPayment;
