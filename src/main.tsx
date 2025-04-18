import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from '@/App.tsx';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { TranslationsProvider } from '@/components/providers/TranslationsProvider';

import '@/assets/styles/index.css';
import '@/i18n';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <ErrorBoundary>
                <TranslationsProvider>
                    <App />
                </TranslationsProvider>
            </ErrorBoundary>
        </BrowserRouter>
    </StrictMode>
);
