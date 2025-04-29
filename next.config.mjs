/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        authInterrupts: true,
    },
    images: {
        remotePatterns: [{ hostname: '*' }],
    },
    headers: async () => {
        const headers = [];
        if (process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production') {
            headers.push({
                headers: [
                    {
                        key: 'X-Robots-Tag',
                        value: 'noindex',
                    },
                ],
                source: '/:path*',
            });
        }
        return headers;
    },
};

export default nextConfig;
