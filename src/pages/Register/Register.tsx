import { Eye, EyeOff } from 'lucide-react';
import { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import { Captcha } from '@/components/common/Captcha';
import { Loader } from '@/components/common/Loader';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { routes } from '@/router/routes';
import { useAuthStore } from '@/store/authStore';

interface RegisterForm {
    email: string;
    password: string;
    confirmPassword: string;
    agree: boolean;
}

const Register: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const {
        register: registerUser,
        loading,
        error,
        clearError
    } = useAuthStore();
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors }
    } = useForm<RegisterForm>({
        mode: 'onBlur'
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isCaptchaValid, setIsCaptchaValid] = useState(false);

    const onSubmit = async (data: RegisterForm) => {
        if (data.password !== data.confirmPassword) return;
        if (!isCaptchaValid) return;

        const success = await registerUser(data.email, data.password);

        if (success) {
            navigate(routes.whatToWear);
        }
    };

    const password = watch('password');

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => clearError(), 3000);
            return () => clearTimeout(timer);
        }
    }, [error, clearError]);

    return (
        <>
            {loading && <Loader />}
            <div className="max-w-lg mx-auto py-12 px-6 w-full">
                <h2 className="text-2xl font-semibold text-center mb-6">
                    {t('Pages.Register.title')}
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Input
                            className="bg-gray-100 py-5"
                            placeholder={t('Pages.Register.email')}
                            {...register('email', {
                                required: t(
                                    'Pages.Register.errors.emailRequired'
                                ),
                                pattern: {
                                    value: /^\S+@\S+\.\S+$/,
                                    message: t(
                                        'Pages.Register.errors.invalidEmail'
                                    )
                                }
                            })}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <div className="relative">
                            <Input
                                className="bg-gray-100 py-5"
                                type={showPassword ? 'text' : 'password'}
                                placeholder={t('Pages.Register.password')}
                                {...register('password', {
                                    required: t(
                                        'Pages.Register.errors.passwordRequired'
                                    ),
                                    minLength: {
                                        value: 8,
                                        message: t(
                                            'Pages.Register.errors.passwordMinLength'
                                        )
                                    },
                                    pattern: {
                                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                        message: t(
                                            'Pages.Register.errors.passwordPattern'
                                        )
                                    }
                                })}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? (
                                    <Eye size={20} />
                                ) : (
                                    <EyeOff size={20} />
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <div className="relative">
                            <Input
                                className="bg-gray-100 py-5"
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder={t(
                                    'Pages.Register.confirmPassword'
                                )}
                                {...register('confirmPassword', {
                                    validate: (value) =>
                                        value === password ||
                                        t(
                                            'Pages.Register.errors.passwordsMismatch'
                                        )
                                })}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                onClick={() =>
                                    setShowConfirmPassword((prev) => !prev)
                                }
                            >
                                {showConfirmPassword ? (
                                    <Eye size={20} />
                                ) : (
                                    <EyeOff size={20} />
                                )}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Captcha onVerify={setIsCaptchaValid} />
                    </div>

                    <Controller
                        control={control}
                        name="agree"
                        rules={{
                            required: t('Pages.Register.errors.agreeRequired')
                        }}
                        render={({ field }) => (
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="agree"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                                <label htmlFor="agree" className="text-sm">
                                    {t('Pages.Register.text1')}{' '}
                                    <a
                                        href={routes.privacyPolicy}
                                        target="_blank"
                                        className="text-red-500 hover:underline"
                                    >
                                        {t('Pages.Register.text2')}
                                    </a>{' '}
                                    {t('Pages.Register.text3')}{' '}
                                    <a
                                        href={routes.termsOfUse}
                                        target="_blank"
                                        className="text-red-500 hover:underline"
                                    >
                                        {t('Pages.Register.text4')}
                                    </a>
                                </label>
                            </div>
                        )}
                    />
                    {errors.agree && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.agree.message}
                        </p>
                    )}

                    {error && (
                        <p className="text-sm text-red-500 mt-1">{error}</p>
                    )}

                    <Button
                        type="submit"
                        className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-300 py-5 text-amber-50"
                        disabled={loading || !isCaptchaValid}
                    >
                        {loading
                            ? t('General.sending')
                            : t('Pages.Register.title')}
                    </Button>

                    <div className="text-center text-sm">
                        {t('Pages.Register.haveAccount')}{' '}
                        <Link
                            to={routes.login}
                            className="text-red-500 hover:underline"
                        >
                            {t('Pages.Register.login')}
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Register;
