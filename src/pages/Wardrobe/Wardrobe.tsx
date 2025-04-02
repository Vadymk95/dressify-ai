import { ArrowLeft, Plus, X } from 'lucide-react';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Loader } from '@/components/common/Loader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { routes } from '@/router/routes';
import { useWardrobeStore } from '@/store/wardrobeStore';

const Wardrobe: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const {
        wardrobe,
        loading,
        error,
        fetchWardrobe,
        addItem,
        removeItem,
        clearError
    } = useWardrobeStore();
    const [newItemInputs, setNewItemInputs] = useState<Record<string, string>>(
        {}
    );

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

    // Функция для безопасного получения перевода ошибки
    const getErrorMessage = (errorKey: string) => {
        const translation = t(`errors.${errorKey}`);
        // Если перевод не найден, возвращаем общее сообщение об ошибке
        return translation === `errors.${errorKey}`
            ? t('errors.unknownError')
            : translation;
    };

    const handleInputChange = (categoryId: string, value: string) => {
        setNewItemInputs((prev) => ({
            ...prev,
            [categoryId]: value
        }));
    };

    const handleAddItem = async (categoryId: string) => {
        const itemName = newItemInputs[categoryId]?.trim();
        if (itemName) {
            await addItem(categoryId, itemName);
            setNewItemInputs((prev) => ({
                ...prev,
                [categoryId]: ''
            }));
        }
    };

    const handleRemoveItem = async (categoryId: string, itemId: string) => {
        await removeItem(categoryId, itemId);
    };

    const handleBack = () => {
        navigate(routes.whatToWear);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {loading && <Loader />}

            <div className="flex items-center mb-6">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleBack}
                    className="mr-2 cursor-pointer hover:bg-transparent hover:text-orange-500"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <h1 className="text-3xl font-bold">
                    {t('Pages.Wardrobe.title')}
                </h1>
            </div>

            {error && (
                <div className="mb-6 p-3 bg-red-100 text-red-800 rounded-md text-center">
                    {getErrorMessage(error)}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wardrobe.categories.map((category) => (
                    <div
                        key={category.id}
                        className="third-gradient p-4 rounded-lg shadow-md"
                    >
                        <h2 className="text-xl font-semibold text-amber-50 mb-4">
                            {t(`Pages.Wardrobe.categories.${category.name}`)}
                        </h2>

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
                                className="flex-1 bg-gray-100"
                            />
                            <Button
                                size="icon"
                                onClick={() => handleAddItem(category.id)}
                                className="main-gradient-reverse cursor-pointer"
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
                                        className="bg-gray-100 flex items-center gap-1"
                                    >
                                        {item.name}
                                        <button
                                            onClick={() =>
                                                handleRemoveItem(
                                                    category.id,
                                                    item.id
                                                )
                                            }
                                            className="ml-1 text-gray-400 hover:text-red-400 cursor-pointer"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                ))
                            ) : (
                                <p className="text-amber-50 text-sm">
                                    {t('Pages.Wardrobe.noItems')}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wardrobe;
