import { ReactNode, Suspense } from 'react';

import { Loader } from '@/components/common/Loader';

export const WithSuspense = (element: ReactNode) => (
    <Suspense fallback={<Loader />}>{element}</Suspense>
);
