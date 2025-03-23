import { FC } from 'react';

import { EmailVerificationPanel } from '@/components/common/EmailVerificationPanel';
import { Feedback } from '@/components/features/Feedback';
import { useUserProfileStore } from '@/store/userProfileStore';

const WhatToWear: FC = () => {
    const { profile } = useUserProfileStore();

    console.log(profile);

    return (
        <div>
            <EmailVerificationPanel />

            <section className="mt-10 px-6 ">
                <Feedback />
            </section>
        </div>
    );
};

export default WhatToWear;
