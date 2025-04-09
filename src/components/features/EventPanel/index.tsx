import { Calendar } from 'lucide-react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { routes } from '@/router/routes';
import { useEventStore } from '@/store/eventStore';

export const EventPanel: FC = () => {
    const { t } = useTranslation();
    const { selectedEventType } = useEventStore();

    return (
        <section className="w-full h-full">
            <Link
                to={routes.event}
                className="group h-full p-4 flex flex-col items-center third-gradient shadow-md rounded-xl cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out transform-gpu"
            >
                <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-6 h-6 text-amber-50 group-hover:text-amber-100 transition-colors duration-300" />
                    <h2 className="text-amber-50 font-medium group-hover:text-amber-100 transition-colors duration-300">
                        {t('Components.Features.EventPanel.title')}
                    </h2>
                </div>

                <div className="space-y-2">
                    {selectedEventType ? (
                        <p className="text-center text-sm text-amber-50/80">
                            {t(`Pages.Event.types.${selectedEventType}`)}
                        </p>
                    ) : (
                        <p className="text-center text-sm text-amber-50/80">
                            {t('Components.Features.EventPanel.description')}
                        </p>
                    )}
                </div>
            </Link>
        </section>
    );
};
