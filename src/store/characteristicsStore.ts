import { doc, updateDoc } from 'firebase/firestore';
import { create } from 'zustand';

import { db } from '@/firebase/firebaseConfig';
import { UserCharacteristics } from '@/types/user';

interface CharacteristicsStore {
    characteristics: UserCharacteristics | null;
    loading: boolean;
    error: string | null;
    setCharacteristics: (characteristics: UserCharacteristics) => void;
    updateCharacteristics: (
        uid: string,
        characteristics: UserCharacteristics
    ) => Promise<void>;
}

export const useCharacteristicsStore = create<CharacteristicsStore>((set) => ({
    characteristics: null,
    loading: false,
    error: null,
    setCharacteristics: (characteristics) => set({ characteristics }),
    updateCharacteristics: async (uid, characteristics) => {
        set({ loading: true, error: null });
        try {
            const userRef = doc(db, 'users', uid);
            await updateDoc(userRef, { characteristics });
            set({ characteristics, loading: false });
        } catch (error) {
            console.error('Error updating characteristics:', error);
            set({
                error:
                    error instanceof Error
                        ? error.message
                        : 'Unknown error occurred',
                loading: false
            });
        }
    }
}));
