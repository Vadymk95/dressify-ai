import { FC } from 'react';
import { Link } from 'react-router-dom';

import { routes } from '@/router/routes';
export const WardrobePanel: FC = () => {
    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold text-amber-50 text-center">
                Your Wardrobe
            </h2>

            <div className="flex items-center justify-center">
                <Link to={routes.wardrobe} className="text-amber-50">
                    open your Wardrobe
                </Link>
            </div>
        </div>
    );
};
