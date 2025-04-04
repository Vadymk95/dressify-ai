import { StripeService } from '@/services/stripe';
import { useUserProfileStore } from '@/store/userProfileStore';
import { Plan } from '@/types/plans';
import { useState } from 'react';

export const usePricing = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const { profile, updatePlan, loading } = useUserProfileStore();

    const userPlan = profile ? profile.plan : 'free';
    const free = userPlan === 'free';
    const monthly = userPlan === 'monthly';
    const semiAnnual = userPlan === 'semiAnnual';

    const handlePlanSelection = async (plan: Plan) => {
        if (plan === 'free') {
            await updatePlan(plan);
            return;
        }

        try {
            setIsProcessing(true);
            await StripeService.redirectToCheckout(plan, profile?.email || '');
        } catch (error) {
            console.error('Payment error:', error);
            // Здесь можно добавить обработку ошибок, например показ тоста
        } finally {
            setIsProcessing(false);
        }
    };

    return {
        isProcessing,
        loading,
        userPlan,
        free,
        monthly,
        semiAnnual,
        handlePlanSelection
    };
};
