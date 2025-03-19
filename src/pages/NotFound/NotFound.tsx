import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';

const NotFound: FC = () => {
    const { t } = useTranslation();
    const handleBack = () => {};

    return (
        <div className="py-4 px-4 md:px-8 flex flex-col gap-4 justify-center items-center">
            <h1 className="text-center text-7xl">
                {t('Pages.NotFound.title')}
            </h1>

            <p className="text-center text-2xl">
                {t('Pages.NotFound.description')}
            </p>

            <div>
                <Button
                    onClick={handleBack}
                    className="cursor-pointer text-xl"
                    size="lg"
                >
                    {t('General.goBack')}
                </Button>
            </div>
        </div>
    );
};

export default NotFound;
