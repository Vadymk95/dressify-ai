import { ArrowLeft, Plus, Save, X } from 'lucide-react';
import { FC, useEffect, useRef, useState } from 'react';
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
    const [hasChanges, setHasChanges] = useState(false);
    const initialWardrobeRef = useRef<Wardrobe | null>(null);

    // Инициализация локального гардероба при загрузке данных
    useEffect(() => {
        if (profile?.wardrobe) {
            // Если есть предметы в гардеробе, но useWardrobeForOutfits выключен, включаем его
            const hasItems = profile.wardrobe.categories.some(
                (category) => category.items.length > 0
            );
            if (hasItems && !profile.wardrobe.useWardrobeForOutfits) {
                const updatedWardrobe = {
                    ...profile.wardrobe,
                    useWardrobeForOutfits: true
                };
                setLocalWardrobe(updatedWardrobe);
                initialWardrobeRef.current = updatedWardrobe;
            } else {
                setLocalWardrobe(profile.wardrobe);
                initialWardrobeRef.current = profile.wardrobe;
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
        const translation = t(`Pages.Wardrobe.errors.${errorKey}`);
        // Если перевод не найден, возвращаем общее сообщение об ошибке
        return translation === `Pages.Wardrobe.errors.${errorKey}`
            ? t('Pages.Wardrobe.errors.unknownError')
            : translation;
    };

    const handleInputChange = (categoryId: string, value: string) => {
        setNewItemInputs((prev) => ({
            ...prev,
            [categoryId]: value
        }));
    };

    // Проверка на наличие изменений
    const checkForChanges = (updatedWardrobe: Wardrobe) => {
        if (!initialWardrobeRef.current) return true;

        // Проверяем, изменилось ли количество предметов в любой категории
        const hasItemsChanged = updatedWardrobe.categories.some(
            (category, index) => {
                const initialCategory =
                    initialWardrobeRef.current?.categories[index];
                return category.items.length !== initialCategory?.items.length;
            }
        );

        // Проверяем, изменилось ли значение useWardrobeForOutfits
        const hasUseWardrobeChanged =
            updatedWardrobe.useWardrobeForOutfits !==
            initialWardrobeRef.current.useWardrobeForOutfits;

        return hasItemsChanged || hasUseWardrobeChanged;
    };

    // Добавление предмета в локальное состояние
    const handleAddItem = (categoryId: string) => {
        const itemName = newItemInputs[categoryId]?.trim();

        // Теперь только проверка на максимальную длину
        if (itemName.length > 50) {
            setLocalError('maxLength');
            return;
        }

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

            const updatedWardrobe = {
                categories: updatedCategories,
                useWardrobeForOutfits: hasItems
                    ? true
                    : prev.useWardrobeForOutfits
            };

            // Проверяем, есть ли изменения
            setHasChanges(checkForChanges(updatedWardrobe));

            return updatedWardrobe;
        });

        // Очищаем поле ввода
        setNewItemInputs((prev) => ({
            ...prev,
            [categoryId]: ''
        }));
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

            const updatedWardrobe = {
                ...prev,
                categories: updatedCategories
            };

            // Проверяем, есть ли изменения
            setHasChanges(checkForChanges(updatedWardrobe));

            return updatedWardrobe;
        });
    };

    // Сохранение всех изменений
    const handleSaveWardrobe = async () => {
        if (!hasChanges) {
            // Если изменений нет, просто возвращаемся на предыдущую страницу
            navigate(routes.whatToWear);
            return;
        }

        setIsSaving(true);
        setLocalError(null);
        try {
            await updateWardrobe(localWardrobe);
            // После успешного сохранения обновляем основной гардероб
            const currentUser = auth.currentUser;
            if (currentUser) {
                fetchUserProfile(currentUser.uid);
            }
            // Возвращаемся на предыдущую страницу после успешного сохранения
            navigate(routes.whatToWear);
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
                                disabled={
                                    !newItemInputs[category.id]?.trim() ||
                                    newItemInputs[category.id]?.trim().length <
                                        2
                                }
                                className={`${
                                    !newItemInputs[category.id]?.trim() ||
                                    newItemInputs[category.id]?.trim().length <
                                        2
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
