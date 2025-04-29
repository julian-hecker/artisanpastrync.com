import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PropsWithChildren } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { CartModal } from '@/components/cart/cart-modal';
import { Providers } from '@/components/providers';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Artisan Pastry',
    description: 'Fine Baked Goods from Wake Forest, North Carolina',
};

export default function RootLayout({ children }: PropsWithChildren<object>) {
    return (
        <html lang='en' suppressHydrationWarning>
            <body className={inter.className}>
                <Providers>
                    {children}
                    <CartModal />
                </Providers>
                <SpeedInsights />
            </body>
        </html>
    );
}
