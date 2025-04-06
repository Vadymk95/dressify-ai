export const DAILY_REQUEST_LIMITS = {
    free: 0,
    standard: 2,
    pro: 5
} as const;

export const REQUESTS_RESET_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
