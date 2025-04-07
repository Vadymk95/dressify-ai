import { BaseOutfit } from '@/data/outfits/outfitGenerator';

export const baseOutfits: BaseOutfit[] = [
    // Мужские образы
    {
        id: 'male-casual-1',
        gender: 'male',
        event: 'casualFriends',
        coreItems: {
            top: {
                ru: 'футболка',
                en: 't-shirt'
            },
            bottom: {
                ru: 'джинсы',
                en: 'jeans'
            },
            shoes: {
                ru: 'кроссовки',
                en: 'sneakers'
            },
            accessories: {
                ru: ['часы', 'ремень'],
                en: ['watch', 'belt']
            }
        },
        baseDescription: {
            ru: 'Повседневный образ: джинсы, футболка, кроссовки',
            en: 'Casual look: jeans, t-shirt, sneakers'
        }
    },
    {
        id: 'male-casual-2',
        gender: 'male',
        event: 'casualFriends',
        coreItems: {
            top: {
                ru: 'свитшот',
                en: 'sweatshirt'
            },
            bottom: {
                ru: 'чинос',
                en: 'chinos'
            },
            shoes: {
                ru: 'кроссовки',
                en: 'sneakers'
            },
            accessories: {
                ru: ['часы', 'кепка'],
                en: ['watch', 'cap']
            }
        },
        baseDescription: {
            ru: 'Повседневный образ: чинос, свитшот, кроссовки',
            en: 'Casual look: chinos, sweatshirt, sneakers'
        }
    },
    {
        id: 'male-office-1',
        gender: 'male',
        event: 'workOffice',
        coreItems: {
            top: {
                ru: 'рубашка',
                en: 'shirt'
            },
            bottom: {
                ru: 'брюки',
                en: 'trousers'
            },
            shoes: {
                ru: 'туфли',
                en: 'shoes'
            },
            accessories: {
                ru: ['галстук', 'часы'],
                en: ['tie', 'watch']
            }
        },
        baseDescription: {
            ru: 'Офисный образ: брюки, рубашка, туфли',
            en: 'Office look: trousers, shirt, shoes'
        }
    },
    {
        id: 'male-office-2',
        gender: 'male',
        event: 'workOffice',
        coreItems: {
            top: {
                ru: 'рубашка',
                en: 'shirt'
            },
            bottom: {
                ru: 'брюки чинос',
                en: 'chinos'
            },
            shoes: {
                ru: 'лоферы',
                en: 'loafers'
            },
            accessories: {
                ru: ['часы', 'портфель'],
                en: ['watch', 'briefcase']
            }
        },
        baseDescription: {
            ru: 'Офисный образ: чинос, рубашка, лоферы',
            en: 'Office look: chinos, shirt, loafers'
        }
    },
    {
        id: 'male-date-1',
        gender: 'male',
        event: 'dateNight',
        coreItems: {
            top: {
                ru: 'рубашка',
                en: 'shirt'
            },
            bottom: {
                ru: 'брюки чинос',
                en: 'chinos'
            },
            shoes: {
                ru: 'лоферы',
                en: 'loafers'
            },
            accessories: {
                ru: ['часы', 'парфюм'],
                en: ['watch', 'perfume']
            }
        },
        baseDescription: {
            ru: 'Образ для свидания: чинос, рубашка, лоферы',
            en: 'Date night look: chinos, shirt, loafers'
        }
    },
    {
        id: 'male-date-2',
        gender: 'male',
        event: 'dateNight',
        coreItems: {
            top: {
                ru: 'свитер',
                en: 'sweater'
            },
            bottom: {
                ru: 'брюки',
                en: 'trousers'
            },
            shoes: {
                ru: 'туфли',
                en: 'shoes'
            },
            accessories: {
                ru: ['часы', 'парфюм'],
                en: ['watch', 'perfume']
            }
        },
        baseDescription: {
            ru: 'Образ для свидания: брюки, свитер, туфли',
            en: 'Date night look: trousers, sweater, shoes'
        }
    },
    {
        id: 'male-shopping-1',
        gender: 'male',
        event: 'shopping',
        coreItems: {
            top: {
                ru: 'свитшот',
                en: 'sweatshirt'
            },
            bottom: {
                ru: 'джинсы',
                en: 'jeans'
            },
            shoes: {
                ru: 'кроссовки',
                en: 'sneakers'
            },
            accessories: {
                ru: ['рюкзак', 'часы'],
                en: ['backpack', 'watch']
            }
        },
        baseDescription: {
            ru: 'Образ для шоппинга: джинсы, свитшот, кроссовки',
            en: 'Shopping look: jeans, sweatshirt, sneakers'
        }
    },

    // Женские образы
    {
        id: 'female-casual-1',
        gender: 'female',
        event: 'casualFriends',
        coreItems: {
            top: {
                ru: 'футболка',
                en: 't-shirt'
            },
            bottom: {
                ru: 'джинсы',
                en: 'jeans'
            },
            shoes: {
                ru: 'кроссовки',
                en: 'sneakers'
            },
            accessories: {
                ru: ['сумка', 'часы'],
                en: ['bag', 'watch']
            }
        },
        baseDescription: {
            ru: 'Повседневный образ: джинсы, футболка, кроссовки',
            en: 'Casual look: jeans, t-shirt, sneakers'
        }
    },
    {
        id: 'female-casual-2',
        gender: 'female',
        event: 'casualFriends',
        coreItems: {
            top: {
                ru: 'блузка',
                en: 'blouse'
            },
            bottom: {
                ru: 'юбка',
                en: 'skirt'
            },
            shoes: {
                ru: 'балетки',
                en: 'flats'
            },
            accessories: {
                ru: ['сумка', 'часы'],
                en: ['bag', 'watch']
            }
        },
        baseDescription: {
            ru: 'Повседневный образ: юбка, блузка, балетки',
            en: 'Casual look: skirt, blouse, flats'
        }
    },
    {
        id: 'female-office-1',
        gender: 'female',
        event: 'workOffice',
        coreItems: {
            top: {
                ru: 'блузка',
                en: 'blouse'
            },
            bottom: {
                ru: 'брюки',
                en: 'trousers'
            },
            shoes: {
                ru: 'туфли',
                en: 'shoes'
            },
            accessories: {
                ru: ['сумка', 'часы'],
                en: ['bag', 'watch']
            }
        },
        baseDescription: {
            ru: 'Офисный образ: брюки, блузка, туфли',
            en: 'Office look: trousers, blouse, shoes'
        }
    },
    {
        id: 'female-office-2',
        gender: 'female',
        event: 'workOffice',
        coreItems: {
            top: {
                ru: 'блузка',
                en: 'blouse'
            },
            bottom: {
                ru: 'юбка-карандаш',
                en: 'pencil skirt'
            },
            shoes: {
                ru: 'туфли на каблуке',
                en: 'heels'
            },
            accessories: {
                ru: ['сумка', 'часы'],
                en: ['bag', 'watch']
            }
        },
        baseDescription: {
            ru: 'Офисный образ: юбка-карандаш, блузка, туфли на каблуке',
            en: 'Office look: pencil skirt, blouse, heels'
        }
    },
    {
        id: 'female-date-1',
        gender: 'female',
        event: 'dateNight',
        coreItems: {
            top: {
                ru: 'платье',
                en: 'dress'
            },
            bottom: {
                ru: '', // Пустое поле, так как используется платье
                en: ''
            },
            shoes: {
                ru: 'туфли на каблуке',
                en: 'heels'
            },
            accessories: {
                ru: ['клатч', 'украшения'],
                en: ['clutch', 'jewelry']
            }
        },
        baseDescription: {
            ru: 'Образ для свидания: платье, туфли на каблуке',
            en: 'Date night look: dress, heels'
        }
    },
    {
        id: 'female-date-2',
        gender: 'female',
        event: 'dateNight',
        coreItems: {
            top: {
                ru: 'блузка',
                en: 'blouse'
            },
            bottom: {
                ru: 'юбка',
                en: 'skirt'
            },
            shoes: {
                ru: 'туфли на каблуке',
                en: 'heels'
            },
            accessories: {
                ru: ['клатч', 'украшения'],
                en: ['clutch', 'jewelry']
            }
        },
        baseDescription: {
            ru: 'Образ для свидания: юбка, блузка, туфли на каблуке',
            en: 'Date night look: skirt, blouse, heels'
        }
    },
    {
        id: 'female-shopping-1',
        gender: 'female',
        event: 'shopping',
        coreItems: {
            top: {
                ru: 'свитшот',
                en: 'sweatshirt'
            },
            bottom: {
                ru: 'джинсы',
                en: 'jeans'
            },
            shoes: {
                ru: 'кроссовки',
                en: 'sneakers'
            },
            accessories: {
                ru: ['сумка', 'солнцезащитные очки'],
                en: ['bag', 'sunglasses']
            }
        },
        baseDescription: {
            ru: 'Образ для шоппинга: джинсы, свитшот, кроссовки',
            en: 'Shopping look: jeans, sweatshirt, sneakers'
        }
    }
];
