import { FC, useEffect, useRef } from 'react';

export const Loader: FC = () => {
    const cleanupRef = useRef<(() => void) | null>(null);

    useEffect(() => {
        // Сохраняем функцию очистки
        cleanupRef.current = () => {
            document.body.classList.remove('overflow-hidden');
            document.documentElement.classList.remove('overflow-hidden');
            document.body.classList.remove('h-screen');
            document.body.classList.remove('w-screen');
        };

        document.body.classList.add('overflow-hidden');
        document.documentElement.classList.add('overflow-hidden');
        document.body.classList.add('h-screen');
        document.body.classList.add('w-screen');

        return () => {
            if (cleanupRef.current) {
                cleanupRef.current();
            }
        };
    }, []);

    // Добавляем обработчик для очистки при размонтировании
    useEffect(() => {
        return () => {
            if (cleanupRef.current) {
                cleanupRef.current();
            }
        };
    }, []);

    return (
        <div
            className="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            bg-black/20
            bg-opacity-50
            backdrop-blur-sm
            overflow-hidden
          "
            style={{ touchAction: 'none' }}
        >
            <div
                className="
              w-16
              h-16
              border-4
              border-red-400
              border-solid
              rounded-full
              animate-spin
            "
                style={{ borderTopColor: '#fb923c' }}
            />
        </div>
    );
};
