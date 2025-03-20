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
    const { register, handleSubmit } = useForm<LoginForm>();
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = (data: LoginForm) => {
        console.log(data); // Здесь будет логика авторизации
    };

    return (
        <div className="max-w-sm mx-auto py-12 px-6">
            <h2 className="text-2xl font-semibold text-center mb-6">
                {t('Pages.Login.title')}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                    placeholder={t('Pages.Login.email')}
                    {...register('email', { required: true })}
                />

                <div className="relative">
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder={t('Pages.Login.password')}
                        {...register('password', {
                            required: true,
                            minLength: 8
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

                <Button
                    type="submit"
                    className="w-full bg-red-500 hover:bg-red-600 text-white cursor-pointer"
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
