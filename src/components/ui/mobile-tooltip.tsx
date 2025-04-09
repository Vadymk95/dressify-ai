import { cn } from '@/lib/utils';
import * as Dialog from '@radix-ui/react-dialog';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

interface MobileTooltipProps {
    trigger: React.ReactNode;
    content: React.ReactNode;
    className?: string;
}

export function MobileTooltip({
    trigger,
    content,
    className
}: MobileTooltipProps) {
    const { t } = useTranslation();

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <div className="cursor-pointer">{trigger}</div>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50" />
                <Dialog.Content
                    className={cn(
                        'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
                        'w-[calc(100vw-1rem)] max-w-md',
                        'backdrop-blur-sm',
                        'z-50',
                        className
                    )}
                >
                    <Dialog.Title className="sr-only">
                        {t('General.tooltip')}
                    </Dialog.Title>
                    {content}
                    <Dialog.Close className="absolute top-2 right-4 p-1 rounded-full hover:bg-amber-200/30 text-amber-700 transition-colors focus:outline-none focus:ring-0">
                        ✕
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
