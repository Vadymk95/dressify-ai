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
        <div className="w-full max-w-4xl mx-auto px-6 flex flex-col gap-5">
            <PerfectOutlook />
            <EmailVerificationPanel />

            <h1 className="text-2xl md:text-3xl text-center font-semibold mt-10 md:mt-20 md:mb-10">
                {t('Pages.WhatToWear.title')}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <WeatherPanel />
                <PersonalDetailsPanel />
                <WardrobePanel />
                <EventPanel />
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
