// src/store/useFeedbackStore.ts
import { db } from '@/firebase/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { create } from 'zustand';

type FeedbackData = {
    email: string;
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
            await addDoc(collection(db, 'feedback'), data);
            set({ feedbackSent: true });
        } catch (err) {
            console.error('Error sending feedback:', err);
            set({ error: 'Error sending feedback. Please try again later.' });
        } finally {
            set({ loading: false });
        }
    },

    resetFeedbackStatus: () => {
        set({ feedbackSent: false, error: null });
    }
}));
