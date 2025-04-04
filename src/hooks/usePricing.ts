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
            const planId = StripeService.getPlanStripeId(plan);
            if (!planId) throw new Error('Invalid plan ID');

            const sessionId = await StripeService.createCheckoutSession({
                planId,
                customerId: profile?.uid,
                successUrl: `${window.location.origin}/payment/success?plan=${plan}`,
                cancelUrl: `${window.location.origin}/pricing`
            });

            await StripeService.redirectToCheckout(sessionId);
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
