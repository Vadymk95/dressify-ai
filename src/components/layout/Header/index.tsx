import { FC } from 'react';

import { AuthNavigation, Logo } from '@/components/common';

export const Header: FC = () => {
    return (
        <header className="sticky top-0 z-50 shadow-md py-4 px-8 flex justify-between items-center">
            <div>
                <Logo />
            </div>

            <div className="flex items-center gap-4">
                <AuthNavigation />
            </div>
        </header>
    );
};
