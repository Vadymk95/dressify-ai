import { AlertCircle, Check } from 'lucide-react';
import { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { BODY_TYPES } from '@/constants/personalDetails';
import { useCharacteristicsStore } from '@/store/characteristicsStore';
import { useCookieConsentStore } from '@/store/cookieConsentStore';
import { useUserProfileStore } from '@/store/userProfileStore';
import {
    Gender,
    HeightUnit,
    UserCharacteristics,
    WeightUnit
} from '@/types/user';

interface FormData {
    gender: string;
    height: string;
    weight: string;
    age: string;
    skinTone: string;
    hairColor: string;
    eyeColor: string;
    bodyType: string;
    heightUnit: HeightUnit;
    weightUnit: WeightUnit;
}

export const usePersonalDetailsForm = () => {
    const { t } = useTranslation();
    const { updateCharacteristics, updateGender, loading, error, clearError } =
        useCharacteristicsStore();
    const { profile } = useUserProfileStore();
    const { consent } = useCookieConsentStore();

    const [formData, setFormData] = useState<FormData>({
        gender: '',
        height: '',
        weight: '',
        age: '',
        skinTone: '',
        hairColor: '',
        eyeColor: '',
        bodyType: '',
        heightUnit: 'cm',
        weightUnit: 'kg'
    });

    const [initialFormData, setInitialFormData] = useState<FormData>(formData);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [initialSelectedColors, setInitialSelectedColors] = useState<
        string[]
    >([]);
    const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
    const [initialSelectedStyles, setInitialSelectedStyles] = useState<
        string[]
    >([]);

    // Инициализируем данные из профиля при его загрузке
    useEffect(() => {
        if (profile?.characteristics) {
            const newFormData = {
                gender: profile.characteristics.gender || '',
                height: profile.characteristics.height?.toString() || '',
                weight: profile.characteristics.weight?.toString() || '',
                age: profile.characteristics.age?.toString() || '',
                skinTone: profile.characteristics.skinTone || '',
                hairColor: profile.characteristics.hairColor || '',
                eyeColor: profile.characteristics.eyeColor || '',
                bodyType: profile.characteristics.bodyType || '',
                heightUnit: profile.characteristics.heightUnit || 'cm',
                weightUnit: profile.characteristics.weightUnit || 'kg'
            };
            const newColors = profile.characteristics.preferredColors || [];
            const newStyles = profile.characteristics.stylePreference || [];

            setFormData(newFormData);
            setInitialFormData(newFormData);
            setSelectedColors(newColors);
            setInitialSelectedColors(newColors);
            setSelectedStyles(newStyles);
            setInitialSelectedStyles(newStyles);
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
        (field: keyof FormData) =>
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

    const hasChanges = () => {
        const formDataChanged =
            JSON.stringify(formData) !== JSON.stringify(initialFormData);
        const colorsChanged =
            JSON.stringify(selectedColors) !==
            JSON.stringify(initialSelectedColors);
        const stylesChanged =
            JSON.stringify(selectedStyles) !==
            JSON.stringify(initialSelectedStyles);

        return formDataChanged || colorsChanged || stylesChanged;
    };

    const handleSaveCharacteristics = async () => {
        try {
            if (!hasChanges()) {
                toast.info(t('Pages.PersonalDetails.noChanges'));
                return;
            }

            if (!consent?.functional) {
                toast.error(t('Pages.PersonalDetails.errors.cookieRequired'), {
                    description: t(
                        'Pages.PersonalDetails.errors.cookieRequiredDesc'
                    ),
                    icon: <AlertCircle className="h-5 w-5 text-red-500" />
                });
                return;
            }

            const updatedCharacteristics = {
                gender: formData.gender as Gender,
                height: formData.height ? parseFloat(formData.height) : null,
                weight: formData.weight ? parseFloat(formData.weight) : null,
                age: formData.age ? parseInt(formData.age) : null,
                skinTone: formData.skinTone || null,
                hairColor: formData.hairColor || null,
                eyeColor: formData.eyeColor || null,
                bodyType: formData.bodyType || null,
                heightUnit: formData.heightUnit,
                weightUnit: formData.weightUnit,
                preferredColors: selectedColors,
                stylePreference: selectedStyles
            };

            await updateCharacteristics(
                updatedCharacteristics as UserCharacteristics
            );

            setInitialFormData(formData);
            setInitialSelectedColors(selectedColors);
            setInitialSelectedStyles(selectedStyles);

            toast.success(t('Pages.PersonalDetails.saveSuccess'), {
                icon: <Check className="h-5 w-5 text-green-500" />
            });
        } catch (error) {
            toast.error(t('Pages.PersonalDetails.errors.saveFailed'), {
                description:
                    error instanceof Error ? error.message : String(error),
                icon: <AlertCircle className="h-5 w-5 text-red-500" />
            });
        }
    };

    const handleGenderChange = (value: string) => {
        setFormData((prev) => ({ ...prev, gender: value }));
        updateGender(value as Gender);
    };

    const handleColorsChange = (color: string) => {
        setSelectedColors(
            selectedColors.includes(color)
                ? selectedColors.filter((c) => c !== color)
                : [...selectedColors, color]
        );
    };

    const handleStylesChange = (style: string) => {
        setSelectedStyles(
            selectedStyles.includes(style)
                ? selectedStyles.filter((s) => s !== style)
                : [...selectedStyles, style]
        );
    };

    return {
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
    };
};
