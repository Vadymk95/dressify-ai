import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type EventType =
    | 'businessMeeting'
    | 'interview'
    | 'wedding'
    | 'dateNight'
    | 'restaurant'
    | 'theater'
    | 'clubbing'
    | 'graduation'
    | 'conference'
    | 'casualWalk'
    | 'shopping'
    | 'concert'
    | 'exhibition'
    | 'birthday'
    | 'cocktailParty'
    | 'beachDay'
    | 'sportEvent'
    | 'casualFriends'
    | 'workOffice'
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
