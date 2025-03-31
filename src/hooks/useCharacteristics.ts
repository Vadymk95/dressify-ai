import { useCharacteristicsStore } from '@/store/characteristicsStore';

export const useCharacteristics = () => {
    const characteristics = useCharacteristicsStore(
        (state) => state.characteristics
    );
    const updateCharacteristics = useCharacteristicsStore(
        (state) => state.updateCharacteristics
    );

    return {
        characteristics,
        updateCharacteristics
    };
};
