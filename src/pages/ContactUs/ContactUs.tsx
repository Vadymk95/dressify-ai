import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Feedback } from '@/components/features/Feedback';
import { useAuthStore } from '@/store/authStore';

import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const email = 'vadymk95@gmail.com';

const ContactUs: FC = () => {
    const { t } = useTranslation();
    const { user } = useAuthStore();

    return (
        <section className="max-w-3xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold mb-4">
                {t('Pages.ContactUs.title')}
            </h1>
            <p className="mb-8">
                {t(
                    user
                        ? 'Pages.ContactUs.descriptionAuth'
                        : 'Pages.ContactUs.descriptionNonAuth'
                )}
            </p>

            {user ? (
                <Feedback />
            ) : (
                <div className="w-full flex justify-center">
                    <Link
                        className="underline flex items-center"
                        to={`mailto:${email}`}
                    >
                        <FontAwesomeIcon
                            className="mr-3"
                            size="xl"
                            icon={faEnvelope}
                        />
                        <span>{email}</span>
                    </Link>
                </div>
            )}
        </section>
    );
};

export default ContactUs;
