import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useCookieConsentStore } from '@/store/cookieConsentStore.js';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const CookieBanner = () => {
    const { t } = useTranslation();
    const [showCustomize, setShowCustomize] = useState(false);
    const { consent, updateConsent } = useCookieConsentStore();

    const [settings, setSettings] = useState({
        essential: true, // Всегда true
        functional: consent?.functional || false,
        analytics: consent?.analytics || false,
        marketing: consent?.marketing || false
    });

    if (consent?.hasConsent) {
        return null;
    }

    const handleAcceptAll = () => {
        updateConsent({
            hasConsent: true,
            essential: true,
            functional: true,
            analytics: true,
            marketing: true
        });
    };

    const handleEssentialOnly = () => {
        updateConsent({
            hasConsent: true,
            essential: true,
            functional: false,
            analytics: false,
            marketing: false
        });
    };

    const handleSaveSettings = () => {
        updateConsent({
            ...settings,
            hasConsent: true,
            essential: true
        });
        setShowCustomize(false);
    };

    return (
        <>
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-600 md:max-w-2xl">
                        {t('Components.Common.CookieBanner.description')}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-end">
                        <Button
                            variant="outline"
                            onClick={() => setShowCustomize(true)}
                            className="cursor-pointer"
                        >
                            {t('Components.Common.CookieBanner.customize')}
                        </Button>
                        <Button
                            variant="outline"
                            onClick={handleEssentialOnly}
                            className="cursor-pointer"
                        >
                            {t('Components.Common.CookieBanner.essentialOnly')}
                        </Button>
                        <Button
                            className="secondary-gradient cursor-pointer"
                            onClick={handleAcceptAll}
                        >
                            {t('Components.Common.CookieBanner.acceptAll')}
                        </Button>
                    </div>
                </div>
            </div>

            <Dialog open={showCustomize} onOpenChange={setShowCustomize}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {t('Components.Common.CookieBanner.customize')}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>
                                    {t(
                                        'Components.Common.CookieBanner.essential'
                                    )}
                                </Label>
                                <p className="text-sm text-gray-500">
                                    {t(
                                        'Components.Common.CookieBanner.essentialDesc'
                                    )}
                                </p>
                            </div>
                            <Switch checked disabled />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>
                                    {t(
                                        'Components.Common.CookieBanner.functional'
                                    )}
                                </Label>
                                <p className="text-sm text-gray-500">
                                    {t(
                                        'Components.Common.CookieBanner.functionalDesc'
                                    )}
                                </p>
                            </div>
                            <Switch
                                checked={settings.functional}
                                onCheckedChange={(checked) =>
                                    setSettings((prev) => ({
                                        ...prev,
                                        functional: checked
                                    }))
                                }
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>
                                    {t(
                                        'Components.Common.CookieBanner.analytics'
                                    )}
                                </Label>
                                <p className="text-sm text-gray-500">
                                    {t(
                                        'Components.Common.CookieBanner.analyticsDesc'
                                    )}
                                </p>
                            </div>
                            <Switch
                                checked={settings.analytics}
                                onCheckedChange={(checked) =>
                                    setSettings((prev) => ({
                                        ...prev,
                                        analytics: checked
                                    }))
                                }
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>
                                    {t(
                                        'Components.Common.CookieBanner.marketing'
                                    )}
                                </Label>
                                <p className="text-sm text-gray-500">
                                    {t(
                                        'Components.Common.CookieBanner.marketingDesc'
                                    )}
                                </p>
                            </div>
                            <Switch
                                checked={settings.marketing}
                                onCheckedChange={(checked) =>
                                    setSettings((prev) => ({
                                        ...prev,
                                        marketing: checked
                                    }))
                                }
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setShowCustomize(false)}
                            className="cursor-pointer"
                        >
                            {t('Components.Common.CookieBanner.cancel')}
                        </Button>
                        <Button
                            className="secondary-gradient cursor-pointer"
                            onClick={handleSaveSettings}
                        >
                            {t('Components.Common.CookieBanner.save')}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};
