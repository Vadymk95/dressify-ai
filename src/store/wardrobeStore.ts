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
            // Здесь будет API-запрос для получения гардероба пользователя
            // Пока используем заглушку
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

            // Здесь будет API-запрос для сохранения гардероба
            // Пока используем заглушку
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

            // Здесь будет API-запрос для сохранения гардероба
            // Пока используем заглушку
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

            // Здесь будет API-запрос для сохранения гардероба
            // Пока используем заглушку
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

    clearError: () => {
        set({ error: null });
    }
}));
