import Image from 'next/image';
import Link from 'next/link';
import Stripe from 'stripe';

import { formatPrices } from '@/lib/stripe/utils';
import { cn, nameToSlug } from '@/lib/utils';
import { getAllProductVariants } from '@/services/product';
import { classNames } from '@/constants/class-names';

export const ProductList = ({ products }: { products: Stripe.Product[] }) => {
    return (
        <ul className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {products.map((product, index) => (
                <li key={product.id}>
                    <ProductCard key={product.id} product={product} priority={index <= 6} />
                </li>
            ))}
        </ul>
    );
};

export const ProductCard = async ({
    product,
    priority,
}: {
    product: Stripe.Product;
    priority?: boolean;
}) => {
    const prices = await getAllProductVariants(product.id);

    return (
        <Link href={`/products/${nameToSlug(product.name)}`}>
            <article className={cn('group rounded-lg overflow-hidden', classNames.colors3)}>
                {product.images[0] && (
                    <div className='relative aspect-square w-full overflow-hidden'>
                        <Image
                            className='hover-perspective w-full h-full object-cover object-center transition-opacity group-hover:opacity-75 p-4'
                            src={product.images[0]}
                            fill
                            alt={product.name}
                            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw' // Baseed on ProductList grid
                            priority={priority}
                        />
                    </div>
                )}
                <div className='p-4 pt-0 flex flex-row justify-between items-center gap-2'>
                    <h2 className='text-xl font-medium'>{product.name}</h2>
                    <p>{formatPrices(prices)}</p>
                </div>
            </article>
        </Link>
    );
};
