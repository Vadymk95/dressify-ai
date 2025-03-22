import { auth, db } from '@/firebase/firebaseConfig';
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { create } from 'zustand';

export interface UserProfile {
    uid: string;
    email: string | null;
    createdAt: Date | null;
    emailVerified: boolean;
    lang: string;
}

interface UserProfileStore {
    profile: UserProfile | null;
    loading: boolean;
    error: string | null;
    fetchUserProfile: (uid: string) => Promise<void>;
    subscribeToUserProfile: (uid: string) => () => void;
    clearProfile: () => void;
    updateLanguage: (lang: string) => Promise<void>;
}

export const useUserProfileStore = create<UserProfileStore>((set, get) => ({
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
                const data = docSnap.data();
                set({
                    profile: {
                        ...data,
                        createdAt: data.createdAt
                            ? data.createdAt.toDate()
                            : null
                    } as UserProfile,
                    loading: false
                });
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

    clearProfile: () => set({ profile: null }),

    updateLanguage: async (lang: string) => {
        set({ loading: true, error: null });
        try {
            const currentUser = auth.currentUser;
            if (!currentUser) throw new Error('User not logged in');

            // Обновляем поле lang в Firestore
            await updateDoc(doc(db, 'users', currentUser.uid), { lang });

            // Обновляем локальное состояние профиля
            const currentProfile = get().profile;
            if (currentProfile) {
                set({
                    profile: { ...currentProfile, lang },
                    loading: false
                });
            } else {
                set({ loading: false });
            }
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    }
}));
