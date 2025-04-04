import { Plan } from '@/types/plans';
import { loadStripe } from '@stripe/stripe-js';

interface CreateCheckoutSessionParams {
    planId: string;
    customerId?: string;
    successUrl: string;
    cancelUrl: string;
}

export class StripeService {
    private static readonly STRIPE_PUBLIC_KEY =
        process.env.NEXT_PUBLIC_STRIPE_KEY;

    private static readonly PLAN_IDS = {
        monthly: 'price_monthly_id_from_stripe',
        semiAnnual: 'price_semiannual_id_from_stripe'
    };

    static async createCheckoutSession({
        planId,
        customerId,
        successUrl,
        cancelUrl
    }: CreateCheckoutSessionParams) {
        try {
            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    planId,
                    customerId,
                    successUrl,
                    cancelUrl
                })
            });

            const { sessionId } = await response.json();
            return sessionId;
        } catch (error) {
            console.error('Error creating checkout session:', error);
            throw error;
        }
    }

    static async redirectToCheckout(sessionId: string) {
        const stripe = await loadStripe(this.STRIPE_PUBLIC_KEY!);
        if (!stripe) throw new Error('Stripe failed to load');

        const result = await stripe.redirectToCheckout({
            sessionId
        });

        if (result.error) {
            throw new Error(result.error.message);
        }
    }

    static getPlanStripeId(plan: Plan) {
        if (plan === 'free') return null;

        return this.PLAN_IDS[plan];
    }
}
