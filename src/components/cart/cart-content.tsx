import Link from 'next/link';

import { Spinner } from '@/components/shared/spinner';
import { Button } from '@/components/ui/button';
import { formatStripeAmountForDisplay } from '@/lib/stripe/utils';
import type { CartItem } from '@/services/cart';

import { CartListItem } from './cart-list-item';

export interface CartContentProps {
    cart?: CartItem[];
    isLoading?: boolean;
    isFullCart?: boolean;
}

export function CartContent({ cart, isLoading, isFullCart }: CartContentProps) {
    const total = cart?.reduce((acc, item) => {
        return acc + (item.variant.unit_amount ?? 0) * item.quantity;
    }, 0);

    return (
        <>
            <div className='flex flex-col flex-1 overflow-y-auto px-4 py-6 sm:px-6'>
                <div className='flex items-center justify-between'>
                    <h2 className='text-lg font-semibold'>Your Shopping Basket</h2>
                    {!isFullCart && (
                        <Link replace href='/cart' className='text-sm underline'>
                            Open full cart
                        </Link>
                    )}
                </div>

                <div className='mt-8 flex-1'>
                    {!cart || isLoading ? (
                        <div className='h-full flex items-center justify-center gap-4'>
                            <Spinner className='size-16' />
                            <p>Loading Cart...</p>
                        </div>
                    ) : !cart.length ? (
                        <div className='flex h-full items-center justify-center gap-4'>
                            <p>Your cart is empty</p>
                        </div>
                    ) : (
                        <ul role='list' className='-my-6 divide-y divide-neutral-200'>
                            {cart.map((item) => (
                                <CartListItem
                                    key={`${item.product.id}-${item.variant.id}`}
                                    item={item}
                                />
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className='border-t-2 border-primary-500 px-4 py-6 sm:px-6'>
                <div
                    id='cart-overlay-description'
                    className='flex justify-between text-base font-medium'
                >
                    <p>Subtotal</p>
                    <p>{formatStripeAmountForDisplay(total)}</p>
                </div>
                <p className='mt-0.5 text-sm opacity-75'>
                    Shipping and taxes calculated at checkout
                </p>
                <Button asChild={true} size={'lg'} className='mt-6 w-full rounded-full text-lg'>
                    <Link href='/checkout'>Checkout</Link>
                </Button>
            </div>
        </>
    );
}
