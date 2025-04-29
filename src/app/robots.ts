import { SITE_URL } from '@/constants/environment';
import type { MetadataRoute } from 'next';

const isAllowedKey =
    process.env.NEXT_PUBLIC_VERCEL_ENV !== undefined &&
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
        ? 'allow'
        : 'disallow';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                [isAllowedKey]: '/',
            },
        ],
        host: SITE_URL,
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
