import { ReactNode, Suspense } from 'react';
import { Loader } from '../components';

export const WithSuspense = (element: ReactNode) => (
    <Suspense fallback={<Loader />}>{element}</Suspense>
);
