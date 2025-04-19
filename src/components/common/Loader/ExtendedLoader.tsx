import { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface ExtendedLoaderProps {
    variant?: 'overlay' | 'inline';
    size?: 'sm' | 'md' | 'lg';
    showText?: boolean;
    className?: string;
    text?: string;
}

export const ExtendedLoader: FC<ExtendedLoaderProps> = ({
    variant = 'inline',
    size = 'md',
    showText = true,
    className = '',
    text
}) => {
    const { t } = useTranslation();

    const sizeClasses = {
        sm: 'w-3 h-3',
        md: 'w-4 h-4',
        lg: 'w-8 h-8'
    };

    const spinner = (
        <div
            className={`
                ${sizeClasses[size]}
                border-2
                border-amber-50
                border-t-transparent
                rounded-full
                animate-spin
            `}
        />
    );

    const content = (
        <div className={`flex items-center gap-2 ${className}`}>
            {spinner}
            {showText && <span>{text || t('General.loading')}</span>}
        </div>
    );

    if (variant === 'overlay') {
        return (
            <div className="absolute inset-0 flex items-center justify-center bg-white/5 backdrop-blur-sm z-10 rounded-lg">
                {content}
            </div>
        );
    }

    return content;
};
