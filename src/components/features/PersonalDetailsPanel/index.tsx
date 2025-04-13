import { User } from 'lucide-react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { routes } from '@/router/routes';

interface PersonalDetailsPanelProps {
    isMinimalistic?: boolean;
}

export const PersonalDetailsPanel: FC<PersonalDetailsPanelProps> = ({
    isMinimalistic = false
}) => {
    const { t } = useTranslation();

    return (
        <section className="w-full h-full">
            <Link
                to={routes.personalDetails}
                className="group h-full p-6 flex flex-col items-center justify-center gap-4 secondary-gradient shadow-md rounded-xl cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out transform-gpu"
            >
                <div className="flex flex-col items-center gap-2">
                    <User
                        className={`text-amber-50 group-hover:text-amber-100 transition-colors duration-300 ${
                            isMinimalistic ? 'w-8 h-8' : 'w-12 h-12'
                        }`}
                    />
                    {!isMinimalistic && (
                        <span className="text-amber-50 text-base font-medium group-hover:text-amber-100 transition-colors duration-300">
                            {t(
                                'Components.Features.PersonalDetailsPanel.title'
                            )}
                        </span>
                    )}
                </div>
                {!isMinimalistic && (
                    <span className="text-amber-50/60 text-sm">
                        {t(
                            'Components.Features.PersonalDetailsPanel.description'
                        )}
                    </span>
                )}
            </Link>
        </section>
    );
};
