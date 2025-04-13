import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { EmailVerificationPanel } from '@/components/common/EmailVerificationPanel';
import { PerfectOutlook } from '@/components/common/PerfectOutlook';
import { EventPanel } from '@/components/features/EventPanel';
import { Feedback } from '@/components/features/Feedback';
import { OutfitRequestPanel } from '@/components/features/OutfitRequestPanel';
import { PersonalDetailsPanel } from '@/components/features/PersonalDetailsPanel';
import { WardrobePanel } from '@/components/features/WardrobePanel';
import { WeatherPanel } from '@/components/features/WeatherPanel';
import { Switch } from '@/components/ui/switch';

const WhatToWear: FC = () => {
    const { t } = useTranslation();
    const [isMinimalistic, setIsMinimalistic] = useState(false);
    const isMinimalisticView = isMinimalistic ? 'h-auto' : 'h-[200px]';

    const handleSwitchChange = () => {
        setIsMinimalistic(!isMinimalistic);
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-6 flex flex-col gap-10">
            <PerfectOutlook />
            <EmailVerificationPanel />
            <div>
                <h1 className="text-3xl md:text-4xl text-center mb-2 font-bold mt-14 text-amber-800">
                    {t('Pages.WhatToWear.title')}
                </h1>
                <p className="text-center text-amber-700/80 text-lg max-w-2xl mx-auto">
                    {t('Pages.WhatToWear.subtitle')}
                </p>
            </div>

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

            <section className="p-4 bg-amber-50 rounded-xl shadow-md text-center">
                <OutfitRequestPanel />
            </section>

            <section>
                <Feedback />
            </section>
        </div>
    );
};

export default WhatToWear;
