import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { DeleteAccountModal } from '@/components/common/DeleteAccountModal';
import { Button } from '@/components/ui/button';
import { useDeleteAccountStore } from '@/store/deleteAccountStore';
import { useUIStore } from '@/store/uiStore';

export const DeleteAccountPanel: FC = () => {
    const { t } = useTranslation();
    const { isMinimalistic } = useUIStore();
    const { openModal } = useDeleteAccountStore();

    if (isMinimalistic) {
        return null;
    }

    return (
        <div className="w-full">
            <div className="p-6 first-gradient shadow-md rounded-xl">
                <h2 className="text-amber-50 text-base font-medium mb-2">
                    {t('Components.Features.DeleteAccountPanel.title')}
                </h2>
                <p className="text-amber-100 text-sm mb-4">
                    {t('Components.Features.DeleteAccountPanel.description')}
                </p>
                <Button
                    variant="destructive"
                    onClick={openModal}
                    className="cursor-pointer"
                >
                    {t('Components.Features.DeleteAccountPanel.deleteButton')}
                </Button>
            </div>

            <DeleteAccountModal />
        </div>
    );
};
