export const events = {
    types: {
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
    }
} as const;

export type EventType = keyof typeof events.types;
