import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from '@root/App.tsx';
import { ErrorBoundary } from '@root/components/common/ErrorBoundary';

import '@root/assets/styles/index.css';
import '@root/i18n';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <ErrorBoundary>
                <App />
            </ErrorBoundary>
        </BrowserRouter>
    </StrictMode>
);
