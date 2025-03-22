import { auth, db } from '@/firebase/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { t } from 'i18next';
import { create } from 'zustand';

type FeedbackData = {
    message: string;
};

type FeedbackStore = {
    loading: boolean;
    error: string | null;
    feedbackSent: boolean;
    sendFeedback: (data: FeedbackData) => Promise<void>;
    resetFeedbackStatus: () => void;
};

export const useFeedbackStore = create<FeedbackStore>((set) => ({
    loading: false,
    error: null,
    feedbackSent: false,

    sendFeedback: async (data) => {
        set({ loading: true, error: null, feedbackSent: false });
        try {
            // Если пользователь залогинен, добавляем его ID и email
            const currentUser = auth.currentUser;
            const feedbackData = currentUser
                ? {
                      ...data,
                      userId: currentUser.uid,
                      userEmail: currentUser.email
                  }
                : data;

            await addDoc(collection(db, 'feedback'), feedbackData);
            set({ feedbackSent: true });
        } catch (err) {
            console.error('Error sending feedback:', err);
            set({
                error: t(
                    'Components.Features.Feedback.errors.messageSendingError'
                ),
                feedbackSent: false
            });
        } finally {
            set({ loading: false });
        }
    },

    resetFeedbackStatus: () => {
        set({ feedbackSent: false, error: null });
    }
}));
