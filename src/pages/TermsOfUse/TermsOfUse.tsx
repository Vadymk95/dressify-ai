import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const TermsOfUse: FC = () => {
    const { t } = useTranslation();

    return (
        <section className="max-w-4xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold mb-6">
                {t('Pages.TermsOfUse.title')}
            </h1>

            <p className="mb-4">{t('Pages.TermsOfUse.intro')}</p>

            <h2 className="text-xl font-semibold mb-2">
                {t('Pages.TermsOfUse.usage.title')}
            </h2>
            <p className="mb-4">{t('Pages.TermsOfUse.usage.description')}</p>

            <h2 className="text-xl font-semibold mb-2">
                {t('Pages.TermsOfUse.responsibility.title')}
            </h2>
            <p className="mb-4">
                {t('Pages.TermsOfUse.responsibility.description')}
            </p>
        </section>
    );
};

export default TermsOfUse;
