export const LOCALHOST_URL = 'http://localhost:3000';
export const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.NEXT_PUBLIC_VERCEL_URL?.trim() ||
    process.env.URL?.trim() ||
    LOCALHOST_URL!;

export const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY!;
export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;
