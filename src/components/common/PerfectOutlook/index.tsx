import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const PerfectOutlook: FC = () => {
    const { t } = useTranslation();

    const steps = [
        { id: 1, label: t('Components.Common.PerfectOutlook.steps.step1') },
        { id: 2, label: t('Components.Common.PerfectOutlook.steps.step2') },
        { id: 3, label: t('Components.Common.PerfectOutlook.steps.step3') },
        { id: 4, label: t('Components.Common.PerfectOutlook.steps.step4') }
    ];

    return (
        <div className="mt-8 p-4 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                {t('Components.Common.PerfectOutlook.title')}
            </h2>

            <ol className="flex flex-col md:flex-row md:justify-between flex-wrap gap-6 w-full">
                {steps.map((step, index) => (
                    <li
                        key={step.id}
                        className="flex md:flex-col items-center md:text-center gap-4 flex-1 basis-0 justify-start"
                    >
                        <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full main-gradient-reverse text-white font-semibold shadow-md">
                            {index + 1}
                        </div>
                        <span className="text-gray-700 font-semibold min-h-[56px] flex items-center justify-center max-w-xs">
                            {step.label}
                        </span>
                    </li>
                ))}
            </ol>

            <div className="mt-6 md:mt-10 flex items-center md:justify-center gap-4">
                <FontAwesomeIcon
                    className="text-[40px] text-green-400"
                    icon={faCircleCheck}
                />
                <p className="text-gray-700 font-semibold text-md md:text-2xl">
                    {t('Components.Common.PerfectOutlook.yourOutfit')}
                </p>
            </div>
        </div>
    );
};
