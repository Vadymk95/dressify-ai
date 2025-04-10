import { lazy } from 'react';

import { WithSuspense } from '@/hocs/WithSuspense';

const OutfitRequestPanelContent = lazy(
    () => import('./OutfitRequestPanelContent')
);

export const OutfitRequestPanel = () => {
    return WithSuspense(<OutfitRequestPanelContent />);
};
