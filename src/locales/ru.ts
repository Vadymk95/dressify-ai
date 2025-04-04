import { ru_codes } from '@/locales/countries/ru_codes';

export const ru = {
    ru: {
        translation: {
            Components: {
                Common: {
                    AuthNavigation: {
                        login: 'Войти',
                        register: 'Регистрация',
                        logout: 'Выйти'
                    },
                    EmailVerification: {
                        checkStatus: 'Проверить статус',
                        verified: 'Email подтвержден!',
                        notReceived: 'Не получили письмо?',
                        resend: 'Отправить повторно',
                        resendCountdown:
                            'Отправка повторно через {{seconds}} с',
                        info: 'Пожалуйста, проверьте почту и перейдите по ссылке для подтверждения.',
                        useFullFunctionality:
                            'Если вы хотите использовать весь функционал приложения, пожалуйста, подтвердите email.',
                        notVerified: 'Email не подтвержден',
                        genericError:
                            'Произошла ошибка при проверке статуса. Попробуйте позже.'
                    },
                    WeatherWidget: {
                        loading: 'Загрузка погоды...',
                        currentWeather: 'Текущая погода:',
                        tomorrowWeather: 'Погода на завтра (в это же время):',
                        feelsLike: 'Ощущается как: ',
                        errors: {
                            fetchWeatherError:
                                'Ошибка получения погоды. Попробуйте позже.'
                        }
                    },
                    PerfectOutlook: {
                        title: '🚀 Всего 4 шага до твоего идеального образа',
                        steps: {
                            step1: 'Выбери город, чтобы узнать погоду',
                            step2: 'Расскажи немного о себе',
                            step3: 'Добавь вещи в свой гардероб',
                            step4: 'Выбери событие или повод'
                        },
                        yourOutfit: 'Твой идеальный образ готов!'
                    }
                },
                Features: {
                    Feedback: {
                        title: 'Помогите нам стать лучше!',
                        placeholder: 'Оставьте ваш отзыв здесь...',
                        send: 'Отправить отзыв',
                        sending: 'Отправка...',
                        errors: {
                            messageRequired: 'Текст отзыва обязателен',
                            messageSendingError:
                                'Ошибка отправки отзыва. Попробуйте позже.'
                        },
                        successMessage: 'Отзыв успешно отправлен!'
                    },
                    WeatherPanel: {
                        title: 'Обзор погоды',
                        selectYourLocation: 'Выберите ваше местоположение',
                        selectCountry: 'Выберите страну...',
                        selectCity: 'Выберите город...',
                        noCountryFound: 'Страна не найдена',
                        noCityFound: 'Город не найден',
                        fetchWeather: 'Получить текущую погоду',
                        fetchTomorrow: 'Получить погоду на завтра',
                        errors: {
                            fetchCitiesError:
                                'Ошибка получения городов. Попробуйте позже.'
                        }
                    },
                    PersonalDetailsPanel: {
                        title: 'Личные данные',
                        gender: 'Пол:',
                        genderOptions: {
                            male: 'Мужской',
                            female: 'Женский',
                            other: 'Другой'
                        },
                        optionalNote:
                            'Дополнительная информация необязательна, но она помогает нам делать более точные рекомендации образов',
                        additionalInfo: 'Дополнительная информация',
                        characteristics: {
                            height: 'Рост',
                            heightPlaceholder: 'Введите рост',
                            weight: 'Вес',
                            weightPlaceholder: 'Введите вес',
                            bodyType: 'Тип фигуры',
                            age: 'Возраст',
                            agePlaceholder: 'Введите возраст',
                            skinTone: 'Цвет кожи',
                            hairColor: 'Цвет волос',
                            eyeColor: 'Цвет глаз',
                            preferredColors: 'Предпочитаемые цвета',
                            stylePreference: 'Предпочитаемый стиль',
                            units: {
                                cm: 'см',
                                kg: 'кг',
                                years: 'лет',
                                lb: 'фунт',
                                ft: 'фут',
                                in: 'дюйм'
                            },
                            bodyTypes: {
                                // Common body types
                                slim: 'Стройный',
                                athletic: 'Атлетический',
                                average: 'Средний',
                                curvy: 'Фигуристый',
                                muscular: 'Мускулистый',
                                // Female body types
                                hourglass: 'Песочные часы',
                                pear: 'Груша',
                                apple: 'Яблоко',
                                rectangle: 'Прямоугольник',
                                inverted_triangle: 'Перевёрнутый треугольник',
                                // Male body types
                                trapezoid: 'Трапеция',
                                triangle: 'Треугольник',
                                oval: 'Овал'
                            },
                            skinTones: {
                                fair: 'Очень светлый',
                                light: 'Светлый',
                                medium: 'Средний',
                                olive: 'Оливковый',
                                brown: 'Смуглый',
                                dark: 'Тёмный'
                            },
                            hairColors: {
                                black: 'Чёрный',
                                brown: 'Коричневый',
                                blonde: 'Светлый',
                                red: 'Рыжий',
                                gray: 'Седой',
                                white: 'Белый',
                                other: 'Другой'
                            },
                            eyeColors: {
                                brown: 'Карий',
                                blue: 'Голубой',
                                green: 'Зелёный',
                                hazel: 'Ореховый',
                                gray: 'Серый',
                                other: 'Другой'
                            },
                            colors: {
                                black: 'Чёрный',
                                white: 'Белый',
                                gray: 'Серый',
                                red: 'Красный',
                                blue: 'Синий',
                                green: 'Зелёный',
                                yellow: 'Жёлтый',
                                purple: 'Фиолетовый',
                                pink: 'Розовый',
                                orange: 'Оранжевый',
                                brown: 'Коричневый',
                                beige: 'Бежевый'
                            },
                            styles: {
                                casual: 'Повседневный',
                                formal: 'Формальный',
                                business: 'Деловой',
                                sporty: 'Спортивный',
                                romantic: 'Романтический',
                                creative: 'Креативный',
                                minimalist: 'Минималистичный',
                                vintage: 'Винтажный',
                                streetwear: 'Уличный'
                            }
                        },
                        search: 'Поиск...',
                        noResults: 'Ничего не найдено',
                        save: 'Сохранить изменения',
                        validation: {
                            height: 'Рост должен быть от 100 до 250 см',
                            weight: 'Вес должен быть от 30 до 250 кг',
                            age: 'Возраст должен быть от 13 до 120 лет'
                        },
                        errors: {
                            userNotAuthorized: 'Пользователь не авторизован',
                            unknownError: 'Произошла неизвестная ошибка',
                            networkError:
                                'Ошибка сети. Пожалуйста, проверьте подключение',
                            saveFailed: 'Не удалось сохранить изменения'
                        }
                    },
                    WardrobePanel: {
                        title: 'Ваш гардероб',
                        openWardrobe: 'Открыть гардероб',
                        itemCount: 'Всего предметов: {{count}}',
                        useWardrobeForOutfits:
                            'Использовать гардероб для подбора образов'
                    },
                    EventPanel: {
                        title: 'Выберите событие',
                        description:
                            'Выберите тип мероприятия, чтобы мы могли подобрать подходящий наряд',
                        selectEvent: 'Выберите тип события',
                        noEventFound: 'События не найдены',
                        types: {
                            businessMeeting: 'Деловая встреча',
                            interview: 'Собеседование',
                            wedding: 'Свадьба',
                            dateNight: 'Свидание',
                            restaurant: 'Ресторан',
                            theater: 'Театр',
                            clubbing: 'Клуб/Вечеринка',
                            graduation: 'Выпускной/Вручение диплома',
                            conference: 'Конференция',
                            casualWalk: 'Прогулка по городу',
                            shopping: 'Шоппинг',
                            concert: 'Концерт',
                            exhibition: 'Выставка/Музей',
                            birthday: 'День рождения',
                            cocktailParty: 'Коктейльная вечеринка',
                            beachDay: 'Пляжный отдых',
                            sportEvent: 'Спортивное мероприятие',
                            casualFriends: 'Встреча с друзьями',
                            workOffice: 'Офисный день',
                            familyGathering: 'Семейное торжество',
                            onlineMeeting: 'Онлайн-встреча',
                            webinar: 'Вебинар',
                            onlineInterview: 'Онлайн-собеседование',
                            videoConference: 'Видеоконференция'
                        }
                    },
                    OutfitRequestPanel: {
                        title: 'Создать образ',
                        description:
                            'На основе всех выбранных параметров мы создадим идеальный образ для вас',
                        generate: 'Создать образ',
                        generateMore: 'Создать другой образ',
                        generating: 'Создаём образ...',
                        errors: {
                            noEventType: 'Пожалуйста, выберите тип мероприятия',
                            noLocation:
                                'Пожалуйста, укажите ваше местоположение',
                            noGender: 'Пожалуйста, укажите ваш пол',
                            generic: 'Произошла ошибка при генерации образа'
                        }
                    }
                },
                Layout: {
                    Header: {
                        pricing: 'Тарифы'
                    },
                    Footer: {
                        privacy: 'Политика конфиденциальности',
                        terms: 'Условия использования',
                        contact: 'Связаться с нами',
                        copyright: 'Все права защищены.'
                    }
                }
            },
            Pages: {
                Home: {
                    title: 'Что надеть сегодня?',
                    description:
                        'Получай ежедневные рекомендации одежды с учетом твоей погоды и гардероба.',
                    tryForFree: 'Попробовать бесплатно',
                    advantages: {
                        title: 'Преимущества',
                        title1: '⚡️ Быстро и просто',
                        description1:
                            'Перестань тратить время утром на выбор одежды.',
                        title2: '👗 Персональные советы',
                        description2:
                            'Индивидуальные рекомендации под твой гардероб и погоду.',
                        title3: '🤖 AI-технологии',
                        description3:
                            'Современные алгоритмы подбирают образ за считанные секунды.'
                    },
                    howDoesItWorks: {
                        title: 'Как это работает?',
                        title1: '📍 Определяем твою погоду автоматически по геолокации или вручную.',
                        title2: '👕 Добавляешь свою одежду (не обязательно, но точнее рекомендации).',
                        title3: '🚀 Получаешь ежедневные советы от нашего AI-ассистента.'
                    },
                    ctaBlock: {
                        cta: 'Начать прямо сейчас',
                        description: 'Бесплатная регистрация за 1 минуту'
                    },
                    hookBlock: {
                        title: 'Почему попробовать нас?',
                        title1: '☀️ Утреннее спокойствие',
                        description1:
                            'Забудьте о хаосе выбора каждое утро. Наш сервис избавляет от утреннего стресса, позволяя вам начинать день уверенно.',
                        title2: '⏰ Экономия времени',
                        description2:
                            'Сэкономьте драгоценные утренние минуты для действительно важных дел. Ваш идеальный образ уже готов!',
                        title3: '😎 Персональный стиль',
                        description3:
                            'Получайте рекомендации, идеально подобранные под ваш гардероб и погоду. Это не просто образ — это ваш уникальный стиль.'
                    },
                    meta: {
                        title: 'DressifyAI – AI-подбор одежды',
                        description:
                            'Персонализированные рекомендации одежды по погоде, возрасту, полу и типу события.'
                    }
                },
                NotFound: {
                    title: '404 Страница не найдена',
                    description: 'Страница, которую вы ищете, не существует.'
                },
                PrivacyPolicy: {
                    title: 'Политика конфиденциальности',
                    intro: 'Мы уважаем вашу конфиденциальность и не передаём личные данные третьим лицам.',
                    data: {
                        title: 'Какие данные мы собираем',
                        description:
                            'Ваше местоположение, возраст, пол и предпочтения для точных рекомендаций одежды.'
                    },
                    security: {
                        title: 'Безопасность данных',
                        description:
                            'Ваши данные надежно хранятся и никогда не передаются без вашего согласия.'
                    }
                },
                TermsOfUse: {
                    title: 'Условия использования',
                    intro: 'Используя наше приложение, вы соглашаетесь с условиями ниже.',
                    usage: {
                        title: 'Правила использования',
                        description:
                            'Вы соглашаетесь предоставлять точную информацию для персонализированных рекомендаций.'
                    },
                    responsibility: {
                        title: 'Наша ответственность',
                        description:
                            'Мы не несём ответственности за неточные рекомендации одежды при неверных данных пользователя.'
                    }
                },
                ContactUs: {
                    title: 'Связаться с нами',
                    descriptionAuth:
                        'Есть вопросы или предложения? Оставьте сообщение ниже, и мы вскоре вам ответим.',
                    descriptionNonAuth:
                        'Есть вопросы или предложения? Пришлите сообщение на этот Email, и мы вскоре вам ответим.'
                },
                Login: {
                    title: 'Войти',
                    email: 'Email',
                    password: 'Пароль',
                    register: 'Зарегистрироваться',
                    noAccount: 'Нет аккаунта?',
                    errors: {
                        emailRequired: 'Укажите электронную почту',
                        invalidEmail: 'Некорректный формат электронной почты',
                        passwordRequired: 'Введите пароль',
                        passwordMinLength:
                            'Пароль должен быть не менее 8 символов',
                        invalidCredentials: 'Неверный логин или пароль',
                        genericError: 'Произошла ошибка. Попробуйте позже.'
                    }
                },
                Register: {
                    title: 'Регистрация',
                    email: 'Email',
                    password: 'Пароль',
                    confirmPassword: 'Подтвердите пароль',
                    text1: 'Я согласен с ',
                    text2: 'Политикой конфиденциальности',
                    text3: ' и ',
                    text4: 'Условиями использования',
                    haveAccount: 'Уже есть аккаунт?',
                    login: 'Войти',
                    errors: {
                        invalidApiKey:
                            'Неверный API ключ. Проверьте конфигурацию.',
                        emailAlreadyInUse: 'Этот email уже используется.',
                        genericError: 'Произошла ошибка. Попробуйте позже.',
                        emailRequired: 'Укажите электронную почту',
                        invalidEmail: 'Некорректный формат электронной почты',
                        passwordRequired: 'Введите пароль',
                        passwordMinLength:
                            'Пароль должен быть не менее 8 символов',
                        passwordPattern:
                            'Пароль должен содержать буквы и цифры',
                        passwordsMismatch: 'Пароли не совпадают',
                        agreeRequired:
                            'Вы должны принять условия Политики конфиденциальности и Условия использования'
                    }
                },
                Pricing: {
                    title: 'Выберите план',
                    subtitle: 'Найдите идеальный план для своих нужд.',
                    errors: {
                        stripeLoadFailed:
                            'Не удалось загрузить платежную систему',
                        invalidPlan: 'Выбранный план недоступен',
                        checkoutFailed: 'Ошибка при оформлении платежа',
                        generic: 'Произошла ошибка при обработке платежа',
                        noEmail:
                            'Для оформления подписки необходимо подтвердить email'
                    },
                    plans: {
                        free: {
                            title: 'Бесплатно',
                            price: '0 $ / месяц',
                            feature1:
                                'Просмотр погоды в разных городах и странах',
                            feature2: 'Только базовые возможности',
                            cta: 'Базовый'
                        },
                        monthly: {
                            title: 'Стандарт',
                            price: '3 $ / месяц',
                            feature1:
                                'Все функции Бесплатного плана + подбор одежды на основе ИИ',
                            feature2: 'Персональные настройки для гардероба',
                            cta: 'Выбрать план',
                            currentPlan: 'Текущий план'
                        },
                        semiAnnual: {
                            title: 'Самое выгодное',
                            oldPrice: '18 $',
                            price: '15 $ / 6 месяцев',
                            save: 'Вы экономите 3 $',
                            feature1: 'Все функции Стандарта на 6 месяцев',
                            feature2: 'Единовременная оплата со скидкой',
                            cta: 'Выбрать план',
                            ribbon: 'Выгодно',
                            currentPlan: 'Текущий план'
                        }
                    }
                },
                WhatToWear: {
                    title: 'Давай подберём твой идеальный образ!'
                },
                Wardrobe: {
                    title: 'Мой гардероб',
                    addItemPlaceholder: 'Введите название предмета',
                    noItems: 'Нет предметов',
                    saveChanges: 'Сохранить изменения',
                    saving: 'Сохранение...',
                    categories: {
                        headwear: 'Головные уборы',
                        tops: 'Футболки и рубашки',
                        bottoms: 'Брюки и юбки',
                        dresses: 'Платья',
                        outerwear: 'Верхняя одежда',
                        shoes: 'Обувь',
                        accessories: 'Аксессуары',
                        jewelry: 'Украшения',
                        bags: 'Сумки',
                        socks: 'Носки',
                        underwear: 'Нижнее белье',
                        swimwear: 'Купальники',
                        sportswear: 'Спортивная одежда',
                        suits: 'Костюмы',
                        other: 'Другое'
                    }
                },
                SuccessPayment: {
                    title: 'Платеж успешно выполнен',
                    description: 'Спасибо за ваш заказ!',
                    goToHome: 'Перейти на главную'
                },
                FailedPayment: {
                    title: 'Платеж не выполнен',
                    description: 'Пожалуйста, попробуйте ещё раз.',
                    goToHome: 'Перейти на главную'
                }
            },
            General: {
                brandName: 'DressifyAI',
                goBack: 'Назад',
                sending: 'Отправка...'
            },
            ...ru_codes
        }
    }
};
