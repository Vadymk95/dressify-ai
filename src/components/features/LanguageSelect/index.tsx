import { changeLanguage } from 'i18next';
import { FC, useEffect, useState } from 'react';

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

    const handleChange = async (value: string) => {
        if (isChanging) return;

        setIsChanging(true);
        try {
            await changeLanguage(value);
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
