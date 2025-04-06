import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OutfitResponseStore {
    aiResponse: string | null;
    standardResponse: string | null;
    setAiResponse: (response: string | null) => void;
    setStandardResponse: (response: string | null) => void;
    clearResponses: () => void;
}

export const useOutfitResponseStore = create<OutfitResponseStore>()(
    persist(
        (set) => ({
            aiResponse: null,
            standardResponse: null,
            setAiResponse: (response) =>
                set({ aiResponse: response, standardResponse: null }),
            setStandardResponse: (response) =>
                set({ standardResponse: response, aiResponse: null }),
            clearResponses: () =>
                set({ aiResponse: null, standardResponse: null })
        }),
        {
            name: 'outfit-response-storage'
        }
    )
);
