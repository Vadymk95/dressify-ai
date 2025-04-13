import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useUserProfileStore } from '@/store/userProfileStore';
import { toast } from 'sonner';

interface WardrobeCheckboxProps {
    preventPropagation?: boolean;
    variant?: 'light' | 'dark';
}

export const WardrobeCheckbox: React.FC<WardrobeCheckboxProps> = ({
    preventPropagation = false,
    variant = 'light'
}) => {
    const { t } = useTranslation();
    const { profile, updateWardrobe, error } = useUserProfileStore();

    const isFreePlan = profile?.plan === 'free';
    const totalItems =
        profile?.wardrobe?.categories.reduce(
            (sum, category) => sum + category.items.length,
            0
        ) ?? 0;

    const handleToggle = async () => {
        if (isFreePlan || totalItems === 0) return;

        if (profile?.wardrobe) {
            const updatedWardrobe = {
                ...profile.wardrobe,
                useWardrobeForOutfits: !profile.wardrobe.useWardrobeForOutfits
            };
            await updateWardrobe(updatedWardrobe, { silent: true });
            if (error) {
                toast.error(t('Pages.Wardrobe.errors.unknownError'));
            }
        }
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
                checked={profile?.wardrobe?.useWardrobeForOutfits || false}
                onCheckedChange={handleToggle}
                disabled={isFreePlan || totalItems === 0}
                className={`${
                    isFreePlan || totalItems === 0
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
                    isFreePlan ? 'text-amber-50/50' : ''
                }`}
                onClick={(e) => {
                    e.preventDefault();
                    if (!isFreePlan && totalItems > 0) {
                        handleToggle();
                    }
                }}
            >
                {t('Components.Features.WardrobeCheckbox.label')}
            </Label>
        </div>
    );
};
