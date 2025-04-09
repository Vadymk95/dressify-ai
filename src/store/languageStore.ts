import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const getSystemLanguage = () => {
    const systemLang = navigator.language.toLowerCase();
    const supportedLanguages = ['en', 'ru', 'uk', 'fr', 'es', 'de', 'pt', 'it'];

    const mainLang = systemLang.split('-')[0];
    if (supportedLanguages.includes(mainLang)) {
        return mainLang;
    }

    return 'en';
};

interface LanguageState {
    language: string;
    setLanguage: (lang: string) => void;
}

export const useLanguageStore = create<LanguageState>()(
    persist(
        (set) => ({
            language: getSystemLanguage(),
            setLanguage: (lang: string) => set({ language: lang })
        }),
        {
            name: 'dressify-lang'
        }
    )
);
