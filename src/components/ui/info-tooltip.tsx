import { FC, ReactNode, useEffect, useState } from 'react';

import { MobileTooltip } from '@/components/ui/mobile-tooltip';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip';

import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface InfoTooltipProps {
    content: ReactNode;
    className?: string;
}

export const InfoTooltip: FC<InfoTooltipProps> = ({ content, className }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const trigger = (
        <FontAwesomeIcon
            icon={faCircleInfo}
            className="text-blue-400 hover:text-blue-300 transition-colors cursor-help text-xl"
        />
    );

    if (isMobile) {
        return (
            <MobileTooltip
                trigger={trigger}
                content={content}
                className={className}
            />
        );
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>{trigger}</TooltipTrigger>
                <TooltipContent className={className}>{content}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
