import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { GoToHomeButton } from '@/components/common/GoToHomeButton';
import { Combobox } from '@/components/ui/combobox';
import { EVENT_TYPES, EventType } from '@/constants/events';
import { useEventStore } from '@/store/eventStore';
import { useUserProfileStore } from '@/store/userProfileStore';

const Event: FC = () => {
    const { t } = useTranslation();
    const { selectedEventType, setSelectedEventType } = useEventStore();
    const { profile } = useUserProfileStore();

    const availableEvents =
        profile?.plan === 'free' ? EVENT_TYPES.FREE : EVENT_TYPES.PREMIUM;

    useEffect(() => {
        if (
            selectedEventType &&
            !Object.keys(availableEvents).includes(selectedEventType)
        ) {
            setSelectedEventType(null);
        }
    }, [
        profile?.plan,
        selectedEventType,
        availableEvents,
        setSelectedEventType
    ]);

    const eventTypes = Object.entries(availableEvents).map(([value]) => ({
        value,
        label: t(`Pages.Event.types.${value}`)
    }));

    const handleValueChange = (value: string) => {
        setSelectedEventType(value as EventType);
    };

    return (
        <div className="w-full flex-1 mx-auto p-4 third-gradient">
            <div className="w-full flex-1 max-w-4xl mx-auto flex flex-col items-center">
                <h1 className="text-3xl font-bold text-amber-50 text-center mb-2">
                    {t('Pages.Event.title')}
                </h1>
                <p className="text-amber-100/80 text-center mb-4">
                    {t('Pages.Event.description')}
                </p>

                <div className="w-full">
                    <Combobox
                        className="cursor-pointer md:p-4 p-6"
                        options={eventTypes}
                        value={selectedEventType || ''}
                        onValueChange={handleValueChange}
                        placeholder={t('Pages.Event.selectEvent')}
                        emptyMessage={t('Pages.Event.noEventFound')}
                    />
                </div>
            </div>

            <div className="flex justify-center my-4 w-full">
                <GoToHomeButton variant="secondary" />
            </div>
        </div>
    );
};

export default Event;
