import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { TypeAnimation } from 'react-type-animation';

import { Button } from '@/components/ui/button';
import { InfoTooltip } from '@/components/ui/info-tooltip';
import { useOutfitRequest } from '@/hooks/useOutfitRequest';
import { useWeatherStore } from '@/store/weatherStore';

const OutfitRequestPanelContent: FC = () => {
    const { t } = useTranslation();
    const { loadingWeather } = useWeatherStore();
    const {
        isLoading,
        showText,
        error,
        generateAiOutfit,
        generateStandardOutfit,
        aiResponse,
        standardResponse,
        clearResponses,
        isFreePlan,
        remainingRequests,
        requestsResetAt,
        isEmailVerified
    } = useOutfitRequest();

    return (
        <div className="w-full relative min-h-[200px]">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/5 backdrop-blur-sm z-10 rounded-lg">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-400"></div>
                </div>
            )}

            <h2 className="text-2xl font-bold text-center mb-2">
                {t('Components.Features.OutfitRequestPanel.title')}
            </h2>
            <p className="text-center mb-4">
                {t('Components.Features.OutfitRequestPanel.description')}
            </p>

            <div className="flex flex-col items-center gap-4">
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
                        disabled={
                            isLoading || isFreePlan || remainingRequests <= 0
                        }
                        className={`
                            w-full sm:w-auto px-4 sm:px-8 py-3 rounded-xl text-white font-semibold
                            shadow-lg transform transition-all duration-200
                            bg-gradient-to-r from-orange-400 to-red-400
                            hover:from-red-400 hover:to-orange-400
                            hover:scale-105 active:scale-95
                            disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                            cursor-pointer
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

                    <div className="flex items-center gap-2">
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
                        <InfoTooltip
                            content={
                                <div className="py-8 px-4 mx-2 sm:mx-0 max-w-[calc(100vw-2rem)] sm:max-w-md bg-gradient-to-br from-amber-50/95 to-orange-50/95 border border-amber-200/50 text-amber-900 rounded-xl shadow-lg backdrop-blur-sm">
                                    <p className="font-semibold mb-2 text-amber-800">
                                        {t(
                                            'Components.Features.OutfitRequestPanel.tooltip.title'
                                        )}
                                    </p>
                                    <p className="text-amber-700">
                                        {t(
                                            'Components.Features.OutfitRequestPanel.tooltip.requirements.weather'
                                        )}
                                    </p>
                                    <p className="mt-2 text-amber-700">
                                        {t(
                                            'Components.Features.OutfitRequestPanel.tooltip.requirements.basicInfo'
                                        )}
                                    </p>
                                    <p className="text-amber-700">
                                        {t(
                                            'Components.Features.OutfitRequestPanel.tooltip.requirements.gender'
                                        )}
                                    </p>
                                    <p className="text-amber-700">
                                        {t(
                                            'Components.Features.OutfitRequestPanel.tooltip.requirements.height'
                                        )}
                                    </p>
                                    <p className="text-amber-700">
                                        {t(
                                            'Components.Features.OutfitRequestPanel.tooltip.requirements.weight'
                                        )}
                                    </p>
                                    <p className="text-amber-700">
                                        {t(
                                            'Components.Features.OutfitRequestPanel.tooltip.requirements.age'
                                        )}
                                    </p>
                                    <p className="mt-2 text-amber-700">
                                        {t(
                                            'Components.Features.OutfitRequestPanel.tooltip.requirements.event'
                                        )}
                                    </p>
                                    <pre className="mt-1 whitespace-pre-wrap text-amber-700">
                                        {t(
                                            'Components.Features.OutfitRequestPanel.tooltip.requirements.eventTypes'
                                        )}
                                    </pre>
                                </div>
                            }
                        />
                    </div>

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

            {!isLoading && loadingWeather && (
                <div className="text-center text-amber-500 mb-4">
                    {t('Components.Features.OutfitRequestPanel.loadingWeather')}
                </div>
            )}

            {showText && (
                <div className="bg-gradient-to-br from-amber-950/40 to-orange-900/40 backdrop-blur-sm p-8 mt-6 rounded-2xl shadow-xl text-amber-50 break-words max-w-full overflow-hidden border border-amber-500/20">
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

export default OutfitRequestPanelContent;
