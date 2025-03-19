import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

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

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center h-screen p-4">
                    <h1 className="text-2xl font-bold mb-4">
                        Что-то пошло не так.
                    </h1>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                        onClick={() => window.location.reload()}
                    >
                        Перезагрузить
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export const ErrorBoundary = ErrorBoundaryComponent;
