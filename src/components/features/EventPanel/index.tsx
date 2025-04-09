import { Calendar } from 'lucide-react';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Combobox } from '@/components/ui/combobox';
import { EVENT_TYPES } from '@/constants/events';
import { EventType, useEventStore } from '@/store/eventStore';
import { useUserProfileStore } from '@/store/userProfileStore';

export const EventPanel: FC = () => {
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
        <section className="w-full h-full">
            <div className="group h-full p-6 flex flex-col items-center justify-center gap-4 third-gradient shadow-md rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out transform-gpu">
                <div className="flex flex-col items-center gap-2">
                    <Calendar className="w-12 h-12 text-amber-50 group-hover:text-amber-100 transition-colors duration-300" />
                    <h2 className="text-amber-50 text-base font-medium group-hover:text-amber-100 transition-colors duration-300">
                        {t('Pages.Event.title')}
                    </h2>
                </div>

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
        </section>
    );
};
