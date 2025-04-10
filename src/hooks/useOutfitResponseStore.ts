import { useEffect, useState } from 'react';

type StoreType = {
    aiResponse: string | null;
    setAiResponse: (response: string | null) => void;
};

export const useOutfitResponseStore = () => {
    const [store, setStore] = useState<StoreType | null>(null);

    useEffect(() => {
        let mounted = true;
        const loadStore = async () => {
            const module = await import('@/store/outfitResponseStore');
            if (mounted) {
                const storeInstance = module.useOutfitResponseStore.getState();
                setStore({
                    aiResponse: storeInstance.aiResponse,
                    setAiResponse: (response: string | null) =>
                        module.useOutfitResponseStore.setState({
                            aiResponse: response
                        })
                });
            }
        };

        loadStore();

        return () => {
            mounted = false;
        };
    }, []);

    return store;
};
