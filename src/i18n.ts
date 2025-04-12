import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { resources } from './locales';

const loadLocaleData = async (language: string) => {
    const module = await import(`./locales/${language}.ts`);
    return module[language];
};

const initializeTranslations = async (lang: string) => {
    try {
        const resources = await loadLocaleData(lang);
        i18n.addResourceBundle(
            lang,
            'translation',
            resources[lang].translation,
            true,
            true
        );
    } catch (error) {
        console.error(`Failed to load translations for ${lang}`, error);
        if (lang !== 'en') {
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
