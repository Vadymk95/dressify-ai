import { Feedback } from '@/components/features/Feedback';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const ContactUs: FC = () => {
    const { t } = useTranslation();

    return (
        <section className="max-w-3xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold mb-4">
                {t('Pages.ContactUs.title')}
            </h1>
            <p className="mb-8">{t('Pages.ContactUs.description')}</p>

            <Feedback />
        </section>
    );
};

export default ContactUs;
