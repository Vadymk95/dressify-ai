import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { routes } from '@/router/routes';

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type LoginForm = {
    email: string;
    password: string;
};

const Login: FC = () => {
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors
    } = useForm<LoginForm>();

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = (data: LoginForm) => {
        clearErrors();

        // Эмуляция запроса на сервер
        fakeLoginRequest(data)
            .then(() => {
                console.log('Success login');
            })
            .catch(() => {
                setError('root', {
                    type: 'server',
                    message: t('Pages.Login.errors.invalidCredentials')
                });
            });
    };

    // фейковый запрос для демонстрации
    const fakeLoginRequest = ({ email, password }: LoginForm) =>
        new Promise((resolve, reject) => {
            if (email === 'user@example.com' && password === 'password123') {
                resolve('ok');
            } else {
                reject('Invalid credentials');
            }
        });

    return (
        <div className="max-w-md mx-auto py-12 px-6">
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
                                message: t('Pages.Login.errors.invalidEmail')
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
                            <FontAwesomeIcon
                                icon={showPassword ? faEye : faEyeSlash}
                            />
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

                <Button
                    type="submit"
                    className="w-full bg-red-500 hover:bg-red-600 text-white cursor-pointer py-5"
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
    );
};

export default Login;
