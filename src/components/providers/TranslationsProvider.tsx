import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Loader } from '@/components/common/Loader';

export const TranslationsProvider: FC<PropsWithChildren> = ({ children }) => {
    const { i18n } = useTranslation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkTranslations = async () => {
            try {
                await i18n.loadNamespaces('translation');
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to load translations:', error);
                setIsLoading(false);
            }
        };

        checkTranslations();
    }, [i18n]);

    if (isLoading) {
        return <Loader />;
    }

    return <>{children}</>;
};
