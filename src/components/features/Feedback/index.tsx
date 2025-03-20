import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export const Feedback: FC = () => {
    const { t } = useTranslation();
    const [message, setMessage] = useState('');

    return (
        <section className="max-w-xl w-full mx-auto p-6 bg-white shadow-md rounded-xl">
            <h2 className="text-2xl font-semibold text-center mb-4">
                {t('Components.Features.Feedback.title')}
            </h2>

            <form
                action="https://formspree.io/f/{your-form-id}"
                method="POST"
                className="flex flex-col gap-4"
            >
                <Textarea
                    placeholder={t('Components.Features.Feedback.placeholder')}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    name="message"
                    required
                    className="min-h-32 resize-none"
                />

                <Button
                    type="submit"
                    className="bg-red-500 text-white hover:bg-red-600 transition cursor-pointer"
                >
                    {t('Components.Features.Feedback.send')}
                </Button>
            </form>
        </section>
    );
};
