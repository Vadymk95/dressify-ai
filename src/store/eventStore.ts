import { EventType as SupportedEventType } from '@/types/common';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type EventType =
    | SupportedEventType
    | 'businessMeeting'
    | 'interview'
    | 'wedding'
    | 'restaurant'
    | 'theater'
    | 'clubbing'
    | 'graduation'
    | 'conference'
    | 'casualWalk'
    | 'concert'
    | 'exhibition'
    | 'birthday'
    | 'cocktailParty'
    | 'beachDay'
    | 'sportEvent'
    | 'familyGathering'
    | 'onlineMeeting'
    | 'webinar'
    | 'onlineInterview'
    | 'videoConference';

interface EventStore {
    selectedEventType: EventType | null;
    setSelectedEventType: (type: EventType | null) => void;
}

export const useEventStore = create(
    persist<EventStore>(
        (set) => ({
            selectedEventType: null,
            setSelectedEventType: (type) => set({ selectedEventType: type })
        }),
        {
            name: 'event-storage'
        }
    )
);
