import { FC } from 'react';

import { AuthNavigation, Logo } from '@/components/common';
import { LanguageSelect } from '@/components/features/LanguageSelect';

export const Header: FC = () => {
    return (
        <header className="sticky top-0 z-50 shadow-md py-4 px-4 md:px-8 main-bg">
            <div className="max-w-5xl mx-auto flex justify-between items-center h-[36px]">
                <Logo />

                <div className="flex items-center gap-6 md:gap-4">
                    <AuthNavigation />
                    <LanguageSelect />
                </div>
            </div>
        </header>
    );
};
