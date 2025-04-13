import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { EventPanel } from '@/components/features/EventPanel';
import { PersonalDetailsPanel } from '@/components/features/PersonalDetailsPanel';
import { WardrobePanel } from '@/components/features/WardrobePanel';
import { WeatherPanel } from '@/components/features/WeatherPanel';
import { Switch } from '@/components/ui/switch';
import { useUIStore } from '@/store/uiStore';

export const PanelsContainer: FC = () => {
    const { t } = useTranslation();
    const { isMinimalistic, setIsMinimalistic } = useUIStore();
    const isMinimalisticView = isMinimalistic ? 'h-auto' : 'h-[200px]';

    const handleSwitchChange = () => {
        setIsMinimalistic(!isMinimalistic);
    };

    return (
        <section className="flex flex-col gap-2 w-full mx-auto">
            <div className="flex justify-end items-center gap-2">
                <span className="text-amber-700 text-sm">
                    {isMinimalistic
                        ? t('Pages.WhatToWear.minimalisticView')
                        : t('Pages.WhatToWear.detailedView')}
                </span>
                <Switch
                    className="data-[state=checked]:bg-amber-500 cursor-pointer"
                    checked={isMinimalistic}
                    onCheckedChange={handleSwitchChange}
                />
            </div>
            <div
                className={`w-full grid gap-2 ${isMinimalistic ? 'grid-cols-4' : 'grid-cols-1 md:grid-cols-2'}`}
            >
                <div className={isMinimalisticView}>
                    <WeatherPanel isMinimalistic={isMinimalistic} />
                </div>
                <div className={isMinimalisticView}>
                    <PersonalDetailsPanel isMinimalistic={isMinimalistic} />
                </div>
                <div className={isMinimalisticView}>
                    <WardrobePanel isMinimalistic={isMinimalistic} />
                </div>
                <div className={isMinimalisticView}>
                    <EventPanel isMinimalistic={isMinimalistic} />
                </div>
            </div>
        </section>
    );
};
