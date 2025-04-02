import { create } from 'zustand';

export interface WardrobeItem {
    id: string;
    name: string;
}

export interface WardrobeCategory {
    id: string;
    name: string;
    items: WardrobeItem[];
}

export interface Wardrobe {
    categories: WardrobeCategory[];
    useWardrobeForOutfits: boolean;
}

interface WardrobeStore {
    wardrobe: Wardrobe;
    loading: boolean;
    error: string | null;
    fetchWardrobe: () => Promise<void>;
    addItem: (categoryId: string, itemName: string) => Promise<void>;
    removeItem: (categoryId: string, itemId: string) => Promise<void>;
    toggleUseWardrobeForOutfits: () => Promise<void>;
    saveWardrobe: (updatedWardrobe: Wardrobe) => Promise<void>;
    clearError: () => void;
}

// Предопределенные категории гардероба
const DEFAULT_CATEGORIES: WardrobeCategory[] = [
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

// Флаг для определения, используется ли реальный API или заглушка
const USE_MOCK_API = true;

export const useWardrobeStore = create<WardrobeStore>((set, get) => ({
    wardrobe: {
        categories: DEFAULT_CATEGORIES,
        useWardrobeForOutfits: false
    },
    loading: false,
    error: null,

    fetchWardrobe: async () => {
        set({ loading: true, error: null });
        try {
            if (USE_MOCK_API) {
                // Имитация задержки API
                await new Promise((resolve) => setTimeout(resolve, 500));
                // Возвращаем заглушку с предопределенными категориями
                set({
                    wardrobe: {
                        categories: DEFAULT_CATEGORIES,
                        useWardrobeForOutfits: false
                    },
                    loading: false
                });
                return;
            }

            // Реальный API-запрос
            const response = await fetch('/api/wardrobe');
            if (!response.ok) {
                throw new Error('userNotAuthorized');
            }
            const data = await response.json();
            set({ wardrobe: data, loading: false });
        } catch (error) {
            console.error('Error fetching wardrobe:', error);
            set({
                error: 'unknownError',
                loading: false
            });
        }
    },

    addItem: async (categoryId: string, itemName: string) => {
        set({ loading: true, error: null });
        try {
            const { wardrobe } = get();
            const updatedCategories = wardrobe.categories.map((category) => {
                if (category.id === categoryId) {
                    const newItem: WardrobeItem = {
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

            const updatedWardrobe = {
                ...wardrobe,
                categories: updatedCategories
            };

            if (USE_MOCK_API) {
                // Имитация задержки API
                await new Promise((resolve) => setTimeout(resolve, 300));
                set({ wardrobe: updatedWardrobe, loading: false });
                return;
            }

            // Реальный API-запрос
            const response = await fetch('/api/wardrobe', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedWardrobe)
            });

            if (!response.ok) {
                throw new Error('userNotAuthorized');
            }

            set({ wardrobe: updatedWardrobe, loading: false });
        } catch (error) {
            console.error('Error adding item to wardrobe:', error);
            set({
                error: 'unknownError',
                loading: false
            });
        }
    },

    removeItem: async (categoryId: string, itemId: string) => {
        set({ loading: true, error: null });
        try {
            const { wardrobe } = get();
            const updatedCategories = wardrobe.categories.map((category) => {
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
                ...wardrobe,
                categories: updatedCategories
            };

            if (USE_MOCK_API) {
                // Имитация задержки API
                await new Promise((resolve) => setTimeout(resolve, 300));
                set({ wardrobe: updatedWardrobe, loading: false });
                return;
            }

            // Реальный API-запрос
            const response = await fetch('/api/wardrobe', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedWardrobe)
            });

            if (!response.ok) {
                throw new Error('userNotAuthorized');
            }

            set({ wardrobe: updatedWardrobe, loading: false });
        } catch (error) {
            console.error('Error removing item from wardrobe:', error);
            set({
                error: 'unknownError',
                loading: false
            });
        }
    },

    toggleUseWardrobeForOutfits: async () => {
        set({ loading: true, error: null });
        try {
            const { wardrobe } = get();
            const updatedWardrobe = {
                ...wardrobe,
                useWardrobeForOutfits: !wardrobe.useWardrobeForOutfits
            };

            if (USE_MOCK_API) {
                // Имитация задержки API
                await new Promise((resolve) => setTimeout(resolve, 300));
                set({ wardrobe: updatedWardrobe, loading: false });
                return;
            }

            // Реальный API-запрос
            const response = await fetch('/api/wardrobe', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedWardrobe)
            });

            if (!response.ok) {
                throw new Error('userNotAuthorized');
            }

            set({ wardrobe: updatedWardrobe, loading: false });
        } catch (error) {
            console.error('Error toggling use wardrobe for outfits:', error);
            set({
                error: 'unknownError',
                loading: false
            });
        }
    },

    saveWardrobe: async (updatedWardrobe: Wardrobe) => {
        set({ loading: true, error: null });
        try {
            if (USE_MOCK_API) {
                // Имитация задержки API
                await new Promise((resolve) => setTimeout(resolve, 500));
                set({ wardrobe: updatedWardrobe, loading: false });
                return;
            }

            // Реальный API-запрос
            const response = await fetch('/api/wardrobe', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedWardrobe)
            });

            if (!response.ok) {
                throw new Error('userNotAuthorized');
            }

            set({ wardrobe: updatedWardrobe, loading: false });
        } catch (error) {
            console.error('Error saving wardrobe:', error);
            set({
                error: 'unknownError',
                loading: false
            });
            throw error; // Пробрасываем ошибку для обработки в компоненте
        }
    },

    clearError: () => {
        set({ error: null });
    }
}));
