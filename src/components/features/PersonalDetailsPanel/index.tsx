import { Check } from 'lucide-react';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Loader } from '@/components/common/Loader';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { useCharacteristicsStore } from '@/store/characteristicsStore';
import { useUserProfileStore } from '@/store/userProfileStore';
import { Gender, UserCharacteristics } from '@/types/user';

// Опции для селектов
const BODY_TYPES = {
    common: ['slim', 'athletic', 'average', 'curvy', 'muscular'],
    female: ['hourglass', 'pear', 'apple', 'rectangle', 'inverted_triangle'],
    male: ['trapezoid', 'triangle', 'oval']
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

const PREFERRED_COLORS = [
    'black',
    'white',
    'gray',
    'red',
    'blue',
    'green',
    'yellow',
    'purple',
    'pink',
    'orange',
    'brown',
    'beige'
];

const STYLE_PREFERENCES = [
    'casual',
    'formal',
    'business',
    'sporty',
    'romantic',
    'creative',
    'minimalist',
    'vintage',
    'streetwear'
];

export const PersonalDetailsPanel: FC = () => {
    const { t } = useTranslation();
    const {
        characteristics,
        updateCharacteristics,
        updateGender,
        loading,
        error,
        clearError
    } = useCharacteristicsStore();
    const { profile } = useUserProfileStore();
    const [formData, setFormData] = useState({
        gender: '',
        height: '',
        weight: '',
        age: '',
        skinTone: '',
        hairColor: '',
        eyeColor: '',
        bodyType: ''
    });
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

    // Инициализируем данные из профиля при его загрузке
    useEffect(() => {
        if (profile?.characteristics) {
            setFormData({
                gender: profile.characteristics.gender || '',
                height: profile.characteristics.height?.toString() || '',
                weight: profile.characteristics.weight?.toString() || '',
                age: profile.characteristics.age?.toString() || '',
                skinTone: profile.characteristics.skinTone || '',
                hairColor: profile.characteristics.hairColor || '',
                eyeColor: profile.characteristics.eyeColor || '',
                bodyType: profile.characteristics.bodyType || ''
            });
            setSelectedColors(profile.characteristics.preferredColors || []);
            setSelectedStyles(profile.characteristics.stylePreference || []);
        }
    }, [profile?.characteristics]);

    // Автоматически очищаем ошибку через 5 секунд
    useEffect(() => {
        if (error) {
            const timer = setTimeout(clearError, 5000);
            return () => clearTimeout(timer);
        }
    }, [error, clearError]);

    const handleInputChange =
        (field: keyof typeof formData) =>
        (e: ChangeEvent<HTMLInputElement> | string) => {
            const value = typeof e === 'string' ? e : e.target.value;
            setFormData((prev) => ({ ...prev, [field]: value }));
        };

    const getBodyTypesList = () => {
        const gender = formData.gender;
        if (!gender) {
            return BODY_TYPES.common;
        }
        return [
            ...BODY_TYPES.common,
            ...(BODY_TYPES[gender as keyof typeof BODY_TYPES] || [])
        ];
    };

    const handleSaveCharacteristics = async () => {
        const updatedCharacteristics = {
            ...characteristics,
            gender: formData.gender,
            height: formData.height ? Number(formData.height) : null,
            weight: formData.weight ? Number(formData.weight) : null,
            age: formData.age ? Number(formData.age) : null,
            skinTone: formData.skinTone || null,
            hairColor: formData.hairColor || null,
            eyeColor: formData.eyeColor || null,
            bodyType: formData.bodyType || null,
            preferredColors: selectedColors,
            stylePreference: selectedStyles
        };

        await updateCharacteristics(
            updatedCharacteristics as UserCharacteristics
        );
    };

    return (
        <div className="w-full">
            {loading && <Loader />}
            <h2 className="text-2xl font-bold text-amber-50 text-center mb-4">
                {t('Components.Features.PersonalDetailsPanel.title')}
            </h2>

            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4 bg-gray-100 p-4 rounded-lg">
                <div className="text-lg font-medium">
                    {t('Components.Features.PersonalDetailsPanel.gender')}
                </div>
                <RadioGroup
                    value={formData.gender}
                    onValueChange={(value) => {
                        setFormData((prev) => ({ ...prev, gender: value }));
                        updateGender(value as Gender);
                    }}
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

            {/* Сообщение об ошибке */}
            {error && (
                <div className="mb-4 px-4 py-2 text-red-600 bg-red-100 rounded-md text-center animate-fade-in">
                    {t([
                        `Components.Features.PersonalDetailsPanel.errors.${error}`,
                        'Components.Features.PersonalDetailsPanel.errors.unknownError'
                    ])}
                </div>
            )}

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
                                        value={formData.height}
                                        onChange={handleInputChange('height')}
                                        placeholder={t(
                                            'Components.Features.PersonalDetailsPanel.characteristics.heightPlaceholder'
                                        )}
                                        className="w-full h-9 bg-white"
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
                                        value={formData.weight}
                                        onChange={handleInputChange('weight')}
                                        placeholder={t(
                                            'Components.Features.PersonalDetailsPanel.characteristics.weightPlaceholder'
                                        )}
                                        className="w-full h-9 bg-white"
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
                                        value={formData.age}
                                        onChange={handleInputChange('age')}
                                        placeholder={t(
                                            'Components.Features.PersonalDetailsPanel.characteristics.agePlaceholder'
                                        )}
                                        className="w-full h-9 bg-white"
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
                                    <div className="w-full">
                                        <Select
                                            value={formData.skinTone}
                                            onValueChange={(value) =>
                                                handleInputChange('skinTone')(
                                                    value
                                                )
                                            }
                                        >
                                            <SelectTrigger
                                                id="skinTone"
                                                className="w-full cursor-pointer h-9 bg-white"
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
                                    <div className="w-full">
                                        <Select
                                            value={formData.hairColor}
                                            onValueChange={(value) =>
                                                handleInputChange('hairColor')(
                                                    value
                                                )
                                            }
                                        >
                                            <SelectTrigger
                                                id="hairColor"
                                                className="w-full cursor-pointer h-9 bg-white"
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
                                    <div className="w-full">
                                        <Select
                                            value={formData.eyeColor}
                                            onValueChange={(value) =>
                                                handleInputChange('eyeColor')(
                                                    value
                                                )
                                            }
                                        >
                                            <SelectTrigger
                                                id="eyeColor"
                                                className="w-full cursor-pointer h-9 bg-white"
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
                            </div>

                            {/* Тип фигуры */}
                            <div className="space-y-1 md:max-w-[240px]">
                                <Label
                                    htmlFor="bodyType"
                                    className="text-sm font-medium"
                                >
                                    {t(
                                        'Components.Features.PersonalDetailsPanel.characteristics.bodyType'
                                    )}
                                </Label>
                                <div className="w-full">
                                    <Select
                                        value={formData.bodyType}
                                        onValueChange={(value) =>
                                            handleInputChange('bodyType')(value)
                                        }
                                    >
                                        <SelectTrigger
                                            id="bodyType"
                                            className="w-full cursor-pointer h-9 bg-white"
                                        >
                                            <SelectValue
                                                placeholder={t(
                                                    'Components.Features.PersonalDetailsPanel.characteristics.bodyType'
                                                )}
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {getBodyTypesList().map((type) => (
                                                <SelectItem
                                                    key={type}
                                                    value={type}
                                                >
                                                    {t(
                                                        `Components.Features.PersonalDetailsPanel.characteristics.bodyTypes.${type}`
                                                    )}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Мультиселекты */}
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <Label className="text-sm font-medium">
                                        {t(
                                            'Components.Features.PersonalDetailsPanel.characteristics.preferredColors'
                                        )}
                                    </Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="w-full h-9 justify-start font-normal cursor-pointer"
                                            >
                                                {selectedColors.length > 0 ? (
                                                    <div className="flex gap-1 flex-wrap">
                                                        {selectedColors.map(
                                                            (color) => (
                                                                <Badge
                                                                    key={color}
                                                                    variant="secondary"
                                                                    className="mr-1"
                                                                >
                                                                    {t(
                                                                        `Components.Features.PersonalDetailsPanel.characteristics.colors.${color}`
                                                                    )}
                                                                </Badge>
                                                            )
                                                        )}
                                                    </div>
                                                ) : (
                                                    <span className="text-muted-foreground">
                                                        {t(
                                                            'Components.Features.PersonalDetailsPanel.characteristics.preferredColors'
                                                        )}
                                                    </span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-full p-0 md:min-w-[400px]"
                                            align="start"
                                        >
                                            <Command className="w-full">
                                                <CommandInput
                                                    className="w-full"
                                                    placeholder={t(
                                                        'Components.Features.PersonalDetailsPanel.search'
                                                    )}
                                                />
                                                <CommandEmpty>
                                                    {t(
                                                        'Components.Features.PersonalDetailsPanel.noResults'
                                                    )}
                                                </CommandEmpty>
                                                <CommandGroup className="max-h-[300px] overflow-auto">
                                                    {PREFERRED_COLORS.map(
                                                        (color) => (
                                                            <CommandItem
                                                                key={color}
                                                                onSelect={() => {
                                                                    setSelectedColors(
                                                                        selectedColors.includes(
                                                                            color
                                                                        )
                                                                            ? selectedColors.filter(
                                                                                  (
                                                                                      c
                                                                                  ) =>
                                                                                      c !==
                                                                                      color
                                                                              )
                                                                            : [
                                                                                  ...selectedColors,
                                                                                  color
                                                                              ]
                                                                    );
                                                                }}
                                                            >
                                                                <div className="flex items-center gap-2 cursor-pointer">
                                                                    <div
                                                                        className={`w-4 h-4 rounded-full bg-${color}`}
                                                                    />
                                                                    {t(
                                                                        `Components.Features.PersonalDetailsPanel.characteristics.colors.${color}`
                                                                    )}
                                                                    <Check
                                                                        className={`ml-auto h-4 w-4 ${
                                                                            selectedColors.includes(
                                                                                color
                                                                            )
                                                                                ? 'opacity-100'
                                                                                : 'opacity-0'
                                                                        }`}
                                                                    />
                                                                </div>
                                                            </CommandItem>
                                                        )
                                                    )}
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                <div className="space-y-1">
                                    <Label className="text-sm font-medium">
                                        {t(
                                            'Components.Features.PersonalDetailsPanel.characteristics.stylePreference'
                                        )}
                                    </Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="w-full h-9 justify-start font-normal cursor-pointer"
                                            >
                                                {selectedStyles.length > 0 ? (
                                                    <div className="flex gap-1 flex-wrap">
                                                        {selectedStyles.map(
                                                            (style) => (
                                                                <Badge
                                                                    key={style}
                                                                    variant="secondary"
                                                                    className="mr-1"
                                                                >
                                                                    {t(
                                                                        `Components.Features.PersonalDetailsPanel.characteristics.styles.${style}`
                                                                    )}
                                                                </Badge>
                                                            )
                                                        )}
                                                    </div>
                                                ) : (
                                                    <span className="text-muted-foreground">
                                                        {t(
                                                            'Components.Features.PersonalDetailsPanel.characteristics.stylePreference'
                                                        )}
                                                    </span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-full p-0 md:min-w-[400px]"
                                            align="start"
                                        >
                                            <Command className="w-full">
                                                <CommandInput
                                                    className="w-full"
                                                    placeholder={t(
                                                        'Components.Features.PersonalDetailsPanel.search'
                                                    )}
                                                />
                                                <CommandEmpty>
                                                    {t(
                                                        'Components.Features.PersonalDetailsPanel.noResults'
                                                    )}
                                                </CommandEmpty>
                                                <CommandGroup className="max-h-[300px] overflow-auto">
                                                    {STYLE_PREFERENCES.map(
                                                        (style) => (
                                                            <CommandItem
                                                                key={style}
                                                                onSelect={() => {
                                                                    setSelectedStyles(
                                                                        selectedStyles.includes(
                                                                            style
                                                                        )
                                                                            ? selectedStyles.filter(
                                                                                  (
                                                                                      s
                                                                                  ) =>
                                                                                      s !==
                                                                                      style
                                                                              )
                                                                            : [
                                                                                  ...selectedStyles,
                                                                                  style
                                                                              ]
                                                                    );
                                                                }}
                                                            >
                                                                {t(
                                                                    `Components.Features.PersonalDetailsPanel.characteristics.styles.${style}`
                                                                )}
                                                                <Check
                                                                    className={`ml-auto h-4 w-4 ${
                                                                        selectedStyles.includes(
                                                                            style
                                                                        )
                                                                            ? 'opacity-100'
                                                                            : 'opacity-0'
                                                                    }`}
                                                                />
                                                            </CommandItem>
                                                        )
                                                    )}
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>

                            <div className="flex justify-center md:justify-end mt-2">
                                <Button
                                    onClick={handleSaveCharacteristics}
                                    disabled={loading}
                                    className="min-w-[200px] secondary-gradient cursor-pointer font-semibold"
                                >
                                    {t(
                                        'Components.Features.PersonalDetailsPanel.save'
                                    )}
                                </Button>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};
