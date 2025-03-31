import { doc, updateDoc } from 'firebase/firestore';
import { create } from 'zustand';

import { auth, db } from '@/firebase/firebaseConfig';
import { Gender, UserCharacteristics } from '@/types/user';

interface CharacteristicsStore {
    characteristics: UserCharacteristics | null;
    loading: boolean;
    error: string | null;
    setCharacteristics: (characteristics: UserCharacteristics) => void;
    updateCharacteristics: (
        characteristics: UserCharacteristics
    ) => Promise<void>;
    updateGender: (gender: Gender) => Promise<void>;
}

export const useCharacteristicsStore = create<CharacteristicsStore>(
    (set, get) => ({
        characteristics: null,
        loading: false,
        error: null,
        setCharacteristics: (characteristics) => set({ characteristics }),
        updateCharacteristics: async (characteristics) => {
            set({ loading: true, error: null });
            try {
                const currentUser = auth.currentUser;
                if (!currentUser) {
                    throw new Error('Пользователь не авторизован');
                }
                const userRef = doc(db, 'users', currentUser.uid);
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
        },
        updateGender: async (gender: Gender) => {
            set({ loading: true, error: null });
            try {
                const currentUser = auth.currentUser;
                if (!currentUser) {
                    throw new Error('Пользователь не авторизован');
                }

                const userRef = doc(db, 'users', currentUser.uid);
                await updateDoc(userRef, {
                    'characteristics.gender': gender
                });

                const currentCharacteristics = get().characteristics || {};
                set({
                    characteristics: {
                        ...currentCharacteristics,
                        gender
                    },
                    loading: false
                });
            } catch (error) {
                console.error('Error updating gender:', error);
                set({
                    error:
                        error instanceof Error
                            ? error.message
                            : 'Unknown error occurred',
                    loading: false
                });
            }
        }
    })
);
