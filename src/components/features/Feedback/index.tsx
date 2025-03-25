import { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Loader } from '@/components/common/Loader';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useFeedbackStore } from '@/store/feedbackStore';

type FeedbackFormData = {
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

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => resetFeedbackStatus(), 3000);
            return () => clearTimeout(timer);
        }
    }, [error, resetFeedbackStatus]);

    return (
        <>
            {loading && <Loader />}
            <section className="max-w-4xl w-full mx-auto p-6 bg-white shadow-md rounded-xl">
                <h2 className="text-2xl font-semibold text-center mb-4">
                    {t('Components.Features.Feedback.title')}
                </h2>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                >
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
                        className="min-h-32 resize-none bg-gray-100 py-5 w-full"
                    />
                    {errors.message && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.message.message}
                        </p>
                    )}

                    {error && (
                        <p className="text-sm text-red-500 mt-1">{error}</p>
                    )}

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
        </>
    );
};
