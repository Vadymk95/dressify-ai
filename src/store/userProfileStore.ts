import { db } from '@/firebase/firebaseConfig';
import { doc, getDoc, onSnapshot, Timestamp } from 'firebase/firestore';
import { create } from 'zustand';

export interface UserProfile {
    uid: string;
    email: string | null;
    createdAt?: Timestamp;
    emailVerified?: boolean;
}

interface UserProfileStore {
    profile: UserProfile | null;
    loading: boolean;
    error: string | null;
    fetchUserProfile: (uid: string) => Promise<void>;
    subscribeToUserProfile: (uid: string) => () => void;
    clearProfile: () => void;
}

export const useUserProfileStore = create<UserProfileStore>((set) => ({
    profile: null,
    loading: false,
    error: null,

    // Функция для одноразового получения данных профиля
    fetchUserProfile: async (uid: string) => {
        set({ loading: true, error: null });
        try {
            const docRef = doc(db, 'users', uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                set({ profile: docSnap.data() as UserProfile, loading: false });
            } else {
                set({ error: 'Profile not found', loading: false });
            }
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    // Функция для подписки на обновления профиля в реальном времени
    subscribeToUserProfile: (uid: string) => {
        const unsubscribe = onSnapshot(doc(db, 'users', uid), (docSnap) => {
            if (docSnap.exists()) {
                set({ profile: docSnap.data() as UserProfile });
            }
        });
        return unsubscribe;
    },

    clearProfile: () => set({ profile: null })
}));
