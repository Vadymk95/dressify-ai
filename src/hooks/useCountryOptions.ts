import { useTranslation } from 'react-i18next';

import { countryCodes } from '@/constants/countryCodes';

export const useCountryOptions = () => {
    const { t } = useTranslation();

    return countryCodes.map((code) => ({
        value: code,
        label: t(`Countries.${code}`, code)
    }));
};
