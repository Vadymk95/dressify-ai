import { Input } from '@/components/ui/input';
import { FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../ui/button';

interface CaptchaProps {
    onVerify: (isValid: boolean) => void;
}

export const Captcha: FC<CaptchaProps> = ({ onVerify }) => {
    const { t } = useTranslation();
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [answer, setAnswer] = useState('');
    const [isValid, setIsValid] = useState(false);

    const generateNewCaptcha = useCallback(() => {
        const newNum1 = Math.floor(Math.random() * 10);
        const newNum2 = Math.floor(Math.random() * 10);
        setNum1(newNum1);
        setNum2(newNum2);
        setAnswer('');
        setIsValid(false);
        onVerify(false);
    }, [onVerify]);

    const handleAnswerChange = (value: string) => {
        setAnswer(value);
        const correctAnswer = num1 + num2;
        const isValid = parseInt(value) === correctAnswer;
        setIsValid(isValid);
        onVerify(isValid);
    };

    useEffect(() => {
        generateNewCaptcha();
    }, [generateNewCaptcha]);

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
                <span className="text-lg">
                    {num1} + {num2} = ?
                </span>
                <Button
                    type="button"
                    onClick={generateNewCaptcha}
                    variant="link"
                    className="text-sm text-blue-500 hover:text-blue-700 cursor-pointer"
                >
                    {t('Components.Common.Captcha.new')}
                </Button>
            </div>
            <Input
                type="number"
                value={answer}
                onChange={(e) => handleAnswerChange(e.target.value)}
                placeholder={t('Components.Common.Captcha.placeholder')}
                className={isValid ? 'border-green-500' : ''}
            />
        </div>
    );
};
