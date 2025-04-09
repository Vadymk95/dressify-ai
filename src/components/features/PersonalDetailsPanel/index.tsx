import { User } from 'lucide-react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const PersonalDetailsPanel: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <section
            className="group w-full max-w-[200px] mx-auto p-4 flex flex-col items-center secondary-gradient shadow-md rounded-xl cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out transform-gpu"
            onClick={() => navigate('/personal-details')}
        >
            <div className="flex items-center gap-2 mb-2">
                <User className="w-6 h-6 text-amber-50 group-hover:text-amber-100 transition-colors duration-300" />
                <span className="text-amber-50 font-medium group-hover:text-amber-100 transition-colors duration-300">
                    {t('Components.Features.PersonalDetailsPanel.title')}
                </span>
            </div>
            <span className="text-amber-50/80 text-sm text-center">
                {t('Components.Features.PersonalDetailsPanel.description')}
            </span>
        </section>
    );
};
