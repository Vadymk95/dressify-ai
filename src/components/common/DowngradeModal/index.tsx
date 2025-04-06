import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';

interface DowngradeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const DowngradeModal: FC<DowngradeModalProps> = ({
    isOpen,
    onClose,
    onConfirm
}: DowngradeModalProps) => {
    const { t } = useTranslation();

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {t('Components.Common.DowngradeModal.title')}
                    </DialogTitle>
                    <DialogDescription>
                        {t('Components.Common.DowngradeModal.description')}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex gap-2">
                    <Button
                        className="cursor-pointer"
                        variant="outline"
                        onClick={onClose}
                    >
                        {t('Components.Common.DowngradeModal.cancel')}
                    </Button>
                    <Button
                        className="cursor-pointer"
                        variant="destructive"
                        onClick={onConfirm}
                    >
                        {t('Components.Common.DowngradeModal.confirm')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
