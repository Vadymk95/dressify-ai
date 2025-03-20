import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const PrivacyPolicy: FC = () => {
    const { t } = useTranslation();

    return (
        <section className="max-w-3xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold mb-6">
                {t('Pages.PrivacyPolicy.title')}
            </h1>

            <p className="mb-4">{t('Pages.PrivacyPolicy.intro')}</p>

            <h2 className="text-xl font-semibold mb-2">
                {t('Pages.PrivacyPolicy.data.title')}
            </h2>
            <p className="mb-4">{t('Pages.PrivacyPolicy.data.description')}</p>

            <h2 className="text-xl font-semibold mb-2">
                {t('Pages.PrivacyPolicy.security.title')}
            </h2>
            <p className="mb-4">
                {t('Pages.PrivacyPolicy.security.description')}
            </p>
        </section>
    );
};

export default PrivacyPolicy;
