import { ReactNode, Suspense } from 'react';

import { Loader } from '@/components/common/Loader';

interface WithSuspenseOptions {
    showLoader?: boolean;
}

export const WithSuspense = (
    element: ReactNode,
    options: WithSuspenseOptions = { showLoader: true }
) => (
    <Suspense fallback={options.showLoader ? <Loader /> : null}>
        {element}
    </Suspense>
);
