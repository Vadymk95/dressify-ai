import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Feedback } from '@/components/features/Feedback';
import { Button } from '@/components/ui/button';

export const Home: FC = () => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center w-full">
            <section className="w-full bg-gradient-to-r from-red-400 to-orange-400 text-white py-16 px-6 text-center rounded-b-3xl shadow-md">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                    {t('Pages.Home.title')}
                </h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
                    {t('Pages.Home.description')}
                </p>
                <Button className="bg-white text-red-500 font-semibold px-6 py-3 text-lg rounded-lg shadow-lg transition hover:bg-gray-100 cursor-pointer">
                    {t('Pages.Home.tryForFree')}
                </Button>
            </section>

            <section className="mt-12 px-6 max-w-3xl text-center">
                <h2 className="text-2xl md:text-3xl font-semibold mb-6">
                    {t('Pages.Home.advantages.title')}
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <li className="p-4 bg-white shadow-md rounded-lg">
                        <h3 className="text-lg font-semibold">
                            {t('Pages.Home.advantages.title1')}
                        </h3>
                        <p className="text-gray-600">
                            {t('Pages.Home.advantages.description1')}
                        </p>
                    </li>
                    <li className="p-4 bg-white shadow-md rounded-lg">
                        <h3 className="text-lg font-semibold">
                            {t('Pages.Home.advantages.title2')}
                        </h3>
                        <p className="text-gray-600">
                            {t('Pages.Home.advantages.description2')}
                        </p>
                    </li>
                    <li className="p-4 bg-white shadow-md rounded-lg">
                        <h3 className="text-lg font-semibold">
                            {t('Pages.Home.advantages.title3')}
                        </h3>
                        <p className="text-gray-600">
                            {t('Pages.Home.advantages.description3')}
                        </p>
                    </li>
                </ul>
            </section>

            <section className="mt-16 px-6 max-w-3xl text-center">
                <h2 className="text-2xl md:text-3xl font-semibold mb-6">
                    {t('Pages.Home.howDoesItWorks.title')}
                </h2>
                <ul className="space-y-4 text-lg text-gray-700">
                    <li className="flex items-center gap-3">
                        <h3 className="font-semibold">
                            {t('Pages.Home.howDoesItWorks.title1')}
                        </h3>
                    </li>
                    <li className="flex items-center gap-3">
                        <h3 className="font-semibold">
                            {t('Pages.Home.howDoesItWorks.title2')}
                        </h3>
                    </li>
                    <li className="flex items-center gap-3">
                        <h3 className="font-semibold">
                            {t('Pages.Home.howDoesItWorks.title3')}
                        </h3>
                    </li>
                </ul>
            </section>

            <section className="mt-12 text-center bg-gray-100 py-10 px-6 rounded-xl shadow-md w-full max-w-2xl">
                <Button className="bg-red-500 text-white font-semibold px-6 py-3 text-lg rounded-lg shadow-lg transition hover:bg-red-600 cursor-pointer">
                    {t('Pages.Home.ctaBlock.cta')}
                </Button>
                <p className="mt-2 text-gray-600">
                    {t('Pages.Home.ctaBlock.description')}
                </p>
            </section>

            <section>
                <Feedback />
            </section>
        </div>
    );
};
