import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { FC, useState } from 'react';

const languages = [
    { code: 'en', label: 'Eng' },
    { code: 'ru', label: 'Рус' }
];

export const LanguageSelect: FC = () => {
    const [language, setLanguage] = useState('en');

    const handleChange = (value: string) => {
        setLanguage(value);
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
