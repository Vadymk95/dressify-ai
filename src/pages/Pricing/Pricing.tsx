import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Loader } from '@/components/common/Loader';
import { PlanCard } from '@/components/common/PlanCard';
import { usePricing } from '@/hooks/usePricing';

const Pricing: FC = () => {
    const { t } = useTranslation();
    const { loading, error, free, standard, pro, handlePlanSelection } =
        usePricing();

    return (
        <>
            {loading && <Loader />}
            <div className="max-w-6xl mx-auto py-12 px-6">
                {error && (
                    <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-center">
                        {error}
                    </div>
                )}
                <h1 className="text-3xl md:text-5xl font-bold text-center mb-8">
                    {t('Pages.Pricing.title')}
                </h1>
                <p className="text-center text-lg md:text-xl mb-12">
                    {t('Pages.Pricing.subtitle')}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* FREE PLAN */}
                    <PlanCard
                        title={t('Pages.Pricing.plans.free.title')}
                        price={t('Pages.Pricing.plans.free.price')}
                        features={[
                            t('Pages.Pricing.plans.free.feature1'),
                            t('Pages.Pricing.plans.free.feature2'),
                            t('Pages.Pricing.plans.free.feature3')
                        ]}
                        cta={t('Pages.Pricing.plans.free.cta')}
                        isActive={free}
                        onClick={() => handlePlanSelection('free')}
                        disabled={loading}
                    />

                    {/* STANDARD PLAN */}
                    <PlanCard
                        title={t('Pages.Pricing.plans.standard.title')}
                        price={t('Pages.Pricing.plans.standard.price')}
                        features={[
                            t('Pages.Pricing.plans.standard.feature1'),
                            t('Pages.Pricing.plans.standard.feature2'),
                            t('Pages.Pricing.plans.standard.feature3'),
                            t('Pages.Pricing.plans.standard.feature4'),
                            t('Pages.Pricing.plans.standard.feature5')
                        ]}
                        cta={t(
                            `Pages.Pricing.plans.standard.${standard ? 'currentPlan' : 'cta'}`
                        )}
                        isActive={standard}
                        onClick={() => handlePlanSelection('standard')}
                        disabled={loading}
                    />

                    {/* PRO PLAN */}
                    <PlanCard
                        title={t('Pages.Pricing.plans.pro.title')}
                        price={t('Pages.Pricing.plans.pro.price')}
                        features={[
                            t('Pages.Pricing.plans.pro.feature1'),
                            t('Pages.Pricing.plans.pro.feature2'),
                            t('Pages.Pricing.plans.pro.feature3'),
                            t('Pages.Pricing.plans.pro.feature4'),
                            t('Pages.Pricing.plans.pro.feature5')
                        ]}
                        cta={t(
                            `Pages.Pricing.plans.pro.${pro ? 'currentPlan' : 'cta'}`
                        )}
                        isActive={pro}
                        onClick={() => handlePlanSelection('pro')}
                        disabled={loading}
                    />
                </div>

                <p className="text-center text-sm text-gray-500 italic mt-8">
                    {t('Pages.Pricing.note')}
                </p>
            </div>
        </>
    );
};

export default Pricing;
