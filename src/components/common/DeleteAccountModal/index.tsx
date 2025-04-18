import { Eye, EyeOff } from 'lucide-react';
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
import { useDeleteAccountStore } from '@/store/deleteAccountStore';
import { useUserProfileStore } from '@/store/userProfileStore';

export const DeleteAccountModal: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { isOpen, closeModal } = useDeleteAccountStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const { deleteUser } = useAuthStore();
    const { clearProfile } = useUserProfileStore();

    const handleDeleteAccount = async () => {
        setError(null);

        if (!email) {
            setError(t('Pages.Register.errors.emailRequired'));
            return;
        }

        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            setError(t('Pages.Register.errors.invalidEmail'));
            return;
        }

        const currentUser = useAuthStore.getState().user;
        if (currentUser?.email !== email) {
            setError(
                t('Components.Features.DeleteAccountPanel.errors.emailMismatch')
            );
            return;
        }

        if (!password) {
            setError(t('Pages.Register.errors.passwordRequired'));
            return;
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            setError(t('Pages.Register.errors.passwordPattern'));
            return;
        }

        if (!confirmPassword) {
            setError(t('Pages.Register.errors.passwordRequired'));
            return;
        }

        if (password !== confirmPassword) {
            setError(t('Pages.Register.errors.passwordsMismatch'));
            return;
        }

        setIsLoading(true);

        try {
            await deleteUser(email, password);
            clearProfile();
            navigate(routes.home);
        } catch (error: any) {
            if (error.code === 'auth/invalid-credential') {
                setError(t('Pages.Login.errors.invalidCredentials'));
            } else if (error.code === 'auth/requires-recent-login') {
                setError(t('Pages.Login.errors.requiresRecentLogin'));
            } else {
                setError(t('Pages.Register.errors.genericError'));
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={closeModal}>
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
                    <div className="relative">
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder={t(
                                'Components.Features.DeleteAccountPanel.password'
                            )}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>
                    </div>
                    <div className="relative">
                        <Input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder={t(
                                'Components.Features.DeleteAccountPanel.confirmPassword'
                            )}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                        >
                            {showConfirmPassword ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="text-red-500 text-sm mb-4">{error}</div>
                )}

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={closeModal}
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
    );
};
