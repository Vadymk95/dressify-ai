import { languages } from '@/constants/languages';
import { useLanguageStore } from '@/store/languageStore';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const supportedLanguages = languages.map((lang) => lang.code);

const getLanguageCode = (fullCode: string): string => {
    const mainCode = (fullCode || 'en').split('-')[0].toLowerCase();
    return supportedLanguages.includes(mainCode) ? mainCode : 'en';
};

const loadLanguage = async (langCode: string) => {
    try {
        const module = await import(`./locales/${langCode}.ts`);
        return module[langCode][langCode];
    } catch (error) {
        console.error(`Failed to load language: ${langCode}`, error);
        return null;
    }
};

// Инициализируем i18next перед использованием
i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {},
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        },
        react: {
            useSuspense: false
        }
    });

// Загружаем начальный язык
const initializeLanguage = async () => {
    const { language } = useLanguageStore.getState();
    const initialLang = getLanguageCode(language);

    try {
        const resources = await loadLanguage(initialLang);
        if (resources) {
            i18n.addResourceBundle(
                initialLang,
                'translation',
                resources.translation,
                true,
                true
            );
            await i18n.changeLanguage(initialLang);
        } else {
            // Если не удалось загрузить язык, пробуем английский
            const enResources = await loadLanguage('en');
            if (enResources) {
                i18n.addResourceBundle(
                    'en',
                    'translation',
                    enResources.translation,
                    true,
                    true
                );
                await i18n.changeLanguage('en');
            }
        }
    } catch (error) {
        console.error('Failed to initialize language', error);
    }
};

// Обработчик смены языка
i18n.on('languageChanged', async (lng) => {
    if (!lng) return;
    const langCode = getLanguageCode(lng);

    const resources = await loadLanguage(langCode);
    if (resources) {
        i18n.addResourceBundle(
            langCode,
            'translation',
            resources.translation,
            true,
            true
        );
    }
});

// Запускаем инициализацию языка после того, как i18next готов
initializeLanguage().catch(console.error);

export default i18n;
