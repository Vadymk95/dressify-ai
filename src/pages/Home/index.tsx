import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Feedback } from '@/components/features/Feedback';
import { Button } from '@/components/ui/button';

export const Home: FC = () => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center justify-center">
            <section>
                <h1>{t('Pages.Home.title')}</h1>
                <p>{t('Pages.Home.description')}</p>
                <Button className="cursor-pointer">
                    {t('Pages.Home.tryForFree')}
                </Button>
            </section>

            <section>
                <h2>{t('Pages.Home.advantages.title')}</h2>
                <ul>
                    <li>
                        <h3>{t('Pages.Home.advantages.title1')}</h3>
                        <p>{t('Pages.Home.advantages.description1')}</p>
                    </li>
                    <li>
                        <h3>{t('Pages.Home.advantages.title2')}</h3>
                        <p>{t('Pages.Home.advantages.description2')}</p>
                    </li>
                    <li>
                        <h3>{t('Pages.Home.advantages.title3')}</h3>
                        <p>{t('Pages.Home.advantages.description3')}</p>
                    </li>
                </ul>
            </section>

            <section>
                <h2>{t('Pages.Home.howDoesItWorks.title')}</h2>
                <ul>
                    <li>
                        <h3>{t('Pages.Home.howDoesItWorks.title1')}</h3>
                    </li>
                    <li>
                        <h3>{t('Pages.Home.howDoesItWorks.title2')}</h3>
                    </li>
                    <li>
                        <h3>{t('Pages.Home.howDoesItWorks.title3')}</h3>
                    </li>
                </ul>
            </section>

            <section>
                <Button className="cursor-pointer">
                    {t('Pages.Home.ctaBlock.cta')}
                </Button>
                <p>{t('Pages.Home.ctaBlock.description')}</p>
            </section>

            <section>
                <Feedback />
            </section>
        </div>
    );
};
