'use client';

import { usePathname } from 'next/navigation';
import { createContext, use, useEffect, useMemo, useState } from 'react';
import type { Dispatch, ReactNode, SetStateAction } from 'react';

import type { CartItem } from '@/services/cart';
import { getCartItemsAction } from './actions';

export interface CartModalContextValue {
    cart: CartItem[];
    cartLoading: boolean;
    count: number;
    fetchCart: () => Promise<void>;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export const CartModalContext = createContext<CartModalContextValue>(null!);

export const CartModalProvider = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [cartLoading, setCartLoading] = useState(false);

    const fetchCart = async () => {
        setCartLoading(true);
        const items = await getCartItemsAction();
        setCart(items);
        setCartLoading(false);
    };

    const count = useMemo(() => cart.reduce((acc, curr) => acc + curr.quantity, 0), [cart]);

    useEffect(() => {
        setOpen(false);
        fetchCart();
    }, [pathname]);

    return (
        <CartModalContext.Provider value={{ cart, cartLoading, count, fetchCart, open, setOpen }}>
            {children}
        </CartModalContext.Provider>
    );
};

export const useCartContext = () => {
    const ctx = use(CartModalContext);

    if (!ctx) throw new Error('useCartModal must be used within a provider');

    return ctx;
};
