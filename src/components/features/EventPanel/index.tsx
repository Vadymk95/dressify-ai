import { Calendar } from 'lucide-react';
import { FC, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Combobox } from '@/components/ui/combobox';
import { EVENT_TYPES } from '@/constants/events';
import { EventType, useEventStore } from '@/store/eventStore';
import { useUserProfileStore } from '@/store/userProfileStore';

interface EventPanelProps {
    isMinimalistic?: boolean;
}

export const EventPanel: FC<EventPanelProps> = ({ isMinimalistic = false }) => {
    const { t } = useTranslation();
    const { selectedEventType, setSelectedEventType } = useEventStore();
    const { profile } = useUserProfileStore();
    const comboboxRef = useRef<HTMLButtonElement>(null);

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

    const handlePanelClick = () => {
        if (isMinimalistic && comboboxRef.current) {
            comboboxRef.current.click();
        }
    };

    return (
        <section className="w-full h-full relative">
            <div
                onClick={handlePanelClick}
                className="group h-full p-6 flex flex-col items-center justify-center gap-2 md:gap-4 third-gradient shadow-md rounded-xl cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out transform-gpu"
            >
                <div className="flex flex-col items-center gap-2">
                    <Calendar
                        className={`text-amber-50 group-hover:text-amber-100 transition-colors duration-300 ${
                            isMinimalistic ? 'w-8 h-8' : 'w-12 h-12'
                        }`}
                    />
                    {!isMinimalistic && (
                        <h2 className="text-amber-50 text-base font-medium group-hover:text-amber-100 transition-colors duration-300">
                            {t('Pages.Event.title')}
                        </h2>
                    )}
                </div>

                {!isMinimalistic && (
                    <div className="w-full">
                        <Combobox
                            ref={comboboxRef}
                            className="cursor-pointer md:p-4 p-6"
                            options={eventTypes}
                            value={selectedEventType || ''}
                            onValueChange={handleValueChange}
                            placeholder={t('Pages.Event.selectEvent')}
                            emptyMessage={t('Pages.Event.noEventFound')}
                        />
                    </div>
                )}
            </div>

            {isMinimalistic && (
                <div className="absolute inset-0 opacity-0 pointer-events-none">
                    <Combobox
                        ref={comboboxRef}
                        className="cursor-pointer md:p-4 p-6 z-[60]"
                        options={eventTypes}
                        value={selectedEventType || ''}
                        onValueChange={handleValueChange}
                        placeholder={t('Pages.Event.selectEvent')}
                        emptyMessage={t('Pages.Event.noEventFound')}
                    />
                </div>
            )}
        </section>
    );
};
