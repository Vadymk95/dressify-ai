import { DAILY_REQUEST_LIMITS } from '@/constants/plans';
import { useUserProfileStore } from '@/store/userProfileStore';
import { Plan } from '@/types/plans';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const usePricing = () => {
    const { t } = useTranslation();
    const [error, setError] = useState<string | null>(null);
    const { profile, updatePlan, updateProfile, loading } =
        useUserProfileStore();

    const userPlan = profile ? profile.plan : 'free';
    const free = userPlan === 'free';
    const standard = userPlan === 'standard';
    const pro = userPlan === 'pro';

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;

        if (error) {
            timeoutId = setTimeout(() => {
                setError(null);
            }, 5000);
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [error]);

    const handlePlanSelection = async (plan: Plan) => {
        setError(null);

        if (!profile?.email) {
            setError(t('Pages.Pricing.errors.noEmail'));
            return;
        }

        try {
            // Обновляем план
            await updatePlan(plan);

            // Обновляем лимиты запросов в зависимости от плана
            const now = new Date();
            const nextResetDate = new Date(now);
            nextResetDate.setDate(nextResetDate.getDate() + 1);
            nextResetDate.setHours(0, 0, 0, 0);

            const requestLimits = {
                remainingRequests: DAILY_REQUEST_LIMITS[plan],
                requestsResetAt: nextResetDate.toISOString()
            };

            // Обновляем профиль с новыми лимитами
            await updateProfile({
                ...profile,
                plan,
                requestLimits
            });
        } catch (error) {
            console.error('Error updating plan:', error);
            setError(t('Pages.Pricing.errors.generic'));
        }
    };

    return {
        loading,
        error,
        userPlan,
        free,
        standard,
        pro,
        handlePlanSelection
    };
};
