import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Loader } from '@/components/common/Loader';

export const TranslationsProvider: FC<PropsWithChildren> = ({ children }) => {
    const { i18n } = useTranslation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkTranslations = async () => {
            try {
                // Ждем, пока i18next будет готов
                await i18n.loadNamespaces(['translation']);
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to load translations:', error);
                setIsLoading(false);
            }
        };

        if (i18n.isInitialized) {
            checkTranslations();
        } else {
            i18n.on('initialized', checkTranslations);
        }

        return () => {
            i18n.off('initialized', checkTranslations);
        };
    }, [i18n]);

    if (isLoading) {
        return <Loader />;
    }

    return <>{children}</>;
};
