import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { languages } from '@/constants/languages';
import { useLanguageStore } from '@/store/languageStore';
import { useUserProfileStore } from '@/store/userProfileStore';

export const LanguageSelect: FC = () => {
    const { updateLanguage, profile } = useUserProfileStore();
    const { language, setLanguage } = useLanguageStore();
    const [isChanging, setIsChanging] = useState(false);
    const { i18n } = useTranslation();

    const handleChange = async (value: string) => {
        if (isChanging) return;

        setIsChanging(true);
        try {
            const module = await import(`@/locales/${value}.ts`);
            i18n.addResourceBundle(
                value,
                'translation',
                module[value][value].translation,
                true,
                true
            );

            await i18n.changeLanguage(value);
            setLanguage(value);

            if (profile) {
                await updateLanguage(value);
            }
        } catch (error) {
            console.error('Failed to change language:', error);
        } finally {
            setIsChanging(false);
        }
    };

    // Инициализация языка при первой загрузке
    useEffect(() => {
        const initializeLanguage = async () => {
            if (isChanging) return;

            // Приоритет языка:
            // 1. Язык из профиля (если пользователь авторизован)
            // 2. Язык из localStorage (если был сохранен ранее)
            // 3. Системный язык
            if (profile?.lang && profile.lang !== language) {
                await handleChange(profile.lang);
            } else if (!profile && language !== i18n.language) {
                // Если пользователь не авторизован, используем язык из store
                // (который уже должен быть определен из системного языка)
                await handleChange(language);
            }
        };

        initializeLanguage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profile]);

    return (
        <Select
            value={language}
            onValueChange={handleChange}
            disabled={isChanging}
        >
            <SelectTrigger className="cursor-pointer text-xs md:text-sm p-1 md:p-2">
                <SelectValue>
                    {languages.find((lang) => lang.code === language)?.label}
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                {languages.map((lang) => (
                    <SelectItem
                        className="cursor-pointer"
                        key={lang.code}
                        value={lang.code}
                    >
                        {lang.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
