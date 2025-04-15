import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { EmailVerificationPanel } from '@/components/common/EmailVerificationPanel';
import { PanelsContainer } from '@/components/common/PanelsContainer';
import { PerfectOutlook } from '@/components/common/PerfectOutlook';
import { DeleteAccountPanel } from '@/components/features/DeleteAccountPanel';
import { Feedback } from '@/components/features/Feedback';
import { OutfitRequestPanel } from '@/components/features/OutfitRequestPanel';
import { useUIStore } from '@/store/uiStore';

const WhatToWear: FC = () => {
    const { t } = useTranslation();
    const { isMinimalistic } = useUIStore();

    return (
        <div className="w-full max-w-4xl mx-auto px-6 flex flex-col gap-10">
            <PerfectOutlook />
            <EmailVerificationPanel />

            {!isMinimalistic && (
                <div>
                    <h1 className="text-3xl md:text-4xl text-center mb-2 font-bold mt-14 text-amber-800">
                        {t('Pages.WhatToWear.title')}
                    </h1>
                    <p className="text-center text-amber-700/80 text-lg max-w-2xl mx-auto">
                        {t('Pages.WhatToWear.subtitle')}
                    </p>
                </div>
            )}

            <section className={isMinimalistic ? 'mt-10' : ''}>
                <PanelsContainer />
            </section>

            <section className="p-4 bg-amber-50 rounded-xl shadow-md text-center">
                <OutfitRequestPanel />
            </section>

            <section>
                <Feedback />
            </section>

            <section>
                <DeleteAccountPanel />
            </section>
        </div>
    );
};

export default WhatToWear;
