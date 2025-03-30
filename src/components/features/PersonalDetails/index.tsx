import { FC } from 'react';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion';

export const PersonalDetails: FC = () => {
    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold text-amber-50 text-center">
                Personal Details
            </h2>
            <div className="mb-4 text-amber-50">
                <div>gender</div>
            </div>

            <Accordion
                type="single"
                collapsible
                className="w-full bg-gray-100 px-6 rounded-lg"
            >
                <AccordionItem value="item-1">
                    <AccordionTrigger className="cursor-pointer">
                        open content
                    </AccordionTrigger>
                    <AccordionContent>content</AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};
