import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { DeleteAccountModal } from '@/components/common/DeleteAccountModal';
import { Button } from '@/components/ui/button';
import { useDeleteAccountStore } from '@/store/deleteAccountStore';
import { useUIStore } from '@/store/uiStore';

export const DeleteAccountButton: FC = () => {
    const { t } = useTranslation();
    const { isMinimalistic } = useUIStore();
    const { openModal } = useDeleteAccountStore();

    if (!isMinimalistic) {
        return null;
    }

    return (
        <div className="flex items-center md:justify-start justify-center w-full">
            <Button
                variant="link"
                onClick={openModal}
                className="text-red-500 hover:text-red-600 cursor-pointer p-0"
            >
                {t('Components.Features.DeleteAccountPanel.deleteButton')}
            </Button>
            <DeleteAccountModal />
        </div>
    );
};
