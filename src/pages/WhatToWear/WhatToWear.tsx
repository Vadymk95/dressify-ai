import { FC } from 'react';

import { EmailVerificationPanel } from '@/components/common/EmailVerificationPanel';
import { Feedback } from '@/components/features/Feedback';
import { WeatherPanel } from '@/components/features/WeatherPanel';
import { useUserProfileStore } from '@/store/userProfileStore';

const WhatToWear: FC = () => {
    const { profile } = useUserProfileStore();

    console.log(profile);

    return (
        <div className="w-full max-w-4xl mx-auto px-6">
            <EmailVerificationPanel />

            <section className="mt-5">
                <WeatherPanel />
            </section>

            <section className="mt-5">
                <Feedback />
            </section>
        </div>
    );
};

export default WhatToWear;
