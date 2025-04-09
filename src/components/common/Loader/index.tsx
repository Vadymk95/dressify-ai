import { FC } from 'react';

export const Loader: FC = () => {
    return (
        <div
            className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/20
            bg-opacity-50
            backdrop-blur-sm
          "
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
