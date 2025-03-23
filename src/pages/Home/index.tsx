import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { routes } from '@/router/routes';

export const Home: FC = () => {
    const { t } = useTranslation();

    const siteTitle = t('Pages.Home.meta.title');
    const siteDescription = t('Pages.Home.meta.description');

    return (
        <div className="flex flex-col items-center w-full animate-fadeInUp">
            <title>{siteTitle}</title>
            <meta name="description" content={siteDescription} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={siteDescription} />
            <meta property="og:type" content="website" />

            <section className="w-full main-gradient text-white py-16 px-6 text-center rounded-b-3xl shadow-md">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                    {t('Pages.Home.title')}
                </h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
                    {t('Pages.Home.description')}
                </p>
                <Link
                    to={routes.login}
                    className="bg-white text-red-500 font-semibold px-6 py-3 text-lg rounded-lg shadow-lg transition hover:bg-gray-100 cursor-pointer"
                >
                    {t('Pages.Home.tryForFree')}
                </Link>
            </section>

            <section className="mt-12 px-6 max-w-3xl text-center">
                <h2 className="text-2xl md:text-3xl font-semibold mb-6">
                    {t('Pages.Home.advantages.title')}
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <li className="p-4 bg-white shadow-md rounded-lg transition-transform hover:scale-105">
                        <h3 className="text-lg font-semibold">
                            {t('Pages.Home.advantages.title1')}
                        </h3>
                        <p className="text-gray-600">
                            {t('Pages.Home.advantages.description1')}
                        </p>
                    </li>
                    <li className="p-4 bg-white shadow-md rounded-lg transition-transform hover:scale-105">
                        <h3 className="text-lg font-semibold">
                            {t('Pages.Home.advantages.title2')}
                        </h3>
                        <p className="text-gray-600">
                            {t('Pages.Home.advantages.description2')}
                        </p>
                    </li>
                    <li className="p-4 bg-white shadow-md rounded-lg transition-transform hover:scale-105">
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

            <section className="mt-12 main-gradient py-12 px-6 rounded-2xl shadow-xl text-center text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    {t('Pages.Home.ctaBlock.cta')}
                </h2>
                <p className="mb-6 text-lg opacity-90">
                    {t('Pages.Home.ctaBlock.description')}
                </p>
                <Link
                    to={routes.register}
                    className="block bg-white text-red-500 font-semibold px-8 py-3 text-lg rounded-full shadow-md hover:scale-105 transition-transform cursor-pointer"
                >
                    {t('Pages.Home.tryForFree')}
                </Link>
            </section>

            <section className="mt-16 px-6 max-w-3xl text-center">
                {' '}
                <h2 className="text-2xl md:text-3xl font-semibold mb-6">
                    {t('Pages.Home.hookBlock.title')}
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <li className="p-4 bg-white shadow-md rounded-lg transition-transform hover:scale-105">
                        <h3 className="text-lg font-semibold">
                            {t('Pages.Home.hookBlock.title1')}
                        </h3>
                        <p className="text-gray-600">
                            {t('Pages.Home.hookBlock.description1')}
                        </p>
                    </li>
                    <li className="p-4 bg-white shadow-md rounded-lg transition-transform hover:scale-105">
                        <h3 className="text-lg font-semibold">
                            {t('Pages.Home.hookBlock.title2')}
                        </h3>
                        <p className="text-gray-600">
                            {t('Pages.Home.hookBlock.description2')}
                        </p>
                    </li>
                    <li className="p-4 bg-white shadow-md rounded-lg transition-transform hover:scale-105">
                        <h3 className="text-lg font-semibold">
                            {t('Pages.Home.hookBlock.title3')}
                        </h3>
                        <p className="text-gray-600">
                            {t('Pages.Home.hookBlock.description3')}
                        </p>
                    </li>
                </ul>
            </section>
        </div>
    );
};
