import { Check } from 'lucide-react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Loader } from '@/components/common/Loader';
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

import {
    EYE_COLORS,
    HAIR_COLORS,
    HEIGHT_UNITS,
    PREFERRED_COLORS,
    SKIN_TONES,
    STYLE_PREFERENCES,
    WEIGHT_UNITS
} from '@/constants/personalDetails';
import { usePersonalDetailsForm } from '@/hooks/usePersonalDetailsForm';
import { useUserProfileStore } from '@/store/userProfileStore';
import { GoToHomeButton } from '../../components/common/GoToHomeButton';

export const PersonalDetails: FC = () => {
    const { t } = useTranslation();
    const { profile } = useUserProfileStore();
    const isFreePlan = profile?.plan === 'free';
    const {
        formData,
        selectedColors,
        selectedStyles,
        loading,
        error,
        handleInputChange,
        handleGenderChange,
        handleColorsChange,
        handleStylesChange,
        handleSaveCharacteristics,
        getBodyTypesList
    } = usePersonalDetailsForm();

    return (
        <div className="w-full flex-1 mx-auto p-4 secondary-gradient">
            {loading && <Loader />}
            <div className="w-full flex-1 max-w-4xl mx-auto flex flex-col items-center">
                <h1 className="text-3xl font-bold text-amber-50 text-center mb-4">
                    {t('Pages.PersonalDetails.title')}
                </h1>

                <div className="w-full flex flex-col md:flex-row md:items-center gap-4 mb-4 bg-gray-100 p-4 rounded-lg">
                    <div className="text-lg font-medium">
                        {t('Pages.PersonalDetails.gender')}
                    </div>
                    <RadioGroup
                        value={formData.gender}
                        onValueChange={handleGenderChange}
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
                                {t('Pages.PersonalDetails.genderOptions.male')}
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
                                    'Pages.PersonalDetails.genderOptions.female'
                                )}
                            </Label>
                        </div>
                        {!isFreePlan && (
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
                                        'Pages.PersonalDetails.genderOptions.other'
                                    )}
                                </Label>
                            </div>
                        )}
                    </RadioGroup>
                </div>

                {error && (
                    <div className="mb-4 px-4 py-2 text-red-600 bg-red-100 rounded-md text-center animate-fade-in">
                        {t([
                            `Pages.PersonalDetails.errors.${error}`,
                            'Pages.PersonalDetails.errors.unknownError'
                        ])}
                    </div>
                )}

                <p className="text-sm text-gray-200 italic mb-4">
                    * {t('Pages.PersonalDetails.optionalNote')}
                </p>

                <div className="w-full bg-gray-100 px-6 rounded-lg">
                    <div className="flex flex-col gap-4 py-4">
                        {/* Первый ряд: рост, вес, возраст */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <Label
                                    htmlFor="height"
                                    className="text-sm font-medium flex items-center gap-1"
                                >
                                    {t(
                                        'Pages.PersonalDetails.characteristics.height'
                                    )}
                                </Label>
                                <div className="relative w-full">
                                    <Input
                                        id="height"
                                        type="number"
                                        min="100"
                                        max="250"
                                        value={formData.height}
                                        onChange={handleInputChange('height')}
                                        placeholder={t(
                                            'Pages.PersonalDetails.characteristics.heightPlaceholder'
                                        )}
                                        className="w-full h-9 bg-white pr-[70px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <div className="absolute right-0 top-0 h-9 flex items-center">
                                        <Select
                                            value={formData.heightUnit}
                                            onValueChange={(value) =>
                                                handleInputChange('heightUnit')(
                                                    value
                                                )
                                            }
                                        >
                                            <SelectTrigger
                                                id="heightUnit"
                                                className="h-9 bg-transparent border-0 focus:ring-0 px-2 hover:bg-gray-100 rounded-none shadow-none focus:bg-transparent data-[state=open]:bg-transparent cursor-pointer"
                                            >
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {HEIGHT_UNITS.map((unit) => (
                                                    <SelectItem
                                                        key={unit}
                                                        value={unit}
                                                    >
                                                        {t(
                                                            `Pages.PersonalDetails.characteristics.units.${unit}`
                                                        )}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <Label
                                    htmlFor="weight"
                                    className="text-sm font-medium flex items-center gap-1"
                                >
                                    {t(
                                        'Pages.PersonalDetails.characteristics.weight'
                                    )}
                                </Label>
                                <div className="relative w-full">
                                    <Input
                                        id="weight"
                                        type="number"
                                        min="30"
                                        max="250"
                                        value={formData.weight}
                                        onChange={handleInputChange('weight')}
                                        placeholder={t(
                                            'Pages.PersonalDetails.characteristics.weightPlaceholder'
                                        )}
                                        className="w-full h-9 bg-white pr-[70px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <div className="absolute right-0 top-0 h-9 flex items-center">
                                        <Select
                                            value={formData.weightUnit}
                                            onValueChange={(value) =>
                                                handleInputChange('weightUnit')(
                                                    value
                                                )
                                            }
                                        >
                                            <SelectTrigger
                                                id="weightUnit"
                                                className="h-9 bg-transparent border-0 focus:ring-0 px-2 hover:bg-gray-100 rounded-none shadow-none focus:bg-transparent data-[state=open]:bg-transparent cursor-pointer"
                                            >
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {WEIGHT_UNITS.map((unit) => (
                                                    <SelectItem
                                                        key={unit}
                                                        value={unit}
                                                    >
                                                        {t(
                                                            `Pages.PersonalDetails.characteristics.units.${unit}`
                                                        )}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <Label
                                    htmlFor="age"
                                    className="text-sm font-medium flex items-center gap-1"
                                >
                                    {t(
                                        'Pages.PersonalDetails.characteristics.age'
                                    )}
                                    <span className="text-xs text-gray-500">
                                        (
                                        {t(
                                            'Pages.PersonalDetails.characteristics.units.years'
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
                                        'Pages.PersonalDetails.characteristics.agePlaceholder'
                                    )}
                                    className="w-full h-9 bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                            </div>
                        </div>

                        {isFreePlan && (
                            <p className="text-sm text-amber-500 italic">
                                {t('Pages.PersonalDetails.freePlanNote')}
                            </p>
                        )}

                        {/* Второй ряд: цвет кожи, волос, глаз */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <Label
                                    htmlFor="skinTone"
                                    className="text-sm font-medium"
                                >
                                    {t(
                                        'Pages.PersonalDetails.characteristics.skinTone'
                                    )}
                                </Label>
                                <div className="w-full">
                                    <Select
                                        value={formData.skinTone}
                                        onValueChange={(value) =>
                                            handleInputChange('skinTone')(value)
                                        }
                                        disabled={isFreePlan}
                                    >
                                        <SelectTrigger
                                            id="skinTone"
                                            className="w-full cursor-pointer h-9 bg-white"
                                        >
                                            <SelectValue
                                                placeholder={t(
                                                    'Pages.PersonalDetails.characteristics.skinTone'
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
                                                        `Pages.PersonalDetails.characteristics.skinTones.${tone}`
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
                                        'Pages.PersonalDetails.characteristics.hairColor'
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
                                        disabled={isFreePlan}
                                    >
                                        <SelectTrigger
                                            id="hairColor"
                                            className="w-full cursor-pointer h-9 bg-white"
                                        >
                                            <SelectValue
                                                placeholder={t(
                                                    'Pages.PersonalDetails.characteristics.hairColor'
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
                                                        `Pages.PersonalDetails.characteristics.hairColors.${color}`
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
                                        'Pages.PersonalDetails.characteristics.eyeColor'
                                    )}
                                </Label>
                                <div className="w-full">
                                    <Select
                                        value={formData.eyeColor}
                                        onValueChange={(value) =>
                                            handleInputChange('eyeColor')(value)
                                        }
                                        disabled={isFreePlan}
                                    >
                                        <SelectTrigger
                                            id="eyeColor"
                                            className="w-full cursor-pointer h-9 bg-white"
                                        >
                                            <SelectValue
                                                placeholder={t(
                                                    'Pages.PersonalDetails.characteristics.eyeColor'
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
                                                        `Pages.PersonalDetails.characteristics.eyeColors.${color}`
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
                                    'Pages.PersonalDetails.characteristics.bodyType'
                                )}
                            </Label>
                            <div className="w-full">
                                <Select
                                    value={formData.bodyType}
                                    onValueChange={(value) =>
                                        handleInputChange('bodyType')(value)
                                    }
                                    disabled={isFreePlan}
                                >
                                    <SelectTrigger
                                        id="bodyType"
                                        className="w-full cursor-pointer h-9 bg-white"
                                    >
                                        <SelectValue
                                            placeholder={t(
                                                'Pages.PersonalDetails.characteristics.bodyType'
                                            )}
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {getBodyTypesList().map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {t(
                                                    `Pages.PersonalDetails.characteristics.bodyTypes.${type}`
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
                                        'Pages.PersonalDetails.characteristics.preferredColors'
                                    )}
                                </Label>
                                <Popover>
                                    <PopoverTrigger
                                        asChild
                                        disabled={isFreePlan}
                                    >
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
                                                                    `Pages.PersonalDetails.characteristics.colors.${color}`
                                                                )}
                                                            </Badge>
                                                        )
                                                    )}
                                                </div>
                                            ) : (
                                                <span className="text-muted-foreground">
                                                    {t(
                                                        'Pages.PersonalDetails.characteristics.preferredColors'
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
                                                    'Pages.PersonalDetails.search'
                                                )}
                                            />
                                            <CommandEmpty>
                                                {t(
                                                    'Pages.PersonalDetails.noResults'
                                                )}
                                            </CommandEmpty>
                                            <CommandGroup className="max-h-[300px] overflow-auto">
                                                {PREFERRED_COLORS.map(
                                                    (color) => (
                                                        <CommandItem
                                                            key={color}
                                                            onSelect={() =>
                                                                handleColorsChange(
                                                                    color
                                                                )
                                                            }
                                                        >
                                                            <div className="flex items-center gap-2 cursor-pointer">
                                                                <div
                                                                    className={`w-4 h-4 rounded-full bg-${color}`}
                                                                />
                                                                {t(
                                                                    `Pages.PersonalDetails.characteristics.colors.${color}`
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
                                        'Pages.PersonalDetails.characteristics.stylePreference'
                                    )}
                                </Label>
                                <Popover>
                                    <PopoverTrigger
                                        asChild
                                        disabled={isFreePlan}
                                    >
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
                                                                    `Pages.PersonalDetails.characteristics.styles.${style}`
                                                                )}
                                                            </Badge>
                                                        )
                                                    )}
                                                </div>
                                            ) : (
                                                <span className="text-muted-foreground">
                                                    {t(
                                                        'Pages.PersonalDetails.characteristics.stylePreference'
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
                                                    'Pages.PersonalDetails.search'
                                                )}
                                            />
                                            <CommandEmpty>
                                                {t(
                                                    'Pages.PersonalDetails.noResults'
                                                )}
                                            </CommandEmpty>
                                            <CommandGroup className="max-h-[300px] overflow-auto">
                                                {STYLE_PREFERENCES.map(
                                                    (style) => (
                                                        <CommandItem
                                                            key={style}
                                                            onSelect={() =>
                                                                handleStylesChange(
                                                                    style
                                                                )
                                                            }
                                                        >
                                                            {t(
                                                                `Pages.PersonalDetails.characteristics.styles.${style}`
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
                                {t('Pages.PersonalDetails.save')}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mb-4 mt-8 w-full">
                <GoToHomeButton variant="main" />
            </div>
        </div>
    );
};

export default PersonalDetails;
