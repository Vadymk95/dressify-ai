import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Loader } from '@/components/common/Loader';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { routes } from '@/router/routes';
import { useWardrobeStore } from '@/store/wardrobeStore';

export const WardrobePanel: FC = () => {
    const { t } = useTranslation();
    const {
        wardrobe,
        loading,
        error,
        fetchWardrobe,
        toggleUseWardrobeForOutfits,
        clearError
    } = useWardrobeStore();

    useEffect(() => {
        fetchWardrobe();
    }, [fetchWardrobe]);

    // Автоматически очищаем ошибку через 5 секунд
    useEffect(() => {
        if (error) {
            const timer = setTimeout(clearError, 5000);
            return () => clearTimeout(timer);
        }
    }, [error, clearError]);

    // Проверяем, есть ли предметы в гардеробе
    const hasItems = wardrobe.categories.some(
        (category) => category.items.length > 0
    );

    // Функция для безопасного получения перевода ошибки
    const getErrorMessage = (errorKey: string) => {
        const translation = t(`errors.${errorKey}`);
        // Если перевод не найден, возвращаем общее сообщение об ошибке
        return translation === `errors.${errorKey}`
            ? t('errors.unknownError')
            : translation;
    };

    return (
        <div className="w-full">
            {loading && <Loader />}
            <h2 className="text-2xl font-bold text-amber-50 text-center mb-4">
                {t('Components.Features.WardrobePanel.title')}
            </h2>

            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md text-center">
                    {getErrorMessage(error)}
                </div>
            )}

            <div className="flex flex-col items-center justify-center gap-4 mb-4">
                <Link
                    to={routes.wardrobe}
                    className="text-amber-50 hover:text-amber-200 transition-colors"
                >
                    {t('Components.Features.WardrobePanel.openWardrobe')}
                </Link>

                {hasItems && (
                    <div className="flex items-center space-x-2 mt-2">
                        <Checkbox
                            id="useWardrobe"
                            checked={wardrobe.useWardrobeForOutfits}
                            onCheckedChange={toggleUseWardrobeForOutfits}
                        />
                        <label
                            htmlFor="useWardrobe"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-amber-50"
                        >
                            {t(
                                'Components.Features.WardrobePanel.useWardrobeForOutfits'
                            )}
                        </label>
                    </div>
                )}

                {hasItems && (
                    <div className="mt-4">
                        <p className="text-sm text-amber-50 mb-2">
                            {t('Components.Features.WardrobePanel.itemCount', {
                                count: wardrobe.categories.reduce(
                                    (total, category) =>
                                        total + category.items.length,
                                    0
                                )
                            })}
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {wardrobe.categories.map(
                                (category) =>
                                    category.items.length > 0 && (
                                        <Badge
                                            key={category.id}
                                            variant="outline"
                                            className="bg-gray-800 text-amber-50 border-amber-500"
                                        >
                                            {t(
                                                `Components.Features.WardrobePanel.categories.${category.name}`
                                            )}
                                            : {category.items.length}
                                        </Badge>
                                    )
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
