import { Combobox } from '@/components/ui/combobox';
import { events, EventType } from '@/constants/events';
import { useEventStore } from '@/store/eventStore';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const EventPanel: FC = () => {
    const { t } = useTranslation();
    const { selectedEventType, setSelectedEventType } = useEventStore();

    const eventTypes = Object.entries(events.types).map(([value]) => ({
        value,
        label: t(`Components.Features.EventPanel.types.${value}`)
    }));

    const handleValueChange = (value: string) => {
        setSelectedEventType(value as EventType);
    };

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold text-amber-50 text-center mb-2">
                {t('Components.Features.EventPanel.title')}
            </h2>
            <p className="text-amber-100/80 text-center mb-4">
                {t('Components.Features.EventPanel.description')}
            </p>

            <div className="w-full">
                <Combobox
                    className="cursor-pointer md:p-4 p-6"
                    options={eventTypes}
                    value={selectedEventType || ''}
                    onValueChange={handleValueChange}
                    placeholder={t(
                        'Components.Features.EventPanel.selectEvent'
                    )}
                    emptyMessage={t(
                        'Components.Features.EventPanel.noEventFound'
                    )}
                />
            </div>
        </div>
    );
};
