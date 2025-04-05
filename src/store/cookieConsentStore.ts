import { create } from 'zustand';

export type CookieConsent = {
    hasConsent: boolean;
    essential: boolean;
    functional: boolean;
    analytics: boolean;
    marketing: boolean;
    doNotSell: boolean;
};

type CookieConsentStore = {
    consent: CookieConsent;
    updateConsent: (newConsent: Partial<CookieConsent>) => void;
};

const COOKIE_CONSENT_KEY = 'dressify-cookie-consent';

const getStoredConsent = (): CookieConsent | null => {
    if (typeof window === 'undefined') return null;

    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!stored) return null;

    try {
        return JSON.parse(stored);
    } catch {
        return null;
    }
};

const initialState: CookieConsent = {
    hasConsent: false,
    essential: true,
    functional: false,
    analytics: false,
    marketing: false,
    doNotSell: false
};

export const useCookieConsentStore = create<CookieConsentStore>((set) => ({
    consent: getStoredConsent() || initialState,
    updateConsent: (newConsent) => {
        set((state) => {
            const newState = {
                ...state.consent,
                ...newConsent
            } as CookieConsent;
            localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(newState));
            return { consent: newState };
        });
    }
}));
