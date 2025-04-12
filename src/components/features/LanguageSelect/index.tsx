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
            // Сначала загружаем новый язык
            const module = await import(`@/locales/${value}.ts`);
            // Добавляем ресурсы перед сменой языка
            i18n.addResourceBundle(
                value,
                'translation',
                module[value][value].translation,
                true,
                true
            );

            // Теперь меняем язык
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

    useEffect(() => {
        if (profile && profile.lang && profile.lang !== language) {
            handleChange(profile.lang);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profile, language]);

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
