export const env = {
    API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
    REQUEST_SIGNATURE_SECRET: process.env.NEXT_PUBLIC_REQUEST_SIGNATURE_SECRET || '',
    NODE_ENV: process.env.NODE_ENV || 'development',
} as const;

