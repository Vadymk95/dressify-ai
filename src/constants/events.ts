export const EVENT_TYPES = {
    PREMIUM: {
        businessMeeting: 'businessMeeting',
        interview: 'interview',
        wedding: 'wedding',
        dateNight: 'dateNight',
        restaurant: 'restaurant',
        theater: 'theater',
        clubbing: 'clubbing',
        graduation: 'graduation',
        conference: 'conference',
        casualWalk: 'casualWalk',
        shopping: 'shopping',
        concert: 'concert',
        exhibition: 'exhibition',
        birthday: 'birthday',
        cocktailParty: 'cocktailParty',
        beachDay: 'beachDay',
        sportEvent: 'sportEvent',
        casualFriends: 'casualFriends',
        workOffice: 'workOffice',
        familyGathering: 'familyGathering',
        onlineMeeting: 'onlineMeeting',
        webinar: 'webinar',
        onlineInterview: 'onlineInterview',
        videoConference: 'videoConference'
    },
    FREE: {
        casualFriends: 'casualFriends',
        workOffice: 'workOffice',
        dateNight: 'dateNight',
        shopping: 'shopping'
    }
} as const;

export type PremiumEventType = keyof typeof EVENT_TYPES.PREMIUM;
export type FreeEventType = keyof typeof EVENT_TYPES.FREE;
export type EventType = PremiumEventType | FreeEventType;

// Хелпер для проверки типа события
export const isPremiumEvent = (event: EventType): event is PremiumEventType => {
    return event in EVENT_TYPES.PREMIUM;
};

export const isFreeEvent = (event: EventType): event is FreeEventType => {
    return event in EVENT_TYPES.FREE;
};
