import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const NotFound: FC = () => {
    const { t } = useTranslation();

    return (
        <div className="px-8 py-4 flex flex-col gap-4 justify-center items-center">
            <h1 className="text-center text-7xl">
                {t('Pages.NotFound.title')}
            </h1>

            <p className="text-center text-2xl">
                {t('Pages.NotFound.description')}
            </p>

            <div>
                <button>{t('General.goBack')}</button>
            </div>
        </div>
    );
};

export default NotFound;
