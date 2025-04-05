import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { usePerfectOutlookStore } from '@/store/perfectOutlookStore';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const PerfectOutlook: FC = () => {
    const { t } = useTranslation();
    const { isModalOpen, dontShowAgain, setIsModalOpen, setDontShowAgain } =
        usePerfectOutlookStore();

    useEffect(() => {
        if (!dontShowAgain) {
            setIsModalOpen(true);
        }
    }, [dontShowAgain, setIsModalOpen]);

    const handleClose = () => {
        setIsModalOpen(false);
    };

    const steps = [
        { id: 1, label: t('Components.Common.PerfectOutlook.steps.step1') },
        { id: 2, label: t('Components.Common.PerfectOutlook.steps.step2') },
        { id: 3, label: t('Components.Common.PerfectOutlook.steps.step3') },
        { id: 4, label: t('Components.Common.PerfectOutlook.steps.step4') }
    ];

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="w-[calc(100vw-32px)] md:max-w-3xl bg-amber-50 p-0 overflow-hidden max-h-[calc(100vh-32px)] flex flex-col">
                <DialogHeader className="p-6 main-gradient-reverse flex-shrink-0">
                    <DialogTitle className="text-2xl sm:text-3xl font-bold text-amber-50 text-center">
                        {t('Components.Common.PerfectOutlook.title')}
                    </DialogTitle>
                </DialogHeader>

                <div className="p-6 overflow-y-auto flex-1">
                    <ol className="flex flex-col md:flex-row md:justify-between flex-wrap gap-6 w-full min-h-min">
                        {steps.map((step, index) => (
                            <li
                                key={step.id}
                                className="flex md:flex-col items-center md:text-center gap-4 flex-1 basis-0 justify-start group bg-gray-200/90 backdrop-blur-sm rounded-2xl px-2 md:px-1 py-4 hover:bg-white/60 transition-all duration-200 border border-amber-100/20"
                            >
                                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full main-gradient-reverse text-amber-50 text-lg font-bold shadow-lg transform transition-transform group-hover:scale-110">
                                    {index + 1}
                                </div>
                                <span className="text-amber-900 font-medium text-lg min-h-[56px] flex items-center justify-center text-left md:text-center max-w-xs">
                                    {step.label}
                                </span>
                            </li>
                        ))}
                    </ol>

                    <div className="mt-8 flex items-center justify-center gap-4 third-gradient p-6 rounded-xl">
                        <div className="w-12 aspect-square bg-green-500 rounded-full flex items-center justify-center shrink-0">
                            <FontAwesomeIcon
                                className="h-6 w-6"
                                icon={faCheck}
                                color="#fef3c7"
                            />
                        </div>
                        <p className="text-amber-50 font-bold text-xl md:text-2xl">
                            {t('Components.Common.PerfectOutlook.yourOutfit')}
                        </p>
                    </div>
                </div>

                <DialogFooter className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/50 p-6 border-t border-amber-100 flex-shrink-0">
                    <div className="flex items-center space-x-3 bg-gradient-to-r from-amber-50/80 to-white/80 backdrop-blur-sm rounded-xl px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-200 border border-amber-100/50">
                        <Checkbox
                            id="dont-show-again"
                            checked={dontShowAgain}
                            className="border-amber-200 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                            onCheckedChange={(checked) =>
                                setDontShowAgain(checked as boolean)
                            }
                        />
                        <label
                            htmlFor="dont-show-again"
                            className="text-sm font-medium text-amber-900 cursor-pointer hover:text-amber-700 transition-colors select-none"
                        >
                            {t(
                                'Components.Common.PerfectOutlook.dontShowAgain'
                            )}
                        </label>
                    </div>
                    <Button
                        onClick={handleClose}
                        className="bg-gradient-to-r from-orange-400 to-red-400 hover:from-red-400 hover:to-orange-400 text-white font-semibold px-8 py-2 rounded-xl transform transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                    >
                        {t('Components.Common.PerfectOutlook.close')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
