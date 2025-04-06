import { CategoryId } from '@/types/user';

// Предопределенные категории гардероба
export const DEFAULT_CATEGORIES = [
    // Доступные категории для стандартного плана
    { id: 'tops', name: 'tops', items: [] },
    { id: 'bottoms', name: 'bottoms', items: [] },
    { id: 'dresses', name: 'dresses', items: [] },
    { id: 'outerwear', name: 'outerwear', items: [] },
    { id: 'shoes', name: 'shoes', items: [] },
    // Недоступные категории для стандартного плана
    { id: 'headwear', name: 'headwear', items: [] },
    { id: 'accessories', name: 'accessories', items: [] },
    { id: 'jewelry', name: 'jewelry', items: [] },
    { id: 'bags', name: 'bags', items: [] },
    { id: 'socks', name: 'socks', items: [] },
    { id: 'underwear', name: 'underwear', items: [] },
    { id: 'swimwear', name: 'swimwear', items: [] },
    { id: 'sportswear', name: 'sportswear', items: [] },
    { id: 'suits', name: 'suits', items: [] },
    { id: 'other', name: 'other', items: [] }
] as const;

export const STANDARD_PLAN_CATEGORIES: CategoryId[] = [
    'tops',
    'bottoms',
    'shoes',
    'outerwear',
    'dresses'
];

export const ITEMS_LIMIT_PER_CATEGORY = 2;
