import { ReactNode, Suspense } from 'react';

export const WithSuspense = (element: ReactNode) => (
    <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>
);
