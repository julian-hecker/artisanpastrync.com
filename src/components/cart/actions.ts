'use server';

import {
    addItemToCart,
    clearCart,
    editItemInCart,
    getCartItems,
    removeItemsFromCart,
} from '@/services/cart';
import { getVariantById } from '@/services/product';

export async function isItemUnavailable(variantId: string): Promise<boolean> {
    const variant = await getVariantById(variantId);

    if (!variant) return true;

    return !!variant.metadata?.unavailable;
}

export async function getCartItemsAction() {
    const cartItems = await getCartItems();
    return cartItems;
}

export async function addCartItemAction(_prevState: unknown, variantId: string) {
    if (!variantId) return { ok: false };

    const unavailable = await isItemUnavailable(variantId);

    if (unavailable)
        return {
            ok: false,
            message: 'This product is out of stock',
        };

    await addItemToCart(variantId, 1);

    return { ok: true };
}

export async function removeCartItemAction(_prevState: unknown, variantId: string) {
    await removeItemsFromCart(variantId);

    return { ok: true };
}

export async function updateItemQuantityAction(
    _prevState: unknown,
    payload: { variantId: string; quantity: number }
) {
    console.log('Updating item quantity', payload);
    const { variantId, quantity } = payload;

    if (quantity === 0) {
        await removeItemsFromCart(variantId);
        return { ok: true };
    }

    const unavailable = await isItemUnavailable(variantId);

    if (unavailable) {
        return {
            ok: false,
            message: 'This product is out of stock',
        };
    }

    await editItemInCart(variantId, quantity);

    return { ok: true };
}

export async function clearCartAction(): Promise<void> {
    await clearCart();
}
