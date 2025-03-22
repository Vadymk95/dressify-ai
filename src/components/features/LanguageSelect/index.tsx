import { changeLanguage } from 'i18next';
import { FC } from 'react';

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

    const handleChange = async (value: string) => {
        setLanguage(value);
        changeLanguage(value);

        if (profile) {
            await updateLanguage(value);
        }
    };

    return (
        <Select value={language} onValueChange={handleChange}>
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
