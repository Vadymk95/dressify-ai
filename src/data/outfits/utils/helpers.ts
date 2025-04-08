import { baseOutfits } from '@/data/outfits/data/baseOutfits';
import { OutfitRequest } from '@/data/outfits/types';

import { BaseOutfit } from '@/data/outfits/types';

export const getRandomItems = (arr: string[], count: number = 1): string[] => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

export const filterClothing = (
    items: string[],
    filters: { exclude?: string[]; include?: string[] }
): string[] => {
    return items.filter((item) => {
        const shouldExclude = filters.exclude?.some((exclude) =>
            item.toLowerCase().includes(exclude.toLowerCase())
        );
        const shouldInclude =
            !filters.include ||
            filters.include.some((include) =>
                item.toLowerCase().includes(include.toLowerCase())
            );
        return !shouldExclude && shouldInclude;
    });
};

export function findMatchingOutfit(request: OutfitRequest): BaseOutfit | null {
    // Фильтруем образы по полу и типу события
    const matchingOutfits = baseOutfits.filter(
        (outfit: BaseOutfit) =>
            outfit.gender === request.characteristics.gender &&
            outfit.event === request.event.type
    );

    if (matchingOutfits.length === 0) {
        return null;
    }

    // Случайный выбор из подходящих образов
    const randomIndex = Math.floor(Math.random() * matchingOutfits.length);
    return matchingOutfits[randomIndex];
}
