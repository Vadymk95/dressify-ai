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
        // Если уже есть локальные изменения, не обновляем состояние
        if (hasChanges) return;

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

            const updatedWardrobe = {
                categories: updatedCategories,
                useWardrobeForOutfits: profile.wardrobe.useWardrobeForOutfits
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profile?.wardrobe?.categories, hasChanges]);

    // Отдельный эффект для синхронизации useWardrobeForOutfits
    useEffect(() => {
        const useWardrobeForOutfits = profile?.wardrobe?.useWardrobeForOutfits;
        if (useWardrobeForOutfits !== undefined && !hasChanges) {
            setLocalWardrobe((prev) => ({
                ...prev,
                useWardrobeForOutfits
            }));
        }
    }, [profile?.wardrobe?.useWardrobeForOutfits, hasChanges]);

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

                if (category.items.length !== initialCategory?.items.length) {
                    return true;
                }

                // Проверяем содержимое элементов
                return category.items.some((item, itemIndex) => {
                    const initialItem = initialCategory?.items[itemIndex];
                    return item.name !== initialItem?.name;
                });
            }
        );

        const hasUseWardrobeChanged =
            updatedWardrobe.useWardrobeForOutfits !==
            initialWardrobeRef.current.useWardrobeForOutfits;

        return hasItemsChanged || hasUseWardrobeChanged;
    }, []);

    const handleAddItem = useCallback(
        (categoryId: string) => {
            const newItemName = newItemInputs[categoryId]?.trim();
            if (!newItemName) return;

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
                const updatedWardrobe = {
                    ...prev,
                    categories: prev.categories.map((category) =>
                        category.id === categoryId
                            ? {
                                  ...category,
                                  items: [
                                      ...category.items,
                                      {
                                          id: crypto.randomUUID(),
                                          name: newItemName,
                                          isNew: true
                                      }
                                  ]
                              }
                            : category
                    )
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
            localWardrobe.categories,
            checkForChanges
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

    const handleSave = async () => {
        try {
            setIsSaving(true);

            // Проверяем, есть ли элементы в локальном гардеробе
            const hasItems = localWardrobe.categories.some(
                (category) => category.items.length > 0
            );

            // Проверяем, был ли гардероб пустым в сторе
            const wasStoreEmpty = profile?.wardrobe?.categories.every(
                (category) => category.items.length === 0
            );

            // Используем значение из стора, если оно есть
            const currentUseWardrobeForOutfits =
                profile?.wardrobe?.useWardrobeForOutfits;

            // Определяем новое значение useWardrobeForOutfits
            let newUseWardrobeForOutfits: boolean;

            if (!hasItems) {
                // Если нет элементов, всегда false
                newUseWardrobeForOutfits = false;
            } else if (wasStoreEmpty) {
                // Если гардероб был пустым и мы добавляем элементы
                newUseWardrobeForOutfits = true;
            } else {
                // В остальных случаях используем текущее значение из стора
                newUseWardrobeForOutfits =
                    currentUseWardrobeForOutfits ?? false;
            }

            const updatedWardrobe = {
                ...localWardrobe,
                useWardrobeForOutfits: newUseWardrobeForOutfits,
                categories: localWardrobe.categories.map((category) => ({
                    ...category,
                    items: category.items.map((item) => ({
                        id: item.id,
                        name: item.name
                    }))
                }))
            };

            await updateWardrobe(updatedWardrobe);
            setHasChanges(false);
            setLocalError(null);

            // Убираем флаг isNew после сохранения
            setLocalWardrobe((prev) => ({
                ...prev,
                useWardrobeForOutfits: newUseWardrobeForOutfits,
                categories: prev.categories.map((category) => ({
                    ...category,
                    items: category.items.map((item) => ({
                        ...item,
                        isNew: false
                    }))
                }))
            }));

            return true;
        } catch (error: any) {
            console.error('Error saving wardrobe:', error);
            setLocalError(error.message || 'unknownError');
            return false;
        } finally {
            setIsSaving(false);
        }
    };

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
        getErrorMessage,
        setLocalWardrobe
    };
};
