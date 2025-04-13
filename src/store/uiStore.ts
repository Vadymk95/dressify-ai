import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIStore {
    // Модальное окно
    isModalOpen: boolean;
    dontShowAgain: boolean;
    // Минималистичный вид
    isMinimalistic: boolean;
    // Actions
    setIsModalOpen: (isOpen: boolean) => void;
    setDontShowAgain: (value: boolean) => void;
    setIsMinimalistic: (value: boolean) => void;
}

export const useUIStore = create<UIStore>()(
    persist(
        (set) => ({
            isModalOpen: false,
            dontShowAgain: false,
            isMinimalistic: false,
            setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
            setDontShowAgain: (value) => set({ dontShowAgain: value }),
            setIsMinimalistic: (value) => set({ isMinimalistic: value })
        }),
        {
            name: 'ui-storage',
            partialize: (state) => ({
                dontShowAgain: state.dontShowAgain,
                isMinimalistic: state.isMinimalistic
            })
        }
    )
);
