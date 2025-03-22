import { Button } from '@/components/ui/button';
import { FC } from 'react';

// Описываем интерфейс пропсов
interface PlanCardProps {
    title: string;
    price: string;
    oldPrice?: string;
    save?: string;
    features: string[];
    cta: string;
    isActive: boolean;
    ribbonText?: string;
    onClick?: () => void;
}

export const PlanCard: FC<PlanCardProps> = ({
    title,
    price,
    oldPrice,
    save,
    features,
    cta,
    isActive,
    ribbonText,
    onClick
}) => {
    return (
        <div
            className={[
                'relative border p-6 rounded-xl flex flex-col text-center shadow-sm h-full',
                isActive ? 'border-2 border-red-500' : ''
            ].join(' ')}
        >
            {/* Если есть ribbonText, показываем ленту */}
            {ribbonText && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-red-400 to-orange-400 text-white text-xs px-3 py-1 transform rotate-45 translate-x-8 shadow rounded-3xl">
                    {ribbonText}
                </div>
            )}

            <h2 className="text-xl font-semibold mb-2">{title}</h2>

            {/* Если есть старая цена, показываем её зачёркнутой */}
            {oldPrice ? (
                <div className="flex flex-col items-center mb-1">
                    <span className="line-through text-gray-400 text-xl mb-1">
                        {oldPrice}
                    </span>
                    <p className="text-3xl font-bold">{price}</p>
                </div>
            ) : (
                <p className="text-3xl font-bold mb-4">{price}</p>
            )}

            {/* Если есть save (экономия), показываем под ценой */}
            {save && <p className="text-sm text-gray-500 mb-4">{save}</p>}

            <ul className="mb-4 text-gray-600 space-y-1 grow">
                {features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                ))}
            </ul>

            <Button
                className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition hover:scale-105 cursor-pointer"
                onClick={onClick}
                disabled={isActive}
            >
                {cta}
            </Button>
        </div>
    );
};
