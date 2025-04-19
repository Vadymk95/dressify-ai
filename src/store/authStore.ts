import { auth, db } from '@/firebase/firebaseConfig';
import {
    User,
    createUserWithEmailAndPassword,
    deleteUser,
    onAuthStateChanged,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import { deleteDoc, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { t } from 'i18next';
import { create } from 'zustand';

import { useLanguageStore } from '@/store/languageStore';

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
    initialized: boolean;
    unsubscribe: (() => void) | null;
    register: (email: string, password: string) => Promise<boolean>;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
    clearError: () => void;
    deleteUser: (email: string, password: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    loading: false,
    error: null,
    initialized: false,
    unsubscribe: null,

    // Регистрация пользователя
    register: async (email, password) => {
        set({ loading: true, error: null });
        try {
            // Создаем пользователя
            const { user } = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            // Отправляем письмо с подтверждением
            await sendEmailVerification(user);

            const lang = useLanguageStore.getState().language || 'en';

            // Создаем документ в коллекции "users"
            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                email: user.email,
                createdAt: serverTimestamp(),
                emailVerified: user.emailVerified,
                lang,
                plan: 'free'
            });

            set({ user, loading: false });
            return true;
        } catch (error: any) {
            let errorMessage = '';
            switch (error.code) {
                case 'auth/api-key-not-valid':
                    errorMessage = t('Pages.Register.errors.invalidApiKey');
                    break;
                case 'auth/email-already-in-use':
                    errorMessage = t('Pages.Register.errors.emailAlreadyInUse');
                    break;
                default:
                    errorMessage = t('Pages.Register.errors.genericError');
                    break;
            }
            set({ error: errorMessage, loading: false });
            return false;
        }
    },

    // Логин пользователя
    login: async (email, password) => {
        set({ loading: true, error: null });
        try {
            const { user } = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            set({ user, loading: false });
            return true;
        } catch (error: any) {
            let errorMessage = '';
            switch (error.code) {
                case 'auth/invalid-credential':
                    errorMessage = t('Pages.Login.errors.invalidCredentials');
                    break;
                default:
                    errorMessage = t('Pages.Login.errors.genericError');
                    break;
            }
            set({ error: errorMessage, loading: false });
            return false;
        }
    },

    // Выход пользователя
    logout: async () => {
        set({ loading: true, error: null });
        try {
            await signOut(auth);
            set({ user: null, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    // Отслеживание изменений статуса авторизации
    checkAuth: async () => {
        // Отменяем предыдущую подписку, если она существует
        const currentUnsubscribe = useAuthStore.getState().unsubscribe;
        if (currentUnsubscribe) {
            currentUnsubscribe();
        }

        return new Promise<void>((resolve) => {
            // Добавляем таймаут для инициализации
            const timeoutId = setTimeout(() => {
                set({ initialized: true });
                resolve();
            }, 5000); // 5 секунд таймаут

            const unsubscribe = onAuthStateChanged(
                auth,
                (user) => {
                    clearTimeout(timeoutId);
                    set({ user, initialized: true });
                    resolve();
                },
                (error) => {
                    clearTimeout(timeoutId);
                    console.error('Auth state change error:', error);
                    set({ initialized: true });
                    resolve();
                }
            );

            set({ unsubscribe });
        });
    },

    // Функция для сброса ошибки
    clearError: () => set({ error: null }),

    deleteUser: async (email, password) => {
        set({ loading: true, error: null });
        try {
            // Получаем текущего пользователя
            const currentUser = auth.currentUser;
            if (!currentUser || currentUser.email !== email) {
                throw { code: 'auth/user-mismatch' };
            }

            // Сначала аутентифицируем пользователя
            const { user } = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            // Дополнительная проверка на совпадение uid
            if (user.uid !== currentUser.uid) {
                throw { code: 'auth/user-mismatch' };
            }

            try {
                // Сначала пытаемся удалить из Firestore, пока есть права доступа
                await deleteDoc(doc(db, 'users', user.uid));
            } catch (firestoreError) {
                console.error('Error deleting from Firestore:', firestoreError);
                // Продолжаем выполнение даже если не удалось удалить из Firestore
            }

            // Затем удаляем пользователя из Authentication
            await deleteUser(user);

            set({ user: null, loading: false });
        } catch (error: any) {
            let errorMessage = '';
            switch (error.code) {
                case 'auth/invalid-credential':
                    errorMessage = t('Pages.Login.errors.invalidCredentials');
                    break;
                case 'auth/requires-recent-login':
                    errorMessage = t('Pages.Login.errors.requiresRecentLogin');
                    break;
                case 'auth/user-mismatch':
                    errorMessage = t('Pages.Login.errors.userMismatch');
                    break;
                default:
                    errorMessage = t('Pages.Register.errors.genericError');
                    break;
            }
            set({ error: errorMessage, loading: false });
            throw error;
        }
    }
}));
