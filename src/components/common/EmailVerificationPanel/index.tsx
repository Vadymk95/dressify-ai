import { auth } from '@/firebase/firebaseConfig';
import { sendEmailVerification } from 'firebase/auth';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { useUserProfileStore } from '@/store/userProfileStore';

export const EmailVerificationPanel: FC = () => {
    const { t } = useTranslation();
    const { updateEmailVerified, profile } = useUserProfileStore();
    const isVerified = profile && profile?.emailVerified;
    const [isVisible, setIsVisible] = useState(false);
    const [resendCountdown, setResendCountdown] = useState(0);
    const [isResending, setIsResending] = useState(false);
    const [localError, setLocalError] = useState('');

    const handleCheckStatus = async () => {
        try {
            const verified = await updateEmailVerified();
            if (verified) {
                setLocalError('');
                setIsVisible(true);
            } else {
                setLocalError(
                    t('Components.Common.EmailVerification.notVerified')
                );
            }
        } catch (error: any) {
            console.error(error);
            setLocalError(
                t('Components.Common.EmailVerification.generalError')
            );
        }
    };

    const handleResendEmail = async () => {
        if (!auth.currentUser) return;
        setIsResending(true);
        try {
            await sendEmailVerification(auth.currentUser);
            setResendCountdown(60);
            setLocalError('');
        } catch (error: any) {
            console.error(error);
            setLocalError(
                t('Components.Common.EmailVerification.generalError')
            );
        } finally {
            setIsResending(false);
        }
    };

    // Обратный отсчёт для кнопки повторной отправки
    useEffect(() => {
        if (resendCountdown > 0) {
            const timer = setInterval(() => {
                setResendCountdown((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [resendCountdown]);

    // Если email подтверждён, скрываем панель через 2 секунды
    useEffect(() => {
        if (isVerified && isVisible) {
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isVerified, isVisible]);

    if (profile === null || (isVerified && !isVisible)) return null;

    return (
        <div className="w-full main-gradient p-4 rounded-md text-white flex flex-col items-center">
            {profile?.emailVerified ? (
                <div className="text-lg font-semibold flex items-center gap-2">
                    <span role="img" aria-label="verified">
                        ✅🔥
                    </span>
                    {t('Components.Common.EmailVerification.verified')}
                </div>
            ) : (
                <>
                    <p className="mb-2 text-center text-lg">
                        {t('Components.Common.EmailVerification.info')}
                    </p>
                    {localError && (
                        <p className="mb-2 text-red-700 text-sm">
                            {localError}
                        </p>
                    )}
                    <Button
                        onClick={handleCheckStatus}
                        className="mb-4 bg-white text-red-500 px-4 py-2 rounded-md hover:bg-gray-100 transition cursor-pointer"
                    >
                        {t('Components.Common.EmailVerification.checkStatus')}
                    </Button>
                    <div className="flex items-center">
                        <p className="text-sm">
                            {t(
                                'Components.Common.EmailVerification.notReceived'
                            )}
                        </p>
                        <Button
                            onClick={handleResendEmail}
                            variant="link"
                            disabled={resendCountdown > 0 || isResending}
                            className="cursor-pointer text-gray-300 p-0 ml-1"
                        >
                            {resendCountdown > 0
                                ? t(
                                      'Components.Common.EmailVerification.resendCountdown',
                                      { seconds: resendCountdown }
                                  )
                                : t(
                                      'Components.Common.EmailVerification.resend'
                                  )}
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};
