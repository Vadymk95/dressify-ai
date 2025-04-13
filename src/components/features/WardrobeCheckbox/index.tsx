import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useUserProfileStore } from '@/store/userProfileStore';
import { Wardrobe } from '@/types/user';

interface WardrobeCheckboxProps {
    disabled?: boolean;
    preventPropagation?: boolean;
    totalItems?: number;
    variant?: 'light' | 'dark';
}

export const WardrobeCheckbox: FC<WardrobeCheckboxProps> = ({
    disabled = false,
    preventPropagation = false,
    totalItems,
    variant = 'light'
}) => {
    const { t } = useTranslation();
    const { profile, updateWardrobe } = useUserProfileStore();

    const isChecked = profile?.wardrobe?.useWardrobeForOutfits || false;
    const items =
        totalItems ??
        profile?.wardrobe?.categories.reduce(
            (sum, category) => sum + category.items.length,
            0
        ) ??
        0;

    const handleToggle = async (checked: boolean) => {
        if (!profile?.wardrobe || disabled || items === 0) return;

        const updatedWardrobe: Wardrobe = {
            ...profile.wardrobe,
            useWardrobeForOutfits: checked
        };
        await updateWardrobe(updatedWardrobe);
    };

    const handleClick = (e: React.MouseEvent) => {
        if (preventPropagation) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    return (
        <div className="flex items-center gap-2" onClick={handleClick}>
            <Checkbox
                id="use-wardrobe"
                checked={items > 0 && isChecked}
                onCheckedChange={handleToggle}
                disabled={disabled || items === 0}
                className={`${
                    disabled || items === 0
                        ? 'border-amber-300/50 data-[state=checked]:bg-amber-600/50 data-[state=checked]:border-amber-600/50'
                        : 'border-amber-300 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600'
                } data-[state=unchecked]:bg-transparent focus:ring-amber-500 focus:ring-offset-0`}
            />
            <Label
                htmlFor="use-wardrobe"
                className={`${variant === 'dark' ? 'text-muted-foreground' : 'text-amber-50'} text-sm cursor-pointer ${disabled || items === 0 ? 'text-amber-50/50' : ''}`}
                onClick={(e) => {
                    e.preventDefault();
                    if (!disabled && items > 0) {
                        handleToggle(!isChecked);
                    }
                }}
            >
                {t('Components.Features.WardrobeCheckbox.label')}
            </Label>
        </div>
    );
};
