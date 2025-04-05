import { useCookieConsentStore } from '@/store/cookieConsentStore';

export const useCookieConsent = () => {
    const { consent } = useCookieConsentStore();

    return {
        // Базовые функции всегда разрешены
        canUseEssential: true,

        // Аналитика (Google Analytics и т.д.)
        canUseAnalytics: consent?.analytics ?? false,

        // Сохранение пользовательских настроек
        canSavePreferences: consent?.functional ?? false,

        // Маркетинговые куки
        canUseMarketing: consent?.marketing ?? false,

        // Запрет на продажу данных (CCPA)
        hasDoNotSell: consent?.doNotSell ?? false
    };
};
