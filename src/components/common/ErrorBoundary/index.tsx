import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

// Создаем отдельный компонент для отображения ошибки
const ErrorDisplay = () => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center justify-center h-screen p-4 space-y-4">
            <FontAwesomeIcon
                icon={faCircleExclamation}
                className="text-red-500 text-5xl mb-2"
            />
            <h1 className="text-2xl font-bold text-center">
                {t('Components.Common.ErrorBoundary.title')}
            </h1>
            <p className="text-gray-600 text-center max-w-md">
                {t('Components.Common.ErrorBoundary.description')}
            </p>
            <p className="text-gray-500 text-center max-w-md">
                {t('Components.Common.ErrorBoundary.suggestion')}
            </p>
            <button
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center space-x-2"
                onClick={() => window.location.reload()}
            >
                {t('Components.Common.ErrorBoundary.reload')}
            </button>
        </div>
    );
};

class ErrorBoundaryComponent extends Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, info);
    }

    render() {
        if (this.state.hasError) {
            return <ErrorDisplay />;
        }

        return this.props.children;
    }
}

export const ErrorBoundary = ErrorBoundaryComponent;
