import { ArrowLeft, Plus, Save, X } from 'lucide-react';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Loader } from '@/components/common/Loader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { auth } from '@/firebase/firebaseConfig';
import { routes } from '@/router/routes';
import { useUserProfileStore } from '@/store/userProfileStore';
import { Wardrobe } from '@/types/user';

// Предопределенные категории гардероба
const DEFAULT_CATEGORIES = [
    { id: 'headwear', name: 'headwear', items: [] },
    { id: 'tops', name: 'tops', items: [] },
    { id: 'bottoms', name: 'bottoms', items: [] },
    { id: 'dresses', name: 'dresses', items: [] },
    { id: 'outerwear', name: 'outerwear', items: [] },
    { id: 'shoes', name: 'shoes', items: [] },
    { id: 'accessories', name: 'accessories', items: [] },
    { id: 'jewelry', name: 'jewelry', items: [] },
    { id: 'bags', name: 'bags', items: [] },
    { id: 'socks', name: 'socks', items: [] },
    { id: 'underwear', name: 'underwear', items: [] },
    { id: 'swimwear', name: 'swimwear', items: [] },
    { id: 'sportswear', name: 'sportswear', items: [] },
    { id: 'suits', name: 'suits', items: [] },
    { id: 'other', name: 'other', items: [] }
];

const WardrobePage: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { profile, loading, error, fetchUserProfile, updateWardrobe } =
        useUserProfileStore();

    // Состояние для временных изменений
    const [localWardrobe, setLocalWardrobe] = useState<Wardrobe>({
        categories: DEFAULT_CATEGORIES,
        useWardrobeForOutfits: false
    });
    const [newItemInputs, setNewItemInputs] = useState<Record<string, string>>(
        {}
    );
    const [isSaving, setIsSaving] = useState(false);
    const [localError, setLocalError] = useState<string | null>(null);

    // Инициализация локального гардероба при загрузке данных
    useEffect(() => {
        if (profile?.wardrobe) {
            // Если есть предметы в гардеробе, но useWardrobeForOutfits выключен, включаем его
            const hasItems = profile.wardrobe.categories.some(
                (category) => category.items.length > 0
            );
            if (hasItems && !profile.wardrobe.useWardrobeForOutfits) {
                setLocalWardrobe({
                    ...profile.wardrobe,
                    useWardrobeForOutfits: true
                });
            } else {
                setLocalWardrobe(profile.wardrobe);
            }
        }
    }, [profile]);

    useEffect(() => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            fetchUserProfile(currentUser.uid);
        }
    }, [fetchUserProfile]);

    // Автоматически очищаем ошибку через 5 секунд
    useEffect(() => {
        if (localError) {
            const timer = setTimeout(() => setLocalError(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [localError]);

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

    // Добавление предмета в локальное состояние
    const handleAddItem = (categoryId: string) => {
        const itemName = newItemInputs[categoryId]?.trim();
        if (itemName) {
            setLocalWardrobe((prev) => {
                const updatedCategories = prev.categories.map((category) => {
                    if (category.id === categoryId) {
                        const newItem = {
                            id: Date.now().toString(),
                            name: itemName
                        };
                        return {
                            ...category,
                            items: [...category.items, newItem]
                        };
                    }
                    return category;
                });

                // Проверяем, есть ли теперь предметы в гардеробе
                const hasItems = updatedCategories.some(
                    (category) => category.items.length > 0
                );

                return {
                    categories: updatedCategories,
                    useWardrobeForOutfits: hasItems
                        ? true
                        : prev.useWardrobeForOutfits
                };
            });

            // Очищаем поле ввода
            setNewItemInputs((prev) => ({
                ...prev,
                [categoryId]: ''
            }));
        }
    };

    // Удаление предмета из локального состояния
    const handleRemoveItem = (categoryId: string, itemId: string) => {
        setLocalWardrobe((prev) => {
            const updatedCategories = prev.categories.map((category) => {
                if (category.id === categoryId) {
                    return {
                        ...category,
                        items: category.items.filter(
                            (item) => item.id !== itemId
                        )
                    };
                }
                return category;
            });

            return {
                ...prev,
                categories: updatedCategories
            };
        });
    };

    // Сохранение всех изменений
    const handleSaveWardrobe = async () => {
        setIsSaving(true);
        setLocalError(null);
        try {
            await updateWardrobe(localWardrobe);
            // После успешного сохранения обновляем основной гардероб
            const currentUser = auth.currentUser;
            if (currentUser) {
                fetchUserProfile(currentUser.uid);
            }
        } catch (error: any) {
            console.error('Error saving wardrobe:', error);
            setLocalError(error.message || 'unknownError');
        } finally {
            setIsSaving(false);
        }
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {localWardrobe.categories.map((category) => (
                    <div
                        key={category.id}
                        className="bg-white p-4 rounded-lg shadow-md border border-amber-100 hover:shadow-lg transition-shadow"
                    >
                        <h2 className="text-xl font-semibold text-amber-800 mb-4">
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
                                className="flex-1 bg-amber-50 border-amber-200 text-amber-900 placeholder:text-amber-400 focus:border-amber-300 focus:ring-amber-300"
                            />
                            <Button
                                size="icon"
                                onClick={() => handleAddItem(category.id)}
                                className="bg-amber-600 hover:bg-amber-700 text-white cursor-pointer"
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
                                        className="bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1"
                                    >
                                        {item.name}
                                        <button
                                            onClick={() =>
                                                handleRemoveItem(
                                                    category.id,
                                                    item.id
                                                )
                                            }
                                            className="ml-1 text-amber-600 hover:text-red-500 cursor-pointer"
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
                ))}
            </div>

            <div className="mt-8 flex justify-center">
                <Button
                    onClick={handleSaveWardrobe}
                    disabled={isSaving}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 cursor-pointer"
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
