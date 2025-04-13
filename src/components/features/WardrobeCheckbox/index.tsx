import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useUserProfileStore } from '@/store/userProfileStore';
import { Wardrobe } from '@/types/user';

interface WardrobeCheckboxProps {
    preventPropagation?: boolean;
    totalItems?: number;
    variant?: 'light' | 'dark';
}

export const WardrobeCheckbox: React.FC<WardrobeCheckboxProps> = ({
    preventPropagation = false,
    totalItems,
    variant = 'light'
}) => {
    const { t } = useTranslation();
    const { profile, updateWardrobe } = useUserProfileStore();

    const isFreePlan = profile?.plan === 'free';
    const items =
        totalItems ??
        profile?.wardrobe?.categories.reduce(
            (sum, category) => sum + category.items.length,
            0
        ) ??
        0;

    const isChecked =
        items > 0 ? profile?.wardrobe?.useWardrobeForOutfits || false : false;

    const handleToggle = async (checked: boolean) => {
        if (!profile?.wardrobe || isFreePlan || items === 0) return;

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
                checked={isChecked}
                onCheckedChange={handleToggle}
                disabled={isFreePlan || items === 0}
                className={`${
                    isFreePlan || items === 0
                        ? 'border-amber-300/50 data-[state=checked]:bg-amber-600/50 data-[state=checked]:border-amber-600/50'
                        : 'border-amber-300 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600'
                } data-[state=unchecked]:bg-transparent focus:ring-amber-500 focus:ring-offset-0`}
            />
            <Label
                htmlFor="use-wardrobe"
                className={`${
                    variant === 'dark'
                        ? 'text-muted-foreground'
                        : 'text-amber-50'
                } text-sm cursor-pointer ${
                    isFreePlan || items === 0 ? 'text-amber-50/50' : ''
                }`}
                onClick={(e) => {
                    e.preventDefault();
                    if (!isFreePlan && items > 0) {
                        handleToggle(!isChecked);
                    }
                }}
            >
                {t('Components.Features.WardrobeCheckbox.label')}
            </Label>
        </div>
    );
};
