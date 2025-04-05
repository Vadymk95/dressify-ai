import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OutfitResponseStore {
    currentResponse: string | null;
    setCurrentResponse: (response: string | null) => void;
    clearResponse: () => void;
}

export const useOutfitResponseStore = create<OutfitResponseStore>()(
    persist(
        (set) => ({
            currentResponse: null,
            setCurrentResponse: (response) =>
                set({ currentResponse: response }),
            clearResponse: () => set({ currentResponse: null })
        }),
        {
            name: 'outfit-response-storage'
        }
    )
);
