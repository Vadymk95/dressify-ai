import { routes } from '@/router/routes';
import { Plan } from '@/types/plans';
import { loadStripe } from '@stripe/stripe-js';

export class StripeService {
    private static readonly STRIPE_PUBLIC_KEY = 'SOME_KEY';
    private static readonly PLAN_IDS = {
        monthly: 'price_monthly_id_from_stripe',
        semiAnnual: 'price_semiannual_id_from_stripe'
    };

    private static readonly SUCCESS_URL = `${window.location.origin}${routes.successPayment}`;
    private static readonly CANCEL_URL = `${window.location.origin}${routes.failedPayment}`;

    static async redirectToCheckout(plan: Plan, email: string) {
        if (plan === 'free') return;

        const stripe = await loadStripe(this.STRIPE_PUBLIC_KEY!);
        if (!stripe) throw new Error('Stripe failed to load');

        const planId = this.PLAN_IDS[plan];

        const result = await stripe.redirectToCheckout({
            lineItems: [{ price: planId, quantity: 1 }],
            mode: 'subscription',
            customerEmail: email,
            successUrl: `${this.SUCCESS_URL}?plan=${plan}`,
            cancelUrl: this.CANCEL_URL
        });

        if (result.error) {
            throw new Error(result.error.message);
        }
    }
}
