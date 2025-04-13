import { Eye, EyeOff } from 'lucide-react';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import { Loader } from '@/components/common/Loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { routes } from '@/router/routes';
import { useAuthStore } from '@/store/authStore';

type LoginForm = {
    email: string;
    password: string;
};

const Login: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { login, loading, error, clearError } = useAuthStore();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginForm>();

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data: LoginForm) => {
        const success = await login(data.email, data.password);

        if (success) {
            navigate(routes.whatToWear);
        }
    };

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
                    {t('Pages.Login.title')}
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Input
                            className="bg-gray-100 py-5"
                            placeholder={t('Pages.Login.email')}
                            {...register('email', {
                                required: t('Pages.Login.errors.emailRequired'),
                                pattern: {
                                    value: /^\S+@\S+\.\S+$/,
                                    message: t(
                                        'Pages.Login.errors.invalidEmail'
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
                                placeholder={t('Pages.Login.password')}
                                {...register('password', {
                                    required: t(
                                        'Pages.Login.errors.passwordRequired'
                                    ),
                                    minLength: {
                                        value: 8,
                                        message: t(
                                            'Pages.Login.errors.passwordMinLength'
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

                    {errors.root && (
                        <p className="text-sm text-red-500 text-center">
                            {errors.root.message}
                        </p>
                    )}

                    {error && (
                        <p className="text-sm text-red-500 mt-1">{error}</p>
                    )}

                    <Button
                        type="submit"
                        className="w-full bg-red-500 hover:bg-red-600 text-amber-50 cursor-pointer py-5"
                    >
                        {t('Pages.Login.title')}
                    </Button>

                    <div className="text-center text-sm">
                        {t('Pages.Login.noAccount')}{' '}
                        <Link
                            to={routes.register}
                            className="text-red-500 hover:underline"
                        >
                            {t('Pages.Login.register')}
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;
