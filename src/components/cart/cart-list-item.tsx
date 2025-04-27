'use client';

import Image from 'next/image';

import { formatStripeAmountForDisplay } from '@/lib/stripe/utils';
import type { CartItem } from '@/services/cart';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { useCartContext } from './cart-context';
import { updateItemQuantityAction } from './actions';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { Input } from '../ui/input';

function formatProductName(name: string, variant?: string | null) {
    return name + (variant ? ` - ${variant}` : '');
}

export interface CartListItemProps {
    item: CartItem;
}

export function CartListItem({ item }: CartListItemProps) {
    const { fetchCart } = useCartContext();
    const [quantity, setQuantity] = useState(item.quantity);
    const debouncedQuantity = useDebouncedValue(quantity, 500);

    const updateQuantity = async () => {
        if (debouncedQuantity !== item.quantity) {
            await updateItemQuantityAction(null, {
                variantId: item.variant.id,
                quantity: debouncedQuantity,
            });
            await fetchCart();
        }
    };

    useEffect(() => {
        updateQuantity();
    }, [debouncedQuantity]);

    return (
        <li className='grid grid-cols-[min-content_1fr_64px] items-center gap-4 py-4 border-b border-primary-200 dark:border-primary-800'>
            <div className='w-20 h-20 flex-shrink-0'>
                <Image
                    className='aspect-square object-cover'
                    src={item.product.images[0] || '/placeholder.png'}
                    width={80}
                    height={80}
                    alt={`${item.product.name} ${item.variant?.nickname ?? ''}`}
                />
            </div>

            <div className='flex-grow flex flex-col gap-1'>
                <div className='flex-grow'>
                    <h3 className='text-sm font-semibold text-primary-900 dark:text-primary-50'>
                        {formatProductName(item.product.name, item.variant?.nickname ?? null)}
                    </h3>
                </div>

                <p className='text-sm font-medium text-primary-900 dark:text-primary-50'>
                    {formatStripeAmountForDisplay(
                        item.variant.unit_amount ?? 0,
                        item.variant.currency
                    )}
                </p>

                <div className='flex items-stretch gap-0'>
                    <Button
                        onClick={() => setQuantity((qty) => (qty - 1 < 0 ? 0 : qty - 1))}
                        size='sm'
                        className='rounded-r-none'
                    >
                        -
                    </Button>
                    <Input
                        type='number'
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.valueAsNumber)}
                        className='w-full max-w-32 h-[unset] text-center border-primary rounded-none p-0'
                        min={0}
                    />
                    <Button
                        onClick={() => setQuantity((qty) => qty + 1)}
                        size='sm'
                        className='rounded-l-none'
                    >
                        +
                    </Button>
                </div>
            </div>

            <p className='text-sm justify-self-end font-semibold text-primary-900 dark:text-primary-50'>
                {formatStripeAmountForDisplay(
                    item.quantity * (item.variant.unit_amount ?? 0),
                    item.variant.currency
                )}
            </p>
        </li>
    );
}
