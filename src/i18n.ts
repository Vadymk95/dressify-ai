import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const loadLocaleData = async (language: string) => {
    const module = await import(`./locales/${language}.ts`);
    return module[language];
};

const initializeTranslations = async () => {
    const currentLang = i18n.language || 'en';
    try {
        const resources = await loadLocaleData(currentLang);
        i18n.addResourceBundle(
            currentLang,
            'translation',
            resources[currentLang].translation,
            true,
            true
        );
    } catch (error) {
        console.error(`Failed to load translations for ${currentLang}`, error);
        if (currentLang !== 'en') {
            try {
                const enResources = await loadLocaleData('en');
                i18n.addResourceBundle(
                    'en',
                    'translation',
                    enResources.en.translation,
                    true,
                    true
                );
            } catch (enError) {
                console.error('Failed to load fallback translations', enError);
            }
        }
    }
};

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    })
    .then(() => {
        initializeTranslations();
    });

i18n.on('languageChanged', async (lng) => {
    if (!lng) return;
    try {
        const resources = await loadLocaleData(lng);
        i18n.addResourceBundle(
            lng,
            'translation',
            resources[lng].translation,
            true,
            true
        );
    } catch (error) {
        console.error(`Failed to load translations for ${lng}`, error);
    }
});

export default i18n;
