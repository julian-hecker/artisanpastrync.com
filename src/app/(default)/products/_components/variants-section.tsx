'use client';

import Stripe from 'stripe';

import { cn } from '@/lib/utils';

import { Variant } from './variant';
import { getVariantPath } from './utils';

interface VariantsSectionProps {
    product: Stripe.Product;
    variants: Stripe.Price[];
    className?: string;
    selectedVariant: Stripe.Price | undefined;
}

export function VariantsSection({
    product,
    variants,
    className,
    selectedVariant,
}: VariantsSectionProps) {
    return (
        <div className={cn('flex flex-col gap-2', className)}>
            <p className='text-left'>Select a variant</p>
            <div className='relative flex w-full flex-wrap gap-2 justify-start'>
                {variants
                    .toSorted((a, b) => (a.unit_amount ?? 0) - (b.unit_amount ?? 0))
                    .map((variant) => (
                        <Variant
                            key={variant.id}
                            href={getVariantPath(product.name, variant?.nickname)}
                            variant={variant}
                            isActive={variant.id === selectedVariant?.id}
                        />
                    ))}
            </div>
        </div>
    );
}
