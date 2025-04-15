import { create } from 'zustand';

interface DeleteAccountState {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

export const useDeleteAccountStore = create<DeleteAccountState>((set) => ({
    isOpen: false,
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false })
}));
