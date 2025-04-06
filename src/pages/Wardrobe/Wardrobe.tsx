import { ArrowLeft, Plus, Save, X } from 'lucide-react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Loader } from '@/components/common/Loader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useWardrobe } from '@/hooks/useWardrobe';
import { routes } from '@/router/routes';

const WardrobePage: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const {
        sortedCategories,
        categoryStates,
        newItemInputs,
        loading,
        error,
        localError,
        hasChanges,
        isSaving,
        isStandardPlan,
        handleInputChange,
        handleAddItem,
        handleRemoveItem,
        handleSave,
        getErrorMessage
    } = useWardrobe();

    const handleBack = () => {
        if (hasChanges) {
            // TODO: Добавить модальное окно подтверждения
            navigate(routes.whatToWear);
        } else {
            navigate(routes.whatToWear);
        }
    };

    const handleSaveAndNavigate = async () => {
        const success = await handleSave();
        if (success) {
            navigate(routes.whatToWear);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl">
                        <Loader />
                    </div>
                </div>
            )}

            <div className="flex items-center mb-6">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleBack}
                    className="mr-2 text-amber-800 hover:text-orange-500 hover:bg-transparent cursor-pointer"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <h1 className="text-3xl font-bold text-amber-800">
                    {t('Pages.Wardrobe.title')}
                </h1>
            </div>

            {(error || localError) && (
                <div className="mb-6 p-3 bg-red-100 text-red-800 rounded-md text-center">
                    {getErrorMessage(localError || error || '')}
                </div>
            )}

            {isStandardPlan && (
                <p className="text-orange-500 italic mb-6">
                    {t('Pages.Wardrobe.standardPlanLimits')}
                </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedCategories.map((category) => {
                    const { isAvailable, isLimitReached } =
                        categoryStates[category.id];

                    return (
                        <div
                            key={category.id}
                            className={`bg-white p-4 rounded-lg shadow-md border border-amber-100 hover:shadow-lg transition-shadow ${
                                !isAvailable ? 'opacity-50' : ''
                            }`}
                        >
                            <h2 className="text-xl font-semibold text-amber-800 mb-4">
                                {t(
                                    `Pages.Wardrobe.categories.${category.name}`
                                )}
                            </h2>

                            {!isAvailable && (
                                <div className="mb-4 text-sm text-amber-600 italic">
                                    {t('Pages.Wardrobe.categoryNotAvailable')}
                                </div>
                            )}

                            {isLimitReached && isAvailable && (
                                <div className="mb-4 text-sm text-amber-600 italic">
                                    {t('Pages.Wardrobe.itemLimitReached')}
                                </div>
                            )}

                            <div className="flex items-center space-x-2 mb-4">
                                <Input
                                    type="text"
                                    placeholder={t(
                                        'Pages.Wardrobe.addItemPlaceholder'
                                    )}
                                    value={newItemInputs[category.id] || ''}
                                    onChange={(e) =>
                                        handleInputChange(
                                            category.id,
                                            e.target.value
                                        )
                                    }
                                    disabled={!isAvailable || isLimitReached}
                                    className="flex-1 bg-amber-50 border-amber-200 text-amber-900 placeholder:text-amber-400 focus:border-amber-300 focus:ring-amber-300 disabled:opacity-50"
                                />
                                <Button
                                    size="icon"
                                    onClick={() => handleAddItem(category.id)}
                                    disabled={
                                        !isAvailable ||
                                        isLimitReached ||
                                        !newItemInputs[category.id]?.trim() ||
                                        newItemInputs[category.id]?.trim()
                                            .length < 2
                                    }
                                    className={`${
                                        !isAvailable ||
                                        isLimitReached ||
                                        !newItemInputs[category.id]?.trim() ||
                                        newItemInputs[category.id]?.trim()
                                            .length < 2
                                            ? 'bg-gray-400'
                                            : 'bg-amber-600 hover:bg-amber-700'
                                    } text-white cursor-pointer`}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {category.items.length > 0 ? (
                                    category.items.map((item) => (
                                        <Badge
                                            key={item.id}
                                            variant="secondary"
                                            className="bg-amber-100 text-amber-800 border border-amber-200 flex items-start gap-1 break-words whitespace-normal"
                                        >
                                            <span className="break-words">
                                                {item.name}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    handleRemoveItem(
                                                        category.id,
                                                        item.id
                                                    )
                                                }
                                                className="ml-1 mt-1 text-amber-600 hover:text-red-500 cursor-pointer"
                                                disabled={!isAvailable}
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </Badge>
                                    ))
                                ) : (
                                    <p className="text-amber-600 text-sm">
                                        {t('Pages.Wardrobe.noItems')}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 flex justify-center">
                <Button
                    onClick={handleSaveAndNavigate}
                    disabled={isSaving || !hasChanges}
                    className={`${
                        hasChanges
                            ? 'bg-amber-600 hover:bg-amber-700'
                            : 'bg-gray-400 hover:bg-gray-500'
                    } text-white px-6 py-2 cursor-pointer`}
                >
                    {isSaving ? (
                        <div className="flex items-center">
                            <Loader />
                            <span className="ml-2">
                                {t('Pages.Wardrobe.saving')}
                            </span>
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <Save className="h-4 w-4 mr-2" />
                            <span>{t('Pages.Wardrobe.saveChanges')}</span>
                        </div>
                    )}
                </Button>
            </div>
        </div>
    );
};

export default WardrobePage;
