import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';
import Stripe from 'stripe';

import { Section } from '@/components/Section';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { TAGS } from '@/constants/cache-tags';
import { formatPrices } from '@/lib/stripe/utils';
import { nameToSlug } from '@/lib/utils';
import { getProductBySlug, getAllProducts, getAllProductVariants } from '@/services/product';

import { VariantsSection } from '../_components/variants-section';
import { ProductTitle } from '../_components/product-title';
import { ProductImages } from '../_components/product-images';
import { AddToCartButton } from '../_components/add-to-cart-button';
import { classNames } from '@/constants/class-names';

const getProductBySlugCached = unstable_cache((slug: string) => getProductBySlug(slug), [], {
    tags: [TAGS.products],
});

export interface ProductDetailsPageProps {
    params: Promise<{ slugs: string[] }>;
}

export async function generateStaticParams() {
    const products = await getAllProducts();

    return products.map((product) => ({ name: nameToSlug(product.name) }));
}

export default async function Product({ params }: ProductDetailsPageProps) {
    const { slugs } = await params;

    const [productSlug, variantSlug] = slugs;

    const product = await getProductBySlugCached(productSlug);

    if (!product) return notFound();

    const variants = await getAllProductVariants(product.id);

    const selected =
        variants.length > 1
            ? variants.find((variant) => nameToSlug(variant.nickname ?? '') === variantSlug)
            : variants[0];

    const hasOnlyOneVariant = variants.length <= 1;
    const selectedPrice = selected ? formatPrices([selected]) : formatPrices(variants);

    return (
        <Fragment>
            <Section as='nav' className={classNames.colors3}>
                <Section.Content className='flex flex-row justify-between py-4'>
                    <Breadcrumbs items={makeBreadcrumbs(product)} />
                </Section.Content>
            </Section>
            <Section as='main' className='bg-primary-50 dark:bg-primary-900'>
                <Section.Content className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                    <div className='flex-1 flex flex-col gap-4'>
                        <ProductTitle title={product.name} price={selectedPrice} />
                        {!hasOnlyOneVariant && (
                            <VariantsSection
                                product={product}
                                variants={variants}
                                selectedVariant={selected}
                            />
                        )}

                        <div
                            dangerouslySetInnerHTML={{ __html: product.description ?? '' }}
                            className='flex flex-col gap-2 [&>ul]:list-[revert] [&>ul]:pl-4'
                        />

                        <AddToCartButton variant={selected} />
                    </div>

                    <div className='flex flex-col gap-4 lg:row-start-1'>
                        <ProductImages images={product.images} />
                    </div>
                </Section.Content>
            </Section>
        </Fragment>
    );
}

function makeBreadcrumbs(product: Stripe.Product) {
    return {
        Home: '/',
        Products: '/products',
        [product.name]: '',
    };
}

// todo: variant descriptions, images, etc
