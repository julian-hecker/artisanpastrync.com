'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

import { CartAsideDrawer } from './cart-drawer';

export const CartAsideContainer = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname();

    if (pathname === '/cart') return null;

    return (
        <CartAsideDrawer>
            <div className='flex h-full min-h-[80vh] flex-col'>{children}</div>
        </CartAsideDrawer>
    );
};
