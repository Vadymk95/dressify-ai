import { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface MiniLoaderProps {
    size?: 'sm' | 'md' | 'lg';
    showText?: boolean;
    className?: string;
}

export const MiniLoader: FC<MiniLoaderProps> = ({
    size = 'md',
    showText = true,
    className = ''
}) => {
    const { t } = useTranslation();

    const sizeClasses = {
        sm: 'w-3 h-3',
        md: 'w-4 h-4',
        lg: 'w-6 h-6'
    };

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <div
                className={`${sizeClasses[size]} border-2 border-amber-50 border-t-transparent rounded-full animate-spin`}
            />
            {showText && <span>{t('General.loading')}</span>}
        </div>
    );
};
