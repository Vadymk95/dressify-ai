import { StripeError, StripeService } from '@/services/stripe';
import { useUserProfileStore } from '@/store/userProfileStore';
import { Plan } from '@/types/plans';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const usePricing = () => {
    const { t } = useTranslation();
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { profile, updatePlan, loading } = useUserProfileStore();

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

        if (plan === 'free') {
            await updatePlan(plan);
            return;
        }

        if (!profile?.email) {
            setError(t('Pages.Pricing.errors.noEmail'));
            return;
        }

        try {
            setIsProcessing(true);
            await StripeService.redirectToCheckout(plan, profile.email);
        } catch (error) {
            console.error('Payment error:', error);
            if (error instanceof StripeError) {
                setError(t(`Pages.Pricing.errors.${error.message}`));
            } else {
                setError(t('Pages.Pricing.errors.generic'));
            }
        } finally {
            setIsProcessing(false);
        }
    };

    return {
        isProcessing,
        loading,
        error,
        userPlan,
        free,
        standard,
        pro,
        handlePlanSelection
    };
};
