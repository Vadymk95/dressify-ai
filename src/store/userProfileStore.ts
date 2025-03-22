import { auth, db } from '@/firebase/firebaseConfig';
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { create } from 'zustand';

type Plan = 'free' | 'monthly' | 'semiAnnual';

export interface UserProfile {
    uid: string;
    email: string | null;
    createdAt: Date | null;
    emailVerified: boolean;
    lang: string;
    plan: Plan;
    subscriptionExpiry?: Date | null;
}

interface UserProfileStore {
    profile: UserProfile | null;
    loading: boolean;
    error: string | null;
    fetchUserProfile: (uid: string) => Promise<void>;
    subscribeToUserProfile: (uid: string) => () => void;
    clearProfile: () => void;
    updateLanguage: (lang: string) => Promise<void>;
    updatePlan: (plan: Plan) => Promise<void>;
    checkSubscriptionExpiry: () => Promise<void>;
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
    },

    updatePlan: async (plan: Plan) => {
        set({ loading: true, error: null });
        try {
            const currentUser = auth.currentUser;
            if (!currentUser) throw new Error('User not logged in');

            // Вычисляем дату окончания подписки
            let subscriptionExpiry: Date | null = null;
            if (plan === 'monthly') {
                subscriptionExpiry = new Date();
                subscriptionExpiry.setDate(subscriptionExpiry.getDate() + 30);
            } else if (plan === 'semiAnnual') {
                subscriptionExpiry = new Date();
                subscriptionExpiry.setDate(subscriptionExpiry.getDate() + 180);
            }

            // Обновляем Firestore: изменяем план и дату окончания подписки
            await updateDoc(doc(db, 'users', currentUser.uid), {
                plan,
                subscriptionExpiry
            });

            // Обновляем локальное состояние
            const currentProfile = get().profile;
            if (currentProfile) {
                set({
                    profile: { ...currentProfile, plan, subscriptionExpiry },
                    loading: false
                });
            } else {
                set({ loading: false });
            }
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    checkSubscriptionExpiry: async () => {
        const currentUser = auth.currentUser;
        if (!currentUser) return;
        try {
            const docRef = doc(db, 'users', currentUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                if (
                    data.subscriptionExpiry &&
                    data.subscriptionExpiry.toDate() < new Date()
                ) {
                    await updateDoc(docRef, {
                        plan: 'free',
                        subscriptionExpiry: null
                    });
                    set((state) => ({
                        profile: state.profile
                            ? {
                                  ...state.profile,
                                  plan: 'free',
                                  subscriptionExpiry: null
                              }
                            : null
                    }));
                }
            }
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    }
}));
