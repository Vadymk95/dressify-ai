import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export const PersonalDetailsPanel: FC = () => {
    const { t } = useTranslation();

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold text-amber-50 text-center mb-4">
                {t('Components.Features.PersonalDetailsPanel.title')}
            </h2>

            <div className="flex flex-col items-start gap-2 mb-4 bg-gray-100 rounded-lg p-4">
                <div className="text-lg font-medium">
                    {t('Components.Features.PersonalDetailsPanel.gender')}
                </div>
                <RadioGroup
                    defaultValue="female"
                    className="flex flex-col gap-4"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">
                            {t(
                                'Components.Features.PersonalDetailsPanel.genderOptions.male'
                            )}
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">
                            {t(
                                'Components.Features.PersonalDetailsPanel.genderOptions.female'
                            )}
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">
                            {t(
                                'Components.Features.PersonalDetailsPanel.genderOptions.other'
                            )}
                        </Label>
                    </div>
                </RadioGroup>
            </div>

            <p className="text-sm italic mb-4 text-gray-100">
                * {t('Components.Features.PersonalDetailsPanel.optionalNote')}
            </p>

            <Accordion
                type="single"
                collapsible
                className="w-full bg-gray-100 px-6 rounded-lg"
            >
                <AccordionItem value="item-1">
                    <AccordionTrigger className="cursor-pointer">
                        {t(
                            'Components.Features.PersonalDetailsPanel.additionalInfo'
                        )}
                    </AccordionTrigger>
                    <AccordionContent>content</AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};
