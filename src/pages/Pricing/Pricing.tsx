import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';

const Pricing: FC = () => {
    const { t } = useTranslation();

    return (
        <div className="max-w-6xl mx-auto py-12 px-6">
            <h1 className="text-3xl md:text-5xl font-bold text-center mb-8">
                {t('Pages.Pricing.title')}
            </h1>
            <p className="text-center text-lg md:text-xl mb-12">
                {t('Pages.Pricing.subtitle')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* FREE PLAN */}
                <div className="border p-6 rounded-xl flex flex-col items-center text-center shadow-sm">
                    <h2 className="text-xl font-semibold mb-2">
                        {t('Pages.Pricing.plans.free.title')}
                    </h2>
                    <p className="text-3xl font-bold mb-4">
                        {t('Pages.Pricing.plans.free.price')}
                    </p>
                    <ul className="mb-4 text-gray-600 space-y-1">
                        <li>{t('Pages.Pricing.plans.free.feature1')}</li>
                        <li>{t('Pages.Pricing.plans.free.feature2')}</li>
                    </ul>
                    <Button className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition hover:scale-105 cursor-pointer">
                        {t('Pages.Pricing.plans.free.cta')}
                    </Button>
                </div>

                {/* MONTHLY PLAN */}
                <div className="border p-6 rounded-xl flex flex-col items-center text-center shadow-sm">
                    <h2 className="text-xl font-semibold mb-2">
                        {t('Pages.Pricing.plans.monthly.title')}
                    </h2>
                    <p className="text-3xl font-bold mb-4">
                        {t('Pages.Pricing.plans.monthly.price')}
                    </p>
                    <ul className="mb-4 text-gray-600 space-y-1">
                        <li>{t('Pages.Pricing.plans.monthly.feature1')}</li>
                        <li>{t('Pages.Pricing.plans.monthly.feature2')}</li>
                    </ul>
                    <Button className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition hover:scale-105 cursor-pointer">
                        {t('Pages.Pricing.plans.monthly.cta')}
                    </Button>
                </div>

                {/* 6-MONTH (SEMI-ANNUAL) PLAN */}
                <div className="relative border p-6 rounded-xl flex flex-col items-center text-center shadow-sm">
                    {/* Диагональная ленточка "Best Deal" или "Самое выгодное" */}
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-red-400 to-orange-400 text-white text-xs px-3 py-1 transform rotate-45 translate-x-7 shadow rounded-3xl">
                        {t('Pages.Pricing.plans.semiAnnual.ribbon')}
                    </div>

                    <h2 className="text-xl font-semibold mb-2">
                        {t('Pages.Pricing.plans.semiAnnual.title')}
                    </h2>

                    <div className="flex flex-col items-center mb-1">
                        {/* Зачёркнутая старая цена */}
                        <span className="line-through text-gray-400 text-sm mb-1">
                            {t('Pages.Pricing.plans.semiAnnual.oldPrice')}
                        </span>
                        {/* Новая цена */}
                        <p className="text-3xl font-bold">
                            {t('Pages.Pricing.plans.semiAnnual.price')}
                        </p>
                    </div>

                    {/* Текст о выгоде (сэкономлено 3 $) */}
                    <p className="text-sm text-gray-500 mb-4">
                        {t('Pages.Pricing.plans.semiAnnual.save')}
                    </p>

                    <ul className="mb-4 text-gray-600 space-y-1">
                        <li>{t('Pages.Pricing.plans.semiAnnual.feature1')}</li>
                        <li>{t('Pages.Pricing.plans.semiAnnual.feature2')}</li>
                    </ul>
                    <Button className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition hover:scale-105 cursor-pointer">
                        {t('Pages.Pricing.plans.semiAnnual.cta')}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
