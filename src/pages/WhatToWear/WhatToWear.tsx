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

            <h1 className="text-3xl text-center text-amber-50 font-semibold mt-10 third-gradient py-12 px-4 rounded-xl">
                {t('Pages.WhatToWear.title')}
            </h1>

            <WeatherPanel />
            <PersonalDetailsPanel />

            <div className="flex flex-col md:flex-row gap-5">
                <section className="flex-1 p-4 main-gradient-reverse shadow-md rounded-xl flex flex-col">
                    <WardrobePanel />
                </section>

                <section className="flex-1 third-gradient p-4 rounded-lg shadow-md flex flex-col">
                    <EventPanel />
                </section>
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
