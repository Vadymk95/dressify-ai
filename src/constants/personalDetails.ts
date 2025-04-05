import { HeightUnit, WeightUnit } from '@/types/user';

export const BODY_TYPES = {
    common: ['slim', 'athletic', 'average', 'curvy', 'muscular'],
    female: ['hourglass', 'pear', 'apple', 'rectangle', 'inverted_triangle'],
    male: ['trapezoid', 'triangle', 'oval']
} as const;

export const SKIN_TONES = [
    'fair',
    'light',
    'medium',
    'olive',
    'brown',
    'dark'
] as const;

export const HAIR_COLORS = [
    'black',
    'brown',
    'blonde',
    'red',
    'gray',
    'white',
    'other'
] as const;

export const EYE_COLORS = [
    'brown',
    'blue',
    'green',
    'hazel',
    'gray',
    'other'
] as const;

export const PREFERRED_COLORS = [
    'black',
    'white',
    'gray',
    'red',
    'blue',
    'green',
    'yellow',
    'purple',
    'pink',
    'orange',
    'brown',
    'beige'
] as const;

export const STYLE_PREFERENCES = [
    'casual',
    'formal',
    'business',
    'sporty',
    'romantic',
    'creative',
    'minimalist',
    'vintage',
    'streetwear'
] as const;

export const HEIGHT_UNITS: HeightUnit[] = ['cm', 'ft', 'in'];
export const WEIGHT_UNITS: WeightUnit[] = ['kg', 'lb'];
