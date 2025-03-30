import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { EmailVerificationPanel } from '@/components/common/EmailVerificationPanel';
import { PerfectOutlook } from '@/components/common/PerfectOutlook';
import { Feedback } from '@/components/features/Feedback';
import { WeatherPanel } from '@/components/features/WeatherPanel';
import { useUserProfileStore } from '@/store/userProfileStore';

const WhatToWear: FC = () => {
    const { t } = useTranslation();
    const { profile } = useUserProfileStore();

    console.log(profile);

    return (
        <div className="w-full max-w-4xl mx-auto px-6 flex flex-col gap-5">
            <EmailVerificationPanel />

            <section className="p-4 main-gradient-reverse rounded-xl shadow-md text-center">
                <h1 className="text-3xl font-semibold text-white mb-2">
                    {t('Pages.WhatToWear.title')}
                </h1>

                <PerfectOutlook />
            </section>

            <section>
                <WeatherPanel />
            </section>

            <section>
                <div>user settings</div>
            </section>

            <section>
                <div>wardrobe</div>
            </section>

            <section>
                <div>event</div>
            </section>

            <section>
                <div>request</div>
            </section>

            <section>
                <div>answer</div>
            </section>

            <section>
                <Feedback />
            </section>
        </div>
    );
};

export default WhatToWear;
