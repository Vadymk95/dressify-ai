import { Button } from '@/components/ui/button';
import { useOutfitRequest } from '@/hooks/useOutfitRequest';
import { useOutfitResponseStore } from '@/store/outfitResponseStore';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { TypeAnimation } from 'react-type-animation';

export const OutfitRequestPanel: FC = () => {
    const { t } = useTranslation();
    const { isLoading, showText, error, generateOutfit, hardcodedResponse } =
        useOutfitRequest();
    const { clearResponse } = useOutfitResponseStore();

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold text-center mb-2">
                {t('Components.Features.OutfitRequestPanel.title')}
            </h2>
            <p className="text-center mb-4">
                {t('Components.Features.OutfitRequestPanel.description')}
            </p>

            <div className="flex flex-col items-center gap-4 mb-6">
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-2 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                        onClick={generateOutfit}
                        disabled={isLoading}
                        className={`
                            w-full sm:w-auto px-4 sm:px-8 py-3 rounded-xl text-white font-semibold
                            shadow-lg transform transition-all duration-200
                            bg-gradient-to-r from-orange-400 to-red-400
                            hover:from-red-400 hover:to-orange-400
                            hover:scale-105 active:scale-95
                            disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                            cursor-pointer
                            ${isLoading ? 'animate-pulse' : ''}
                        `}
                    >
                        {isLoading
                            ? t(
                                  'Components.Features.OutfitRequestPanel.generating'
                              )
                            : showText
                              ? t(
                                    'Components.Features.OutfitRequestPanel.generateMore'
                                )
                              : t(
                                    'Components.Features.OutfitRequestPanel.generate'
                                )}
                    </Button>

                    {showText && (
                        <Button
                            onClick={clearResponse}
                            variant="outline"
                            className="w-full sm:w-auto px-4 sm:px-8 py-3 rounded-xl font-semibold cursor-pointer"
                        >
                            {t('Components.Features.OutfitRequestPanel.clear')}
                        </Button>
                    )}
                </div>
            </div>

            {isLoading && (
                <div className="flex justify-center mb-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-400"></div>
                </div>
            )}

            {showText && (
                <div className="bg-gradient-to-br from-amber-950/40 to-orange-900/40 backdrop-blur-sm p-8 rounded-2xl shadow-xl text-amber-50 break-words max-w-full overflow-hidden border border-amber-500/20">
                    <div className="prose prose-invert max-w-none whitespace-pre-wrap prose-p:text-amber-50/90">
                        <TypeAnimation
                            sequence={[hardcodedResponse]}
                            wrapper="div"
                            speed={75}
                            repeat={0}
                            cursor={false}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
