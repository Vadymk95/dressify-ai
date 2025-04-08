export const deduplicateAccessories = (accessories: string[]): string[] => {
    const result: string[] = [];
    const lowercased: string[] = [];

    // Список слов, которые могут пересекаться
    const similarItems: Record<string, string[]> = {
        рюкзак: ['сумка', 'рюкзак или сумка', 'сумка через плечо'],
        сумка: ['рюкзак', 'рюкзак или сумка', 'сумка через плечо'],
        'сумка через плечо': ['сумка', 'рюкзак', 'рюкзак или сумка'],
        шапка: ['теплая шапка', 'головной убор'],
        перчатки: ['теплые перчатки'],
        шарф: ['теплый шарф', 'утепленный шарф'],
        backpack: ['bag', 'backpack or bag', 'crossbody bag'],
        bag: ['backpack', 'backpack or bag', 'crossbody bag'],
        'crossbody bag': ['bag', 'backpack', 'backpack or bag'],
        hat: ['warm hat', 'headwear'],
        gloves: ['warm gloves'],
        scarf: ['warm scarf', 'insulated scarf']
    };

    // Приоритетные аксессуары, которые сохраняются вместо более общих
    const priorities: Record<string, string[]> = {
        'сумка через плечо': ['сумка'],
        'crossbody bag': ['bag']
    };

    // Проверяем наличие приоритетных аксессуаров
    const hasPriorityItems = new Map<string, string>();
    for (const acc of accessories) {
        const lowerAcc = acc.toLowerCase();

        for (const [priority, general] of Object.entries(priorities)) {
            if (lowerAcc === priority.toLowerCase()) {
                for (const gen of general) {
                    hasPriorityItems.set(gen.toLowerCase(), priority);
                }
            }
        }
    }

    // Проверяем каждый аксессуар
    for (const acc of accessories) {
        const lowerAcc = acc.toLowerCase();

        // Проверяем, не является ли этот аксессуар менее приоритетным
        let isLowPriority = false;
        for (const general of hasPriorityItems.keys()) {
            if (lowerAcc === general) {
                isLowPriority = true;
                break;
            }
        }

        if (isLowPriority) {
            continue;
        }

        // Проверяем, не содержится ли уже этот аксессуар или похожий
        let isDuplicate = false;

        // Проверяем точные дубликаты
        if (lowercased.includes(lowerAcc)) {
            isDuplicate = true;
        } else {
            // Проверяем похожие элементы
            for (const [key, synonyms] of Object.entries(similarItems)) {
                if (lowerAcc.includes(key.toLowerCase())) {
                    // Проверяем, есть ли уже синонимы в результате
                    for (const synonym of synonyms) {
                        if (
                            lowercased.some((item) =>
                                item.includes(synonym.toLowerCase())
                            )
                        ) {
                            isDuplicate = true;
                            break;
                        }
                    }
                }

                if (isDuplicate) break;
            }
        }

        if (!isDuplicate) {
            result.push(acc);
            lowercased.push(lowerAcc);
        }
    }

    return result;
};
