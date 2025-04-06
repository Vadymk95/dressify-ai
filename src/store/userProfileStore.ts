import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { create } from 'zustand';

import { auth, db } from '@/firebase/firebaseConfig';
import { parseCityCoordinates } from '@/helpers/parseCityCoordinates';
import { Plan } from '@/types/plans';
import { UserProfile, Wardrobe } from '@/types/user';

export interface UserProfileStore {
    profile: UserProfile | null;
    loading: boolean;
    error: string | null;
    fetchUserProfile: (uid: string) => Promise<void>;
    subscribeToUserProfile: (uid: string) => () => void;
    clearProfile: () => void;
    updateLanguage: (lang: string) => Promise<void>;
    updatePlan: (plan: Plan) => Promise<void>;
    checkSubscriptionExpiry: () => Promise<void>;
    updateEmailVerified: () => Promise<boolean>;
    updateLocation: (country: string, city: string) => Promise<void>;
    clearLocation: () => Promise<void>;
    updateWardrobe: (wardrobe: Wardrobe) => Promise<void>;
    updateProfile: (profile: UserProfile) => Promise<void>;
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
                const profile: UserProfile = {
                    uid: docSnap.id,
                    email: data.email,
                    emailVerified: data.emailVerified || false,
                    plan: data.plan,
                    lang: data.lang,
                    createdAt: data.createdAt?.toDate() || null,
                    requestLimits: data.requestLimits || null,
                    ...data
                };
                set({ profile, loading: false });
            } else {
                set({ error: 'Profile not found', loading: false });
            }
        } catch (error: any) {
            console.error(error);
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
        } catch (error: any) {
            console.error(error);
            set({ error: error.message, loading: false });
        }
    },

    updatePlan: async (plan: Plan) => {
        set({ loading: true, error: null });
        try {
            const currentUser = auth.currentUser;
            if (!currentUser) throw new Error('User not logged in');

            // Вычисляем дату окончания подписки
            let subscriptionExpiry: string | null = null;
            if (plan === 'standard') {
                const date = new Date();
                date.setDate(date.getDate() + 30);
                subscriptionExpiry = date.toISOString();
            } else if (plan === 'pro') {
                const date = new Date();
                date.setDate(date.getDate() + 180);
                subscriptionExpiry = date.toISOString();
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
            console.error(error);
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
                    new Date(data.subscriptionExpiry) < new Date()
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
            console.error(error);
            set({ error: error.message, loading: false });
        }
    },

    // Новый экшен для обновления emailVerified
    updateEmailVerified: async () => {
        try {
            const currentUser = auth.currentUser;
            if (!currentUser) throw new Error('User not logged in');

            // Обновляем данные пользователя (reload)
            await currentUser.reload();
            const updatedUser = auth.currentUser;

            if (updatedUser && updatedUser.emailVerified) {
                // Обновляем Firestore: устанавливаем emailVerified в true
                await updateDoc(doc(db, 'users', updatedUser.uid), {
                    emailVerified: true
                });
                // Перезапрашиваем профиль, чтобы обновить локальное состояние
                await get().fetchUserProfile(updatedUser.uid);
                return true;
            } else {
                // Если не подтвержден, можно обновить локальное состояние (опционально)
                set((state) => ({
                    profile: state.profile
                        ? { ...state.profile, emailVerified: false }
                        : null
                }));
                return false;
            }
        } catch (error: any) {
            console.error(error);
            set({ error: error.message });
            return false;
        }
    },

    updateLocation: async (country: string, city: string) => {
        set({ loading: true, error: null });
        try {
            const currentUser = auth.currentUser;
            if (!currentUser) throw new Error('User not logged in');

            if (!country || !city) {
                set({ loading: false, error: 'Country and city are required' });
                return;
            }

            const location = { country, city };
            const parsedCoordinates = parseCityCoordinates(city);

            if (!parsedCoordinates) {
                set({
                    loading: false,
                    error: 'Failed to parse city coordinates'
                });
                return;
            }

            const { latitude, longitude } = parsedCoordinates;
            const locationData = {
                ...location,
                latitude,
                longitude
            };

            await updateDoc(doc(db, 'users', currentUser.uid), {
                location: locationData
            });

            const currentProfile = get().profile;
            if (currentProfile) {
                set({
                    profile: { ...currentProfile, location: locationData },
                    loading: false
                });
            } else {
                set({ loading: false });
            }
        } catch (error: any) {
            console.error(error);
            set({ error: error.message, loading: false });
        }
    },

    clearLocation: async () => {
        set({ loading: true, error: null });
        try {
            const currentUser = auth.currentUser;
            if (!currentUser) throw new Error('User not logged in');

            await updateDoc(doc(db, 'users', currentUser.uid), {
                location: null
            });

            const currentProfile = get().profile;
            if (currentProfile) {
                set({
                    profile: { ...currentProfile, location: undefined },
                    loading: false
                });
            } else {
                set({ loading: false });
            }
        } catch (error: any) {
            console.error(error);
            set({ error: error.message, loading: false });
        }
    },

    // Новый метод для обновления гардероба пользователя
    updateWardrobe: async (wardrobe: Wardrobe) => {
        set({ loading: true, error: null });
        try {
            const currentUser = auth.currentUser;
            if (!currentUser) throw new Error('User not logged in');

            // Обновляем гардероб в Firestore
            await updateDoc(doc(db, 'users', currentUser.uid), {
                wardrobe
            });

            // Обновляем локальное состояние профиля
            const currentProfile = get().profile;
            if (currentProfile) {
                set({
                    profile: { ...currentProfile, wardrobe },
                    loading: false
                });
            } else {
                set({ loading: false });
            }
        } catch (error: any) {
            console.error(error);
            set({ error: error.message, loading: false });
        }
    },

    updateProfile: async (profile: UserProfile) => {
        try {
            set({ loading: true, error: null });

            const currentUser = auth.currentUser;
            if (!currentUser) throw new Error('User not logged in');

            // Обновляем данные в Firestore
            await updateDoc(doc(db, 'users', currentUser.uid), {
                requestLimits: profile.requestLimits
            });

            // Обновляем локальное состояние
            set({ profile, loading: false });
        } catch (error) {
            console.error('Error updating profile:', error);
            set({ error: 'Failed to update profile', loading: false });
        }
    }
}));
