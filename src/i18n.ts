import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { languages } from '@/constants/languages';
import { resources } from '@/locales/index';

const supportedLanguages = languages.map((lang) => lang.code);

const getLanguageCode = (fullCode: string): string => {
    const mainCode = (fullCode || 'en').split('-')[0].toLowerCase();
    return supportedLanguages.includes(mainCode) ? mainCode : 'en';
};

const loadLocaleData = async (language: string) => {
    const langCode = getLanguageCode(language);
    const module = await import(`./locales/${langCode}.ts`);
    return module[langCode];
};

const initializeTranslations = async (lang: string) => {
    const langCode = getLanguageCode(lang);

    try {
        const resources = await loadLocaleData(langCode);
        i18n.addResourceBundle(
            lang,
            'translation',
            resources[lang].translation,
            true,
            true
        );
    } catch (error) {
        console.error(`Failed to load translations for ${langCode}`, error);
        if (langCode !== 'en') {
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

// Инициализация i18n
const initI18n = async () => {
    const defaultLang = 'en';

    await i18n
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
            resources,
            fallbackLng: defaultLang,
            interpolation: {
                escapeValue: false
            },
            react: {
                useSuspense: false
            }
        });

    // Загружаем начальные переводы
    await initializeTranslations(i18n.language || defaultLang);
};

// Обработчик изменения языка
i18n.on('languageChanged', async (lng) => {
    if (!lng) return;
    await initializeTranslations(lng);
});

// Запускаем инициализацию
initI18n().catch(console.error);

export default i18n;
