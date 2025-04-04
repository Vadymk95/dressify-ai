import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Loader } from '@/components/common/Loader';
import { PlanCard } from '@/components/common/PlanCard';
import { usePricing } from '@/hooks/usePricing';

const Pricing: FC = () => {
    const { t } = useTranslation();
    const {
        isProcessing,
        loading,
        free,
        monthly,
        semiAnnual,
        handlePlanSelection
    } = usePricing();

    return (
        <>
            {(loading || isProcessing) && <Loader />}
            <div className="max-w-6xl mx-auto py-12 px-6">
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
                            t('Pages.Pricing.plans.free.feature2')
                        ]}
                        cta={t('Pages.Pricing.plans.free.cta')}
                        isActive={free}
                        onClick={() => handlePlanSelection('free')}
                        disabled={isProcessing}
                    />

                    {/* MONTHLY PLAN */}
                    <PlanCard
                        title={t('Pages.Pricing.plans.monthly.title')}
                        price={t('Pages.Pricing.plans.monthly.price')}
                        features={[
                            t('Pages.Pricing.plans.monthly.feature1'),
                            t('Pages.Pricing.plans.monthly.feature2')
                        ]}
                        cta={t(
                            `Pages.Pricing.plans.monthly.${monthly ? 'currentPlan' : 'cta'}`
                        )}
                        isActive={monthly}
                        onClick={() => handlePlanSelection('monthly')}
                        disabled={isProcessing}
                    />

                    {/* SEMI-ANNUAL PLAN */}
                    <PlanCard
                        title={t('Pages.Pricing.plans.semiAnnual.title')}
                        price={t('Pages.Pricing.plans.semiAnnual.price')}
                        oldPrice={t('Pages.Pricing.plans.semiAnnual.oldPrice')}
                        save={t('Pages.Pricing.plans.semiAnnual.save')}
                        features={[
                            t('Pages.Pricing.plans.semiAnnual.feature1'),
                            t('Pages.Pricing.plans.semiAnnual.feature2')
                        ]}
                        cta={t(
                            `Pages.Pricing.plans.semiAnnual.${semiAnnual ? 'currentPlan' : 'cta'}`
                        )}
                        ribbonText={t('Pages.Pricing.plans.semiAnnual.ribbon')}
                        isActive={semiAnnual}
                        onClick={() => handlePlanSelection('semiAnnual')}
                        disabled={isProcessing}
                    />
                </div>
            </div>
        </>
    );
};

export default Pricing;
