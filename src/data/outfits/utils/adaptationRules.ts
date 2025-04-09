export const adaptationRules = {
    // Физические характеристики
    height: {
        short: {
            add: {
                ru: 'вертикальные линии, структурированные вещи',
                en: 'vertical lines, structured pieces'
            },
            remove: {
                ru: 'объемные вещи, горизонтальные полосы',
                en: 'voluminous pieces, horizontal stripes'
            }
        },
        medium: {
            add: null,
            remove: null
        },
        tall: {
            add: {
                ru: 'структурированные вещи, правильная длина',
                en: 'structured pieces, proper length'
            },
            remove: {
                ru: 'укороченные вещи',
                en: 'cropped pieces'
            }
        }
    },

    weight: {
        thin: {
            add: {
                ru: 'структурированные вещи, четкие линии',
                en: 'structured pieces, clear lines'
            },
            remove: {
                ru: 'мешковатые вещи',
                en: 'baggy pieces'
            }
        },
        medium: {
            add: null,
            remove: null
        },
        heavy: {
            add: {
                ru: 'вертикальные линии, структурированные вещи',
                en: 'vertical lines, structured pieces'
            },
            remove: {
                ru: 'объемные вещи, горизонтальные полосы',
                en: 'voluminous pieces, horizontal stripes'
            }
        }
    },

    // Возрастные рекомендации
    age: {
        young: {
            range: { min: 18, max: 25 },
            add: {
                ru: 'молодежные акценты, современные тренды',
                en: 'youthful accents, modern trends'
            },
            remove: {
                ru: 'слишком строгие элементы',
                en: 'too formal elements'
            }
        },
        middle: {
            range: { min: 26, max: 40 },
            add: {
                ru: 'сбалансированный стиль, современные элементы',
                en: 'balanced style, modern elements'
            },
            remove: null
        },
        mature: {
            range: { min: 41, max: 60 },
            add: {
                ru: 'классические элементы, современный крой',
                en: 'classic elements, modern cut'
            },
            remove: {
                ru: 'слишком молодежные детали',
                en: 'too youthful details'
            }
        },
        senior: {
            range: { min: 61, max: 120 },
            add: {
                ru: 'комфортные вещи, современный стиль',
                en: 'comfortable pieces, modern style'
            },
            remove: {
                ru: 'неудобные элементы, сложные застежки',
                en: 'uncomfortable elements, complex fasteners'
            }
        }
    },

    // Погодные условия
    weather: {
        cold: {
            temperature: { max: 10 },
            add: {
                ru: 'теплое пальто, шарф, перчатки',
                en: 'warm coat, scarf, gloves'
            },
            remove: {
                ru: 'легкие элементы',
                en: 'light elements'
            }
        },
        cool: {
            temperature: { min: 11, max: 20 },
            add: {
                ru: 'легкая куртка, кардиган',
                en: 'light jacket, cardigan'
            },
            remove: null
        },
        warm: {
            temperature: { min: 21 },
            add: {
                ru: 'легкие ткани, открытые элементы',
                en: 'light fabrics, open elements'
            },
            remove: {
                ru: 'теплые вещи',
                en: 'warm pieces'
            }
        }
    }
};
