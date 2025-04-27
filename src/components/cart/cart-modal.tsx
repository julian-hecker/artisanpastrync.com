'use client';

import { CartAsideContainer } from './cart-aside';
import { CartContent } from './cart-content';
import { useCartContext } from './cart-context';

export function CartModal() {
    const { cart, cartLoading } = useCartContext();

    return (
        <CartAsideContainer>
            <CartContent cart={cart} isLoading={cartLoading} />
        </CartAsideContainer>
    );
}
