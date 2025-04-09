import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { EmailVerificationPanel } from '@/components/common/EmailVerificationPanel';
import { PerfectOutlook } from '@/components/common/PerfectOutlook';
import { EventPanel } from '@/components/features/EventPanel';
import { Feedback } from '@/components/features/Feedback';
import { OutfitRequestPanel } from '@/components/features/OutfitRequestPanel';
import { PersonalDetailsPanel } from '@/components/features/PersonalDetailsPanel';
import { WardrobePanel } from '@/components/features/WardrobePanel';
import { WeatherPanel } from '@/components/features/WeatherPanel';

const WhatToWear: FC = () => {
    const { t } = useTranslation();

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="h-[200px]">
                    <WeatherPanel />
                </div>
                <div className="h-[200px]">
                    <PersonalDetailsPanel />
                </div>
                <div className="h-[200px]">
                    <WardrobePanel />
                </div>
                <div className="h-[200px]">
                    <EventPanel />
                </div>
            </div>

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
