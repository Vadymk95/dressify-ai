import { Button } from '@/components/ui/button';
import { useOutfitRequest } from '@/hooks/useOutfitRequest';
import { useOutfitResponseStore } from '@/store/outfitResponseStore';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { TypeAnimation } from 'react-type-animation';

export const OutfitRequestPanel: FC = () => {
    const { t } = useTranslation();
    const {
        isLoading,
        showText,
        error,
        generateAiOutfit,
        generateStandardOutfit,
        aiResponse,
        standardResponse,
        isFreePlan,
        remainingRequests,
        requestsResetAt,
        isEmailVerified
    } = useOutfitRequest();
    const { clearResponses } = useOutfitResponseStore();

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

                {!isFreePlan ? (
                    <div className="text-sm text-amber-600">
                        {t(
                            'Components.Features.OutfitRequestPanel.remainingRequests',
                            {
                                count: remainingRequests
                            }
                        )}
                        {remainingRequests === 0 && requestsResetAt && (
                            <div className="mt-1 text-xs text-amber-500">
                                {t(
                                    'Components.Features.OutfitRequestPanel.nextRequestsAt',
                                    {
                                        time: new Date(
                                            requestsResetAt
                                        ).toLocaleTimeString('ru-RU', {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })
                                    }
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-sm text-amber-500 italic">
                        {t(
                            'Components.Features.OutfitRequestPanel.freePlanNote'
                        )}
                    </p>
                )}

                {!isEmailVerified && (
                    <p className="text-sm text-amber-500 italic">
                        {t(
                            'Components.Features.OutfitRequestPanel.verifyEmailNote'
                        )}
                    </p>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                        onClick={generateAiOutfit}
                        disabled={isLoading || isFreePlan}
                        className={`
                            w-full sm:w-auto px-4 sm:px-8 py-3 rounded-xl text-white font-semibold
                            shadow-lg transform transition-all duration-200
                            bg-gradient-to-r from-orange-400 to-red-400
                            hover:from-red-400 hover:to-orange-400
                            hover:scale-105 active:scale-95
                            disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                            cursor-pointer
                            ${isLoading && !standardResponse ? 'animate-pulse' : ''}
                        `}
                    >
                        {isLoading && !standardResponse
                            ? t(
                                  'Components.Features.OutfitRequestPanel.generating'
                              )
                            : aiResponse
                              ? t(
                                    'Components.Features.OutfitRequestPanel.generateMoreAi'
                                )
                              : t(
                                    'Components.Features.OutfitRequestPanel.generateAi'
                                )}
                    </Button>

                    <Button
                        onClick={generateStandardOutfit}
                        disabled={isLoading || !isEmailVerified}
                        className={`
                            w-full sm:w-auto px-4 sm:px-8 py-3 rounded-xl text-white font-semibold
                            shadow-lg transform transition-all duration-200
                            bg-gradient-to-r from-amber-400 to-yellow-400
                            hover:from-yellow-400 hover:to-amber-400
                            hover:scale-105 active:scale-95
                            disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                            cursor-pointer
                            ${isLoading && !aiResponse ? 'animate-pulse' : ''}
                        `}
                    >
                        {isLoading && !aiResponse
                            ? t(
                                  'Components.Features.OutfitRequestPanel.generating'
                              )
                            : standardResponse
                              ? t(
                                    'Components.Features.OutfitRequestPanel.generateMoreStandard'
                                )
                              : t(
                                    'Components.Features.OutfitRequestPanel.generateStandard'
                                )}
                    </Button>

                    {showText && (
                        <Button
                            onClick={clearResponses}
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
                            key={standardResponse || aiResponse}
                            sequence={[standardResponse || aiResponse || '']}
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
