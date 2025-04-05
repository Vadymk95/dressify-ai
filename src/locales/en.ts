import { en_codes } from '@/locales/countries/en_codes';

export const en = {
    en: {
        translation: {
            Components: {
                Common: {
                    AuthNavigation: {
                        login: 'Sign In',
                        register: 'Sign Up',
                        logout: 'Sign Out'
                    },
                    EmailVerification: {
                        checkStatus: 'Check Status',
                        verified: 'Email verified!',
                        notReceived: "Didn't receive the email?",
                        resend: 'Resend Email',
                        resendCountdown: 'Resend in {{seconds}}s',
                        info: 'Please check your inbox and click the verification link.',
                        useFullFunctionality:
                            'To use the full functionality of the app, please verify your email.',
                        notVerified: 'Email not verified',
                        genericError:
                            'An error occurred. Please try again later.'
                    },
                    WeatherWidget: {
                        loading: 'Loading weather...',
                        currentWeather: 'Current weather:',
                        tomorrowWeather: 'Tomorrow weather (at the same time):',
                        feelsLike: 'Feels like: ',
                        errors: {
                            fetchWeatherError:
                                'Error fetching weather. Please try again later.'
                        }
                    },
                    PerfectOutlook: {
                        title: '🚀 Just 4 steps to your perfect outfit',
                        steps: {
                            step1: 'Choose a city to check the weather, or set weather conditions manually',
                            step2: 'Tell us about yourself: height, weight, age, and clothing preferences',
                            step3: 'Add clothes to your wardrobe to get more accurate recommendations',
                            step4: 'Choose an event or occasion, and we will pick the perfect outfit'
                        },
                        yourOutfit: 'Your perfect outfit is ready!',
                        dontShowAgain: "Don't show again",
                        close: 'Close'
                    },
                    CookieBanner: {
                        description:
                            'We use cookies to enhance your experience. Some are essential for basic functionality, while others help us improve your experience.',
                        learnMore: 'Learn More',
                        essentialOnly: 'Essential Only',
                        acceptAll: 'Accept All',
                        customize: 'Customize',
                        essential: 'Essential',
                        functional: 'Functional',
                        analytics: 'Analytics',
                        marketing: 'Marketing',
                        essentialDesc:
                            'These cookies are necessary for the website to function and cannot be switched off.',
                        functionalDesc:
                            'These cookies enable the website to save your settings and preferences.',
                        analyticsDesc:
                            'These cookies help us analyze site usage to improve our website.',
                        marketingDesc:
                            'These cookies are used to deliver relevant advertisements.',
                        save: 'Save',
                        cancel: 'Cancel'
                    }
                },
                Features: {
                    Feedback: {
                        title: 'Help us become better!',
                        placeholder: 'Leave your feedback here...',
                        send: 'Send Feedback',
                        sending: 'Sending...',
                        selectTopic: 'Topic',
                        selectPlaceholder: 'Select topic',
                        optional: 'optional',
                        topics: {
                            complaint: 'Complaint',
                            partnership: 'Partnership',
                            bug: 'Technical Issue',
                            feature: 'Feature Request',
                            content: 'Content Question',
                            subscription: 'Subscription Issue',
                            support: 'Support',
                            business: 'Business Inquiry',
                            other: 'Other'
                        },
                        errors: {
                            messageRequired: 'Feedback message is required',
                            messageSendingError:
                                'Error sending feedback. Please try again later.'
                        },
                        successMessage: 'Feedback sent successfully!'
                    },
                    WeatherPanel: {
                        title: 'Weather',
                        selectYourLocation: 'Select your location',
                        selectCountry: 'Select country',
                        selectCity: 'Select city',
                        noCountryFound: 'Country not found',
                        noCityFound: 'City not found',
                        fetchWeather: 'Check weather',
                        fetchTomorrow: "Tomorrow's weather",
                        tabs: {
                            location: 'By location',
                            manual: 'Manual'
                        },
                        manual: {
                            conditions: 'Weather conditions',
                            temperature: 'Temperature'
                        },
                        conditions: {
                            sunny: 'Sunny',
                            partlyCloudy: 'Partly cloudy',
                            cloudy: 'Cloudy',
                            rain: 'Rain',
                            heavyRain: 'Heavy rain',
                            snow: 'Snow',
                            thunderstorm: 'Thunderstorm'
                        },
                        temperature: {
                            hot: 'Hot',
                            warm: 'Warm',
                            moderate: 'Moderate',
                            cool: 'Cool',
                            cold: 'Cold'
                        },
                        errors: {
                            fetchWeatherError: 'Error fetching weather',
                            fetchCitiesError: 'Error fetching cities'
                        }
                    },
                    PersonalDetailsPanel: {
                        title: 'Personal Details',
                        gender: 'Gender:',
                        genderOptions: {
                            male: 'Male',
                            female: 'Female',
                            other: 'Other'
                        },
                        optionalNote:
                            'Additional information is optional, but it helps us provide more accurate outfit recommendations',
                        additionalInfo: 'Additional Information',
                        characteristics: {
                            height: 'Height',
                            weight: 'Weight',
                            bodyType: 'Body Type',
                            age: 'Age',
                            skinTone: 'Skin Tone',
                            hairColor: 'Hair Color',
                            eyeColor: 'Eye Color',
                            preferredColors: 'Preferred Colors',
                            stylePreference: 'Style Preference',
                            units: {
                                cm: 'cm',
                                kg: 'kg',
                                years: 'years',
                                lb: 'lb',
                                ft: 'ft',
                                in: 'in'
                            },
                            bodyTypes: {
                                // Common body types
                                slim: 'Slim',
                                athletic: 'Athletic',
                                average: 'Average',
                                curvy: 'Curvy',
                                muscular: 'Muscular',
                                // Female body types
                                hourglass: 'Hourglass',
                                pear: 'Pear',
                                apple: 'Apple',
                                rectangle: 'Rectangle',
                                inverted_triangle: 'Inverted Triangle',
                                // Male body types
                                trapezoid: 'Trapezoid',
                                triangle: 'Triangle',
                                oval: 'Oval'
                            },
                            skinTones: {
                                fair: 'Fair',
                                light: 'Light',
                                medium: 'Medium',
                                olive: 'Olive',
                                brown: 'Brown',
                                dark: 'Dark'
                            },
                            hairColors: {
                                black: 'Black',
                                brown: 'Brown',
                                blonde: 'Blonde',
                                red: 'Red',
                                gray: 'Gray',
                                white: 'White',
                                other: 'Other'
                            },
                            eyeColors: {
                                brown: 'Brown',
                                blue: 'Blue',
                                green: 'Green',
                                hazel: 'Hazel',
                                gray: 'Gray',
                                other: 'Other'
                            },
                            colors: {
                                black: 'Black',
                                white: 'White',
                                gray: 'Gray',
                                red: 'Red',
                                blue: 'Blue',
                                green: 'Green',
                                yellow: 'Yellow',
                                purple: 'Purple',
                                pink: 'Pink',
                                orange: 'Orange',
                                brown: 'Brown',
                                beige: 'Beige'
                            },
                            styles: {
                                casual: 'Casual',
                                formal: 'Formal',
                                business: 'Business',
                                sporty: 'Sporty',
                                romantic: 'Romantic',
                                creative: 'Creative',
                                minimalist: 'Minimalist',
                                vintage: 'Vintage',
                                streetwear: 'Streetwear'
                            },
                            heightPlaceholder: 'Enter height',
                            weightPlaceholder: 'Enter weight',
                            agePlaceholder: 'Enter age'
                        },
                        search: 'Search...',
                        noResults: 'No results found',
                        save: 'Save Changes',
                        validation: {
                            height: 'Height should be between 100 and 250 cm',
                            weight: 'Weight should be between 30 and 250 kg',
                            age: 'Age should be between 13 and 120 years'
                        },
                        errors: {
                            userNotAuthorized: 'User is not authorized',
                            unknownError: 'An unknown error occurred',
                            networkError:
                                'Network error. Please check your connection',
                            saveFailed: 'Failed to save changes',
                            cookieRequired: 'Cookie permission required',
                            cookieRequiredDesc:
                                'Click "Customize" in the banner at the bottom of the page and enable functional cookies'
                        },
                        saveSuccess: 'Changes saved successfully',
                        noChanges: 'No changes to save'
                    },
                    WardrobePanel: {
                        title: 'Your Wardrobe',
                        openWardrobe: 'Open Wardrobe',
                        itemCount: 'Total Items: {{count}}',
                        useWardrobeForOutfits:
                            'Use wardrobe for outfit selection'
                    },
                    EventPanel: {
                        title: 'Choose Event',
                        description:
                            'Select the type of event to help us pick the perfect outfit',
                        selectEvent: 'Select event type',
                        noEventFound: 'No events found',
                        types: {
                            businessMeeting: 'Business Meeting',
                            interview: 'Interview',
                            wedding: 'Wedding',
                            dateNight: 'Date Night',
                            restaurant: 'Restaurant',
                            theater: 'Theater',
                            clubbing: 'Clubbing/Party',
                            graduation: 'Graduation Ceremony',
                            conference: 'Conference',
                            casualWalk: 'City Walk',
                            shopping: 'Shopping',
                            concert: 'Concert',
                            exhibition: 'Exhibition/Museum',
                            birthday: 'Birthday',
                            cocktailParty: 'Cocktail Party',
                            beachDay: 'Beach Day',
                            sportEvent: 'Sports Event',
                            casualFriends: 'Meeting Friends',
                            workOffice: 'Office Day',
                            familyGathering: 'Family Gathering',
                            onlineMeeting: 'Online Meeting',
                            webinar: 'Webinar',
                            onlineInterview: 'Online Interview',
                            videoConference: 'Video Conference'
                        }
                    },
                    OutfitRequestPanel: {
                        title: 'Create Your Perfect Outfit',
                        description:
                            'Click the button below to get outfit recommendations',
                        generate: 'Generate Outfit',
                        generateMore: 'Generate Another Outfit',
                        generating: 'Generating Outfit...',
                        clear: 'Clear',
                        errors: {
                            generic:
                                'An error occurred while generating the outfit',
                            noEventType: 'Please select an event type',
                            noLocation: 'Please specify your location',
                            noGender: 'Please specify your gender'
                        }
                    }
                },
                Layout: {
                    Header: {
                        pricing: 'Pricing'
                    },
                    Footer: {
                        privacy: 'Privacy Policy',
                        terms: 'Terms of Use',
                        contact: 'Contact Us',
                        copyright: 'All rights reserved.'
                    }
                }
            },
            Pages: {
                Home: {
                    title: 'What to Wear Today?',
                    description:
                        'Get daily clothing recommendations based on your weather and wardrobe.',
                    tryForFree: 'Try for free',
                    advantages: {
                        title: 'Advantages',
                        title1: '⚡️ Fast and easy',
                        description1:
                            'Stop wasting time in the morning choosing clothes.',
                        title2: '👗 Personal advices',
                        description2:
                            'Individual recommendations for your wardrobe and weather.',
                        title3: '🤖 AI-technologies',
                        description3:
                            'Modern algorithms pick an outfit in seconds.'
                    },
                    howDoesItWorks: {
                        title: 'How does it work?',
                        title1: '📍 We determine your weather automatically based on your location or manually.',
                        title2: '👕 Add your clothing (optional, but it improves recommendations).',
                        title3: '🚀 Receive daily advice from our AI-assistant.'
                    },
                    ctaBlock: {
                        cta: 'Start now',
                        description: 'Free sign-up in just 1 minute'
                    },
                    hookBlock: {
                        title: 'Why try us?',
                        title1: '☀️ Peaceful Mornings',
                        description1:
                            'Forget the chaos of choosing your outfit every morning. Our service eliminates morning stress so you can start your day confidently.',
                        title2: '⏰ Time-saving',
                        description2:
                            'Save precious minutes in the morning for the things that really matter. Your perfect outfit is already ready!',
                        title3: '😎 Personal Style',
                        description3:
                            "Receive recommendations perfectly tailored to your wardrobe and the weather. It's not just an outfit—it's your unique style."
                    },
                    meta: {
                        title: 'DressifyAI - AI Clothing Recommendations',
                        description:
                            'Get personalized clothing suggestions based on weather, age, gender, and occasion.'
                    }
                },
                NotFound: {
                    title: '404 Not Found',
                    description: 'The page you are looking for does not exist.'
                },
                PrivacyPolicy: {
                    title: 'Privacy Policy',
                    intro: 'We respect your privacy and do not share your personal data.',
                    data: {
                        title: 'What data we collect',
                        description:
                            'Your location, age, gender, and preferences for accurate clothing recommendations.'
                    },
                    security: {
                        title: 'Data security',
                        description:
                            'Your data is securely stored and never shared without your consent.'
                    }
                },
                TermsOfUse: {
                    title: 'Terms of Use',
                    intro: 'By using our app, you agree to the following terms.',
                    usage: {
                        title: 'Proper usage',
                        description:
                            'You agree to provide accurate information for personalized recommendations.'
                    },
                    responsibility: {
                        title: 'Our Responsibility',
                        description:
                            'We are not liable for incorrect clothing recommendations due to incorrect data provided.'
                    }
                },
                ContactUs: {
                    title: 'Contact Us',
                    descriptionAuth:
                        "Have questions or feedback? Please leave a message below, and we'll get back to you shortly.",
                    descriptionNonAuth:
                        "Have questions or feedback? Please send an email to this address, and we'll get back to you shortly."
                },
                Login: {
                    title: 'Sign In',
                    email: 'Email',
                    password: 'Password',
                    register: 'Sign Up',
                    noAccount: "Don't have an account?",
                    errors: {
                        emailRequired: 'Email is required',
                        invalidEmail: 'Invalid email address',
                        passwordRequired: 'Password is required',
                        passwordMinLength:
                            'Password must be at least 8 characters',
                        invalidCredentials: 'Invalid email or password',
                        genericError:
                            'An error occurred. Please try again later.'
                    }
                },
                Register: {
                    title: 'Sign Up',
                    email: 'Email',
                    password: 'Password',
                    confirmPassword: 'Confirm Password',
                    text1: 'I agree with ',
                    text2: 'Privacy Policy',
                    text3: ' and ',
                    text4: 'Terms of Use',
                    haveAccount: 'Already have an account?',
                    login: 'Sign In',
                    errors: {
                        invalidApiKey:
                            'Invalid API key. Please check your configuration.',
                        emailAlreadyInUse: 'This email is already in use.',
                        genericError:
                            'An error occurred. Please try again later.',
                        emailRequired: 'Email is required',
                        invalidEmail: 'Invalid email address',
                        passwordRequired: 'Password is required',
                        passwordMinLength:
                            'Password must be at least 8 characters',
                        passwordPattern:
                            'Password must contain letters and numbers',
                        passwordsMismatch: 'Passwords do not match',
                        agreeRequired:
                            'You must agree with Privacy Policy and Terms of Use'
                    }
                },
                Pricing: {
                    title: 'Choose Your Plan',
                    subtitle: 'Find the perfect plan for your needs.',
                    errors: {
                        stripeLoadFailed: 'Failed to load payment system',
                        invalidPlan: 'Selected plan is not available',
                        checkoutFailed: 'Checkout process failed',
                        generic: 'An error occurred during payment processing',
                        noEmail:
                            'Email verification is required for subscription'
                    },
                    plans: {
                        free: {
                            title: 'Free',
                            price: '$0 / month',
                            feature1:
                                'View weather for different cities and countries',
                            feature2: 'Basic usage only',
                            cta: 'Basic'
                        },
                        monthly: {
                            title: 'Standard',
                            price: '$3 / month',
                            feature1:
                                'All Free features + AI outfit recommendations',
                            feature2: 'Personalized settings for your wardrobe',
                            cta: 'Choose Plan',
                            currentPlan: 'Current Plan'
                        },
                        semiAnnual: {
                            title: 'Best Value',
                            oldPrice: '$18',
                            price: '$15 / 6 months',
                            save: 'You save $3',
                            feature1: 'All Standard features for 6 months',
                            feature2: 'One-time discounted payment',
                            cta: 'Choose Plan',
                            ribbon: 'Best Deal',
                            currentPlan: 'Current Plan'
                        }
                    }
                },
                WhatToWear: {
                    title: "Let's find out what to wear today!"
                },
                Wardrobe: {
                    title: 'My Wardrobe',
                    addItemPlaceholder: 'Enter item name',
                    noItems: 'No items',
                    saveChanges: 'Save Changes',
                    saving: 'Saving...',
                    categories: {
                        headwear: 'Headwear',
                        tops: 'Tops',
                        bottoms: 'Bottoms',
                        dresses: 'Dresses',
                        outerwear: 'Outerwear',
                        shoes: 'Shoes',
                        accessories: 'Accessories',
                        jewelry: 'Jewelry',
                        bags: 'Bags',
                        socks: 'Socks',
                        underwear: 'Underwear',
                        swimwear: 'Swimwear',
                        sportswear: 'Sportswear',
                        suits: 'Suits',
                        other: 'Other'
                    },
                    errors: {
                        maxLength: 'Item name should not exceed 50 characters',
                        unknownError: 'An unknown error occurred'
                    }
                },
                SuccessPayment: {
                    title: 'Payment Successful',
                    description: 'Thank you for your purchase!',
                    goToHome: 'Go to Home'
                },
                FailedPayment: {
                    title: 'Payment Failed',
                    description: 'Please try again.',
                    goToHome: 'Go to Home'
                }
            },
            General: {
                brandName: 'DressifyAI',
                goBack: 'Go back',
                sending: 'Sending...'
            },
            ...en_codes
        }
    }
};
