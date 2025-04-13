import { ArrowLeft, Plus, Save, X } from 'lucide-react';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { GoToHomeButton } from '@/components/common/GoToHomeButton';
import { Loader } from '@/components/common/Loader';
import { WardrobeCheckbox } from '@/components/features/WardrobeCheckbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { auth } from '@/firebase/firebaseConfig';
import { useWardrobe } from '@/hooks/useWardrobe';
import { routes } from '@/router/routes';
import { useUserProfileStore } from '@/store/userProfileStore';
import { Wardrobe } from '@/types/user';

const WardrobePage: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const { profile, updateWardrobe, subscribeToUserProfile } =
        useUserProfileStore();
    const [wardrobeError, setWardrobeError] = useState<string | null>(null);

    const {
        sortedCategories,
        categoryStates,
        newItemInputs,
        loading,
        error,
        localError,
        hasChanges,
        isSaving,
        isStandardPlan,
        handleInputChange,
        handleAddItem,
        handleRemoveItem,
        handleSave,
        getErrorMessage,
        setLocalWardrobe
    } = useWardrobe();

    const totalItems = sortedCategories.reduce(
        (sum, category) => sum + category.items.length,
        0
    );

    useEffect(() => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const unsubscribe = subscribeToUserProfile(currentUser.uid);
            return () => unsubscribe();
        }
    }, [subscribeToUserProfile]);

    useEffect(() => {
        if (wardrobeError) {
            const timer = setTimeout(() => setWardrobeError(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [wardrobeError]);

    const handleBack = () => {
        if (hasChanges) {
            setShowConfirmModal(true);
        } else {
            navigate(routes.whatToWear);
        }
    };

    const handleConfirmLeave = () => {
        setShowConfirmModal(false);
        navigate(-1);
    };

    const handleSaveClick = async () => {
        if (!hasChanges) {
            navigate(routes.whatToWear);
            return;
        }

        const hadItemsInStore = profile?.wardrobe?.categories.some(
            (category) => category.items.length > 0
        );

        if (
            (hadItemsInStore && totalItems === 0) ||
            (!hadItemsInStore && totalItems > 0)
        ) {
            if (profile?.wardrobe) {
                const updatedWardrobe: Wardrobe = {
                    ...profile.wardrobe,
                    useWardrobeForOutfits: totalItems > 0
                };
                await updateWardrobe(updatedWardrobe);
            }
            setLocalWardrobe((prev) => ({
                ...prev,
                useWardrobeForOutfits: totalItems > 0
            }));
            const success = await handleSave();
            if (success) {
                navigate(routes.whatToWear);
            }
            return;
        }

        setShowSaveModal(true);
    };

    const handleSaveAndNavigate = async () => {
        const success = await handleSave();
        if (success) {
            setShowSaveModal(false);
            navigate(routes.whatToWear);
        }
    };

    const renderSaveButton = () => (
        <div className="flex items-center">
            {isSaving ? (
                <>
                    <Loader />
                    <span className="ml-2">{t('Pages.Wardrobe.saving')}</span>
                </>
            ) : (
                <>
                    <Save className="h-4 w-4 mr-2" />
                    <span>{t('Pages.Wardrobe.saveChanges')}</span>
                </>
            )}
        </div>
    );

    const renderConfirmModal = () => (
        <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {t('Pages.Wardrobe.unsavedChangesTitle')}
                    </DialogTitle>
                    <DialogDescription>
                        {t('Pages.Wardrobe.unsavedChangesDescription')}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setShowConfirmModal(false)}
                        className="cursor-pointer"
                    >
                        {t('General.cancel')}
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleConfirmLeave}
                        className="cursor-pointer"
                    >
                        {t('General.leave')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );

    const renderSaveModal = () => (
        <Dialog open={showSaveModal} onOpenChange={setShowSaveModal}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t('Pages.Wardrobe.saveChanges')}</DialogTitle>
                    <DialogDescription>
                        {t('Pages.Wardrobe.saveChangesDescription')}
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <WardrobeCheckbox preventPropagation variant="dark" />
                </div>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setShowSaveModal(false)}
                        className="cursor-pointer"
                    >
                        {t('General.cancel')}
                    </Button>
                    <Button
                        onClick={handleSaveAndNavigate}
                        className="cursor-pointer bg-red-500 hover:bg-red-600 text-white"
                    >
                        {t('General.save')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );

    return (
        <div className="w-full flex-1 mx-auto p-4 fourth-gradient">
            {loading && <Loader />}
            <div className="w-full flex-1 max-w-4xl mx-auto flex flex-col items-center">
                <div className="flex items-center mb-6">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleBack}
                        className="mr-2 text-amber-800 hover:text-orange-500 hover:bg-transparent cursor-pointer"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <h1 className="text-3xl font-bold text-amber-800">
                        {t('Pages.Wardrobe.title')}
                    </h1>
                </div>

                {(error || localError || wardrobeError) && (
                    <div className="mb-6 p-3 bg-red-100 text-red-800 rounded-md text-center">
                        {getErrorMessage(
                            wardrobeError || localError || error || ''
                        )}
                    </div>
                )}

                {isStandardPlan && (
                    <p className="text-orange-500 italic mb-6">
                        {t('Pages.Wardrobe.standardPlanLimits')}
                    </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 w-full">
                    {sortedCategories.map((category) => {
                        const { isAvailable, isLimitReached } =
                            categoryStates[category.id];

                        return (
                            <div
                                key={category.id}
                                className={`bg-white p-4 rounded-lg shadow-md border border-amber-100 hover:shadow-lg transition-shadow ${
                                    !isAvailable ? 'opacity-50' : ''
                                }`}
                            >
                                <h2 className="text-xl font-semibold text-amber-800 mb-4">
                                    {t(
                                        `Pages.Wardrobe.categories.${category.name}`
                                    )}
                                </h2>

                                {!isAvailable && (
                                    <div className="mb-4 text-sm text-amber-600 italic">
                                        {t(
                                            'Pages.Wardrobe.categoryNotAvailable'
                                        )}
                                    </div>
                                )}

                                {isLimitReached && isAvailable && (
                                    <div className="mb-4 text-sm text-amber-600 italic">
                                        {t('Pages.Wardrobe.itemLimitReached')}
                                    </div>
                                )}

                                <div className="flex items-center space-x-2 mb-4">
                                    <Input
                                        type="text"
                                        placeholder={t(
                                            'Pages.Wardrobe.addItemPlaceholder'
                                        )}
                                        value={newItemInputs[category.id] || ''}
                                        onChange={(e) =>
                                            handleInputChange(
                                                category.id,
                                                e.target.value
                                            )
                                        }
                                        disabled={
                                            !isAvailable || isLimitReached
                                        }
                                        className="flex-1 bg-amber-50 border-amber-200 text-amber-900 placeholder:text-amber-400 focus:border-amber-300 focus:ring-amber-300 disabled:opacity-50"
                                    />
                                    <Button
                                        size="icon"
                                        onClick={() =>
                                            handleAddItem(category.id)
                                        }
                                        disabled={
                                            !isAvailable ||
                                            isLimitReached ||
                                            !newItemInputs[
                                                category.id
                                            ]?.trim() ||
                                            newItemInputs[category.id]?.trim()
                                                .length < 2
                                        }
                                        className={`${
                                            !isAvailable ||
                                            isLimitReached ||
                                            !newItemInputs[
                                                category.id
                                            ]?.trim() ||
                                            newItemInputs[category.id]?.trim()
                                                .length < 2
                                                ? 'bg-gray-400'
                                                : 'bg-amber-600 hover:bg-amber-700'
                                        } text-white cursor-pointer`}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {category.items.length > 0 ? (
                                        category.items.map((item) => (
                                            <Badge
                                                key={item.id}
                                                variant="secondary"
                                                className={`${
                                                    item.isNew
                                                        ? 'bg-green-100 text-green-800 border border-green-200'
                                                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                                                } flex items-start gap-1 break-words whitespace-normal`}
                                            >
                                                <span className="break-words">
                                                    {item.name}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        handleRemoveItem(
                                                            category.id,
                                                            item.id
                                                        )
                                                    }
                                                    className={`ml-1 mt-1 ${
                                                        item.isNew
                                                            ? 'text-green-600 hover:text-red-500'
                                                            : 'text-amber-600 hover:text-red-500'
                                                    } cursor-pointer`}
                                                    disabled={!isAvailable}
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </Badge>
                                        ))
                                    ) : (
                                        <p className="text-amber-600 text-sm">
                                            {t('Pages.Wardrobe.noItems')}
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-8 flex justify-center">
                    <Button
                        onClick={handleSaveClick}
                        disabled={isSaving || !hasChanges}
                        className={`${
                            hasChanges
                                ? 'bg-amber-600 hover:bg-amber-700'
                                : 'bg-gray-400 hover:bg-gray-500'
                        } text-white px-6 py-2 cursor-pointer`}
                    >
                        {renderSaveButton()}
                    </Button>
                </div>

                {renderConfirmModal()}
                {renderSaveModal()}

                <div className="flex justify-center mt-8 mb-4 w-full">
                    <GoToHomeButton variant="third" />
                </div>
            </div>
        </div>
    );
};

export default WardrobePage;
