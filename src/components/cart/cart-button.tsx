'use client';

import { ShoppingBasket } from 'lucide-react';
import Link from 'next/link';
import type { HTMLAttributes } from 'react';

import { Button, ButtonProps } from '@/components/ui/button';

import { useCartContext } from './cart-context';
import { cn } from '@/lib/utils';

export interface CartButtonProps extends ButtonProps {
    className?: string;
    badgeProps?: HTMLAttributes<HTMLSpanElement>;
}

export function CartButton({ className, badgeProps, ...props }: CartButtonProps) {
    const { count, setOpen } = useCartContext();

    return (
        <Button
            variant='default'
            size='icon'
            {...props}
            asChild
            className={cn(className, 'relative')}
        >
            <Link
                href='/cart'
                onClick={(e) => {
                    e.preventDefault();
                    setOpen(true);
                }}
            >
                <ShoppingBasket />
                {count > 0 && (
                    <span
                        {...badgeProps}
                        className={cn(
                            'absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-50 border-primary-50 border-2',
                            badgeProps?.className
                        )}
                    >
                        {count}
                    </span>
                )}
                <span className='sr-only'>Cart</span>
            </Link>
        </Button>
    );
}
