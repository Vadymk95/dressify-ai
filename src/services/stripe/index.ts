import { routes } from '@/router/routes';
import { Plan } from '@/types/plans';
import { loadStripe } from '@stripe/stripe-js';

export class StripeError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'StripeError';
    }
}

export class StripeService {
    private static readonly STRIPE_PUBLIC_KEY = 'pk_test_your_test_key';
    private static readonly PLAN_IDS = {
        monthly: 'price_test_monthly',
        pro: 'price_test_pro'
    };

    private static readonly SUCCESS_URL = `${window.location.origin}${routes.successPayment}`;
    private static readonly CANCEL_URL = `${window.location.origin}${routes.failedPayment}`;

    static async redirectToCheckout(plan: Plan, email: string) {
        if (plan === 'free') return;

        try {
            const stripe = await loadStripe(this.STRIPE_PUBLIC_KEY);
            if (!stripe) throw new StripeError('stripeLoadFailed');

            const planId = this.PLAN_IDS[plan];
            if (!planId) throw new StripeError('invalidPlan');

            const result = await stripe.redirectToCheckout({
                lineItems: [{ price: planId, quantity: 1 }],
                mode: 'subscription',
                customerEmail: email,
                successUrl: `${this.SUCCESS_URL}?plan=${plan}`,
                cancelUrl: this.CANCEL_URL
            });

            if (result.error) {
                throw new StripeError(result.error.message || 'checkoutFailed');
            }
        } catch (error) {
            if (error instanceof StripeError) {
                throw error;
            }
            throw new StripeError('generic');
        }
    }
}
