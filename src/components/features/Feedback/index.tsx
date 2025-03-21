import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useFeedbackStore } from '@/store/feedbackStore';

type FeedbackFormData = {
    email: string;
    message: string;
};

export const Feedback: FC = () => {
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FeedbackFormData>();
    const { loading, error, feedbackSent, sendFeedback, resetFeedbackStatus } =
        useFeedbackStore();

    const onSubmit: SubmitHandler<FeedbackFormData> = async (data) => {
        await sendFeedback(data);

        if (!error) {
            reset();
            setTimeout(() => resetFeedbackStatus(), 3000);
        }
    };

    return (
        <section className="max-w-xl w-full mx-auto p-6 bg-white shadow-md rounded-xl">
            <h2 className="text-2xl font-semibold text-center mb-4">
                {t('Components.Features.Feedback.title')}
            </h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
            >
                <div>
                    <Input
                        placeholder={t(
                            'Components.Features.Feedback.emailPlaceholder'
                        )}
                        {...register('email', {
                            required: t(
                                'Components.Features.Feedback.errors.emailRequired'
                            ),
                            pattern: {
                                value: /^\S+@\S+\.\S+$/,
                                message: t(
                                    'Components.Features.Feedback.errors.invalidEmail'
                                )
                            }
                        })}
                        className="bg-gray-100 py-5"
                    />
                    {errors.email && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div>
                    <Textarea
                        placeholder={t(
                            'Components.Features.Feedback.placeholder'
                        )}
                        {...register('message', {
                            required: t(
                                'Components.Features.Feedback.errors.messageRequired'
                            )
                        })}
                        name="message"
                        required
                        className="min-h-32 resize-none bg-gray-100 py-5"
                    />
                    {errors.message && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.message.message}
                        </p>
                    )}
                </div>

                {feedbackSent && (
                    <p className="text-green-500 text-center">
                        {t('Components.Features.Feedback.successMessage')}
                    </p>
                )}

                <Button
                    type="submit"
                    className="bg-red-500 text-white hover:bg-red-600 transition cursor-pointer py-5"
                    disabled={loading}
                >
                    {loading
                        ? t('Components.Features.Feedback.sending')
                        : t('Components.Features.Feedback.send')}
                </Button>
            </form>
        </section>
    );
};
