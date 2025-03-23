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
                        info: 'Please check your inbox and click the verification link.'
                    }
                },
                Features: {
                    Feedback: {
                        title: 'Help us become better!',
                        placeholder: 'Leave your feedback here...',
                        send: 'Send Feedback',
                        sending: 'Sending...',
                        errors: {
                            messageRequired: 'Feedback message is required',
                            messageSendingError:
                                'Error sending feedback. Please try again later.'
                        },
                        successMessage: 'Feedback sent successfully!'
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
                }
            },
            General: {
                brandName: 'DressifyAI',
                goBack: 'Go back',
                sending: 'Sending...'
            }
        }
    }
};
