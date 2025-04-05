import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PerfectOutlookStore {
    isModalOpen: boolean;
    dontShowAgain: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    setDontShowAgain: (value: boolean) => void;
}

export const usePerfectOutlookStore = create<PerfectOutlookStore>()(
    persist(
        (set) => ({
            isModalOpen: false,
            dontShowAgain: false,
            setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
            setDontShowAgain: (value) => set({ dontShowAgain: value })
        }),
        {
            name: 'perfect-outlook-storage',
            partialize: (state) => ({ dontShowAgain: state.dontShowAgain })
        }
    )
);
