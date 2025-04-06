import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
    DEFAULT_CATEGORIES,
    ITEMS_LIMIT_PER_CATEGORY,
    STANDARD_PLAN_CATEGORIES
} from '@/constants/wardrobe';
import { auth } from '@/firebase/firebaseConfig';
import { useUserProfileStore } from '@/store/userProfileStore';
import { Wardrobe } from '@/types/user';

export const useWardrobe = () => {
    const { t } = useTranslation();
    const { profile, loading, error, fetchUserProfile, updateWardrobe } =
        useUserProfileStore();
    const isStandardPlan = profile?.plan === 'standard' || false;

    // Состояние для временных изменений
    const [localWardrobe, setLocalWardrobe] = useState<Wardrobe>(() => ({
        categories: DEFAULT_CATEGORIES.map((category) => ({
            ...category,
            items: []
        })),
        useWardrobeForOutfits: false
    }));
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
            // Проверяем, что у всех категорий есть необходимые поля
            const updatedCategories = DEFAULT_CATEGORIES.map(
                (defaultCategory) => {
                    const existingCategory = profile.wardrobe?.categories.find(
                        (cat) => cat.id === defaultCategory.id
                    );
                    return (
                        existingCategory || { ...defaultCategory, items: [] }
                    );
                }
            );

            const hasItems = updatedCategories.some(
                (category) => category.items.length > 0
            );

            const updatedWardrobe = {
                categories: updatedCategories,
                useWardrobeForOutfits: hasItems
                    ? true
                    : profile.wardrobe.useWardrobeForOutfits
            };

            setLocalWardrobe(updatedWardrobe);
            initialWardrobeRef.current = updatedWardrobe;
        } else {
            // Если гардероба нет, используем категории по умолчанию
            const defaultWardrobe = {
                categories: DEFAULT_CATEGORIES.map((category) => ({
                    ...category,
                    items: []
                })),
                useWardrobeForOutfits: false
            };
            setLocalWardrobe(defaultWardrobe);
            initialWardrobeRef.current = defaultWardrobe;
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
    const getErrorMessage = useCallback(
        (errorKey: string) => {
            const translation = t(`Pages.Wardrobe.errors.${errorKey}`);
            return translation === `Pages.Wardrobe.errors.${errorKey}`
                ? t('Pages.Wardrobe.errors.unknownError')
                : translation;
        },
        [t]
    );

    const handleInputChange = useCallback(
        (categoryId: string, value: string) => {
            setNewItemInputs((prev) => ({
                ...prev,
                [categoryId]: value
            }));
        },
        []
    );

    // Проверка на наличие изменений
    const checkForChanges = useCallback((updatedWardrobe: Wardrobe) => {
        if (!initialWardrobeRef.current) return true;

        const hasItemsChanged = updatedWardrobe.categories.some(
            (category, index) => {
                const initialCategory =
                    initialWardrobeRef.current?.categories[index];
                return category.items.length !== initialCategory?.items.length;
            }
        );

        const hasUseWardrobeChanged =
            updatedWardrobe.useWardrobeForOutfits !==
            initialWardrobeRef.current.useWardrobeForOutfits;

        return hasItemsChanged || hasUseWardrobeChanged;
    }, []);

    const handleAddItem = useCallback(
        (categoryId: string) => {
            const itemName = newItemInputs[categoryId]?.trim();

            if (itemName.length > 50) {
                setLocalError('maxLength');
                return;
            }

            if (isStandardPlan) {
                const category = localWardrobe.categories.find(
                    (cat) => cat.id === categoryId
                );
                if (
                    category &&
                    category.items.length >= ITEMS_LIMIT_PER_CATEGORY
                ) {
                    setLocalError('itemLimitReached');
                    return;
                }
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

                const hasItems = updatedCategories.some(
                    (category) => category.items.length > 0
                );

                const updatedWardrobe = {
                    categories: updatedCategories,
                    useWardrobeForOutfits: hasItems
                        ? true
                        : prev.useWardrobeForOutfits
                };

                setHasChanges(checkForChanges(updatedWardrobe));

                return updatedWardrobe;
            });

            setNewItemInputs((prev) => ({
                ...prev,
                [categoryId]: ''
            }));
        },
        [
            isStandardPlan,
            newItemInputs,
            checkForChanges,
            localWardrobe.categories
        ]
    );

    const handleRemoveItem = useCallback(
        (categoryId: string, itemId: string) => {
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

                setHasChanges(checkForChanges(updatedWardrobe));

                return updatedWardrobe;
            });
        },
        [checkForChanges]
    );

    const handleSave = useCallback(async () => {
        if (!hasChanges) return false;

        setIsSaving(true);
        setLocalError(null);
        try {
            await updateWardrobe(localWardrobe);
            const currentUser = auth.currentUser;
            if (currentUser) {
                fetchUserProfile(currentUser.uid);
            }
            return true;
        } catch (error: any) {
            console.error('Error saving wardrobe:', error);
            setLocalError(error.message || 'unknownError');
            return false;
        } finally {
            setIsSaving(false);
        }
    }, [hasChanges, localWardrobe, updateWardrobe, fetchUserProfile]);

    // Мемоизируем отсортированные категории
    const sortedCategories = useMemo(() => {
        return [...localWardrobe.categories].sort((a, b) => {
            const aIsAvailable =
                !isStandardPlan || STANDARD_PLAN_CATEGORIES.includes(a.id);
            const bIsAvailable =
                !isStandardPlan || STANDARD_PLAN_CATEGORIES.includes(b.id);

            if (aIsAvailable === bIsAvailable) {
                return 0;
            }
            return aIsAvailable ? -1 : 1;
        });
    }, [localWardrobe.categories, isStandardPlan]);

    // Мемоизируем состояния категорий
    const categoryStates = useMemo(() => {
        return sortedCategories.reduce(
            (acc, category) => {
                const isAvailable =
                    !isStandardPlan ||
                    STANDARD_PLAN_CATEGORIES.includes(category.id);
                const isLimitReached =
                    isStandardPlan &&
                    category.items.length >= ITEMS_LIMIT_PER_CATEGORY;

                acc[category.id] = {
                    isAvailable,
                    isLimitReached
                };
                return acc;
            },
            {} as Record<
                string,
                { isAvailable: boolean; isLimitReached: boolean }
            >
        );
    }, [sortedCategories, isStandardPlan]);

    return {
        wardrobe: localWardrobe,
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
    };
};
