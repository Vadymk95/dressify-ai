import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { routes } from '@/router/routes';
import { useAuthStore } from '@/store/authStore';
import { useUserProfileStore } from '@/store/userProfileStore';

export const DeleteAccountPanel: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const { deleteUser } = useAuthStore();
    const { clearProfile } = useUserProfileStore();

    const handleDeleteAccount = async () => {
        setError(null);

        if (!email) {
            setError(
                t('Components.Features.DeleteAccountPanel.errors.emailRequired')
            );
            return;
        }

        if (!password) {
            setError(
                t(
                    'Components.Features.DeleteAccountPanel.errors.passwordRequired'
                )
            );
            return;
        }

        if (!confirmPassword) {
            setError(
                t(
                    'Components.Features.DeleteAccountPanel.errors.confirmPasswordRequired'
                )
            );
            return;
        }

        if (password !== confirmPassword) {
            setError(
                t(
                    'Components.Features.DeleteAccountPanel.errors.passwordsMismatch'
                )
            );
            return;
        }

        setIsLoading(true);

        try {
            await deleteUser(email, password);
            clearProfile();
            navigate(routes.home);
        } catch (error: any) {
            if (error.code === 'auth/invalid-credential') {
                setError(
                    t(
                        'Components.Features.DeleteAccountPanel.errors.invalidCredentials'
                    )
                );
            } else {
                setError(
                    t(
                        'Components.Features.DeleteAccountPanel.errors.genericError'
                    )
                );
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full">
            <div className="p-6 third-gradient shadow-md rounded-xl">
                <h2 className="text-amber-50 text-base font-medium mb-2">
                    {t('Components.Features.DeleteAccountPanel.title')}
                </h2>
                <p className="text-amber-100 text-sm mb-4">
                    {t('Components.Features.DeleteAccountPanel.description')}
                </p>
                <Button
                    variant="destructive"
                    onClick={() => setShowModal(true)}
                    className="cursor-pointer"
                >
                    {t('Components.Features.DeleteAccountPanel.deleteButton')}
                </Button>
            </div>

            <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {t('Components.Features.DeleteAccountPanel.title')}
                        </DialogTitle>
                        <DialogDescription>
                            {t(
                                'Components.Features.DeleteAccountPanel.description'
                            )}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <Input
                            type="email"
                            placeholder={t(
                                'Components.Features.DeleteAccountPanel.email'
                            )}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            type="password"
                            placeholder={t(
                                'Components.Features.DeleteAccountPanel.password'
                            )}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Input
                            type="password"
                            placeholder={t(
                                'Components.Features.DeleteAccountPanel.confirmPassword'
                            )}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm mb-4">{error}</div>
                    )}

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setShowModal(false)}
                            className="cursor-pointer"
                            disabled={isLoading}
                        >
                            {t(
                                'Components.Features.DeleteAccountPanel.cancelButton'
                            )}
                        </Button>
                        <Button
                            variant="destructive"
                            className="cursor-pointer"
                            onClick={handleDeleteAccount}
                            disabled={isLoading}
                        >
                            {isLoading
                                ? t('General.sending')
                                : t(
                                      'Components.Features.DeleteAccountPanel.deleteButton'
                                  )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};
