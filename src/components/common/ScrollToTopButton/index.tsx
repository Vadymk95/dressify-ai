import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { FC, useEffect, useState } from 'react';

export const ScrollToTopButton: FC = () => {
    const [showButton, setShowButton] = useState(false);
    const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>(
        'down'
    );

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollPercentage =
                (scrollPosition / (documentHeight - windowHeight)) * 100;

            const isAtBottom =
                documentHeight - (scrollPosition + windowHeight) < 10;

            setShowButton(scrollPosition > 100 && !isAtBottom);
            setScrollDirection(scrollPercentage > 50 ? 'up' : 'down');
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = () => {
        if (scrollDirection === 'up') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    if (!showButton) return null;

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={handleClick}
            className="fixed bottom-8 right-8 z-50 third-gradient backdrop-blur-sm hover:bg-white shadow-lg p-4 w-12 h-12 cursor-pointer"
        >
            {scrollDirection === 'up' ? (
                <ArrowUp className="h-8 w-8 text-white" />
            ) : (
                <ArrowDown className="h-8 w-8 text-white" />
            )}
        </Button>
    );
};
