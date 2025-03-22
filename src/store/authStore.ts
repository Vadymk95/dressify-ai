import { auth, db } from '@/firebase/firebaseConfig';
import {
    User,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { t } from 'i18next';
import { create } from 'zustand';

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
    register: (email: string, password: string) => Promise<boolean>;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    checkAuth: () => void;
    clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    loading: false,
    error: null,

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

            // Создаем документ в коллекции "users"
            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                email: user.email,
                createdAt: serverTimestamp(),
                emailVerified: user.emailVerified
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
    checkAuth: () => onAuthStateChanged(auth, (user) => set({ user })),

    // Функция для сброса ошибки
    clearError: () => set({ error: null })
}));
