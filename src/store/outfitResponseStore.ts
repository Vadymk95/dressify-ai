import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OutfitResponseStore {
    aiResponse: string | null;
    setAiResponse: (response: string | null) => void;
    clearAiResponse: () => void;
}

// Создаем общий стор с персистентным хранением для aiResponse
export const useOutfitResponseStore = create<OutfitResponseStore>()(
    persist(
        (set) => ({
            aiResponse: null,
            setAiResponse: (response: string | null) =>
                set({ aiResponse: response }),
            clearAiResponse: () => set({ aiResponse: null })
        }),
        {
            name: 'outfit-response-storage',
            partialize: (state) => ({ aiResponse: state.aiResponse })
        }
    )
);
