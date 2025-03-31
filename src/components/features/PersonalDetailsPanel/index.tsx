import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';

// Опции для селектов
const BODY_TYPES = {
    female: ['hourglass', 'pear', 'apple', 'rectangle', 'inverted_triangle'],
    male: ['trapezoid', 'triangle', 'oval', 'athletic', 'slim']
};

const SKIN_TONES = ['fair', 'light', 'medium', 'olive', 'brown', 'dark'];

const HAIR_COLORS = [
    'black',
    'brown',
    'blonde',
    'red',
    'gray',
    'white',
    'other'
];

const EYE_COLORS = ['brown', 'blue', 'green', 'hazel', 'gray', 'other'];

export const PersonalDetailsPanel: FC = () => {
    const { t } = useTranslation();
    const gender = 'female'; // TODO: добавить состояние для пола

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold text-amber-50 text-center mb-4">
                {t('Components.Features.PersonalDetailsPanel.title')}
            </h2>

            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4 bg-gray-100 p-4 rounded-lg">
                <div className="text-lg font-medium">
                    {t('Components.Features.PersonalDetailsPanel.gender')}
                </div>
                <RadioGroup
                    defaultValue="female"
                    className="flex flex-col md:flex-row gap-4"
                >
                    <div className="flex items-center space-x-3">
                        <RadioGroupItem
                            variant="green"
                            value="male"
                            id="male"
                        />
                        <Label
                            htmlFor="male"
                            className="text-base cursor-pointer hover:text-amber-200 transition-colors"
                        >
                            {t(
                                'Components.Features.PersonalDetailsPanel.genderOptions.male'
                            )}
                        </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                        <RadioGroupItem
                            variant="green"
                            value="female"
                            id="female"
                        />
                        <Label
                            htmlFor="female"
                            className="text-base cursor-pointer hover:text-amber-200 transition-colors"
                        >
                            {t(
                                'Components.Features.PersonalDetailsPanel.genderOptions.female'
                            )}
                        </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                        <RadioGroupItem
                            variant="green"
                            value="other"
                            id="other"
                        />
                        <Label
                            htmlFor="other"
                            className="text-base cursor-pointer hover:text-amber-200 transition-colors"
                        >
                            {t(
                                'Components.Features.PersonalDetailsPanel.genderOptions.other'
                            )}
                        </Label>
                    </div>
                </RadioGroup>
            </div>

            <p className="text-sm text-gray-400 italic mb-4">
                * {t('Components.Features.PersonalDetailsPanel.optionalNote')}
            </p>

            <Accordion
                type="single"
                collapsible
                className="w-full bg-gray-100 px-6 rounded-lg"
            >
                <AccordionItem value="item-1">
                    <AccordionTrigger className="cursor-pointer">
                        {t(
                            'Components.Features.PersonalDetailsPanel.additionalInfo'
                        )}
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-col gap-4 py-4">
                            {/* Первый ряд: рост, вес, возраст */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-1">
                                    <Label
                                        htmlFor="height"
                                        className="text-sm font-medium flex items-center gap-1"
                                    >
                                        {t(
                                            'Components.Features.PersonalDetailsPanel.characteristics.height'
                                        )}
                                        <span className="text-xs text-gray-500">
                                            (
                                            {t(
                                                'Components.Features.PersonalDetailsPanel.characteristics.units.cm'
                                            )}
                                            )
                                        </span>
                                    </Label>
                                    <Input
                                        id="height"
                                        type="number"
                                        min="100"
                                        max="250"
                                        className="w-full h-9"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <Label
                                        htmlFor="weight"
                                        className="text-sm font-medium flex items-center gap-1"
                                    >
                                        {t(
                                            'Components.Features.PersonalDetailsPanel.characteristics.weight'
                                        )}
                                        <span className="text-xs text-gray-500">
                                            (
                                            {t(
                                                'Components.Features.PersonalDetailsPanel.characteristics.units.kg'
                                            )}
                                            )
                                        </span>
                                    </Label>
                                    <Input
                                        id="weight"
                                        type="number"
                                        min="30"
                                        max="250"
                                        className="w-full h-9"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <Label
                                        htmlFor="age"
                                        className="text-sm font-medium flex items-center gap-1"
                                    >
                                        {t(
                                            'Components.Features.PersonalDetailsPanel.characteristics.age'
                                        )}
                                        <span className="text-xs text-gray-500">
                                            (
                                            {t(
                                                'Components.Features.PersonalDetailsPanel.characteristics.units.years'
                                            )}
                                            )
                                        </span>
                                    </Label>
                                    <Input
                                        id="age"
                                        type="number"
                                        min="13"
                                        max="120"
                                        className="w-full h-9"
                                    />
                                </div>
                            </div>

                            {/* Второй ряд: цвет кожи, волос, глаз */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-1">
                                    <Label
                                        htmlFor="skinTone"
                                        className="text-sm font-medium"
                                    >
                                        {t(
                                            'Components.Features.PersonalDetailsPanel.characteristics.skinTone'
                                        )}
                                    </Label>
                                    <Select>
                                        <SelectTrigger
                                            id="skinTone"
                                            className="cursor-pointer h-9"
                                        >
                                            <SelectValue
                                                placeholder={t(
                                                    'Components.Features.PersonalDetailsPanel.characteristics.skinTone'
                                                )}
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {SKIN_TONES.map((tone) => (
                                                <SelectItem
                                                    key={tone}
                                                    value={tone}
                                                >
                                                    {t(
                                                        `Components.Features.PersonalDetailsPanel.characteristics.skinTones.${tone}`
                                                    )}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-1">
                                    <Label
                                        htmlFor="hairColor"
                                        className="text-sm font-medium"
                                    >
                                        {t(
                                            'Components.Features.PersonalDetailsPanel.characteristics.hairColor'
                                        )}
                                    </Label>
                                    <Select>
                                        <SelectTrigger
                                            id="hairColor"
                                            className="cursor-pointer h-9"
                                        >
                                            <SelectValue
                                                placeholder={t(
                                                    'Components.Features.PersonalDetailsPanel.characteristics.hairColor'
                                                )}
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {HAIR_COLORS.map((color) => (
                                                <SelectItem
                                                    key={color}
                                                    value={color}
                                                >
                                                    {t(
                                                        `Components.Features.PersonalDetailsPanel.characteristics.hairColors.${color}`
                                                    )}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-1">
                                    <Label
                                        htmlFor="eyeColor"
                                        className="text-sm font-medium"
                                    >
                                        {t(
                                            'Components.Features.PersonalDetailsPanel.characteristics.eyeColor'
                                        )}
                                    </Label>
                                    <Select>
                                        <SelectTrigger
                                            id="eyeColor"
                                            className="cursor-pointer h-9"
                                        >
                                            <SelectValue
                                                placeholder={t(
                                                    'Components.Features.PersonalDetailsPanel.characteristics.eyeColor'
                                                )}
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {EYE_COLORS.map((color) => (
                                                <SelectItem
                                                    key={color}
                                                    value={color}
                                                >
                                                    {t(
                                                        `Components.Features.PersonalDetailsPanel.characteristics.eyeColors.${color}`
                                                    )}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Тип фигуры */}
                            <div className="space-y-1">
                                <Label
                                    htmlFor="bodyType"
                                    className="text-sm font-medium"
                                >
                                    {t(
                                        'Components.Features.PersonalDetailsPanel.characteristics.bodyType'
                                    )}
                                </Label>
                                <Select>
                                    <SelectTrigger
                                        id="bodyType"
                                        className="cursor-pointer h-9"
                                    >
                                        <SelectValue
                                            placeholder={t(
                                                'Components.Features.PersonalDetailsPanel.characteristics.bodyType'
                                            )}
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {BODY_TYPES[
                                            gender as keyof typeof BODY_TYPES
                                        ].map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {t(
                                                    `Components.Features.PersonalDetailsPanel.characteristics.bodyTypes.${type}`
                                                )}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Будущие мультиселекты */}
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <Label className="text-sm font-medium">
                                        {t(
                                            'Components.Features.PersonalDetailsPanel.characteristics.preferredColors'
                                        )}
                                    </Label>
                                    {/* Здесь будет мульти-селект с цветами */}
                                </div>

                                <div className="space-y-1">
                                    <Label className="text-sm font-medium">
                                        {t(
                                            'Components.Features.PersonalDetailsPanel.characteristics.stylePreference'
                                        )}
                                    </Label>
                                    {/* Здесь будет мульти-селект со стилями */}
                                </div>
                            </div>

                            <Button
                                variant="default"
                                className="w-full main-gradient text-amber-50 mt-2"
                            >
                                {t(
                                    'Components.Features.PersonalDetailsPanel.save'
                                )}
                            </Button>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};
