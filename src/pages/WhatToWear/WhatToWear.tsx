import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { EmailVerificationPanel } from '@/components/common/EmailVerificationPanel';
import { Feedback } from '@/components/features/Feedback';
import { WeatherPanel } from '@/components/features/WeatherPanel';
import { useUserProfileStore } from '@/store/userProfileStore';

import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const WhatToWear: FC = () => {
    const { t } = useTranslation();
    const { profile } = useUserProfileStore();

    const steps = [
        { id: 1, label: t('Pages.WhatToWear.steps.step1') },
        { id: 2, label: t('Pages.WhatToWear.steps.step2') },
        { id: 3, label: t('Pages.WhatToWear.steps.step3') },
        { id: 4, label: t('Pages.WhatToWear.steps.step4') }
    ];

    console.log(profile);

    return (
        <div className="w-full max-w-4xl mx-auto px-6">
            <EmailVerificationPanel />

            <section className="mt-5 p-4 main-gradient-reverse rounded-xl shadow-md text-center">
                <h1 className="text-3xl font-semibold text-white mb-2">
                    {t('Pages.WhatToWear.title')}
                </h1>

                <div className="mt-8 p-4 bg-white rounded-xl shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                        {t('Pages.WhatToWear.title2')}
                    </h2>

                    <ol className="flex flex-col md:flex-row md:justify-between flex-wrap gap-6 w-full">
                        {steps.map((step, index) => (
                            <li
                                key={step.id}
                                className="flex md:flex-col items-center md:text-center gap-4 flex-1"
                            >
                                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full main-gradient-reverse text-white font-semibold shadow-md">
                                    {index + 1}
                                </div>
                                <span className="text-gray-700 font-semibold">
                                    {step.label}
                                </span>
                            </li>
                        ))}
                    </ol>

                    <div className="mt-6 md:mt-10 flex items-center justify-center gap-4">
                        <FontAwesomeIcon
                            className="text-[40px] text-green-400"
                            icon={faCircleCheck}
                        />
                        <p className="text-gray-700 font-semibold text-md md:text-2xl">
                            {t('Pages.WhatToWear.yourOutfit')}
                        </p>
                    </div>
                </div>
            </section>

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
