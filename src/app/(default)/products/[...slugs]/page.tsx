import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';
import Stripe from 'stripe';

import { Section } from '@/components/Section';
import { JsonLd, JsonLdType } from '@/components/shared/json-ld';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { TAGS } from '@/constants/cache-tags';
import { classNames } from '@/constants/class-names';
import { SITE_URL } from '@/constants/environment';
import { formatPrices } from '@/lib/stripe/utils';
import { nameToSlug } from '@/lib/utils';
import { getProductBySlug, getAllProducts, getAllProductVariants } from '@/services/product';

import { VariantsSection } from '../_components/variants-section';
import { ProductTitle } from '../_components/product-title';
import { ProductImages } from '../_components/product-images';
import { AddToCartButton } from '../_components/add-to-cart-button';
import { getVariantPath } from '../_components/utils';

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

    const productLd = await generateProductLd(product, variants);

    return (
        <Fragment>
            <JsonLd schema={productLd} />
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

async function generateProductLd(
    product: Stripe.Product,
    variants?: Stripe.Price[]
): Promise<JsonLdType> {
    return {
        '@context': 'https://schema.org',
        '@type': 'ProductGroup',
        name: product.name,
        image: product.images,
        description: product?.description ?? undefined,
        productGroupID: product.id,
        hasVariant: variants?.map((variant) => ({
            '@type': 'Product',
            name: product.name + (variant.nickname ? ` - ${variant.nickname}` : ''),
            description: product?.description ?? undefined,
            image: product.images,
            offers: {
                '@type': 'Offer',
                url: `${SITE_URL}${getVariantPath(product.name, variant.nickname)}`,
                priceCurrency: 'USD',
                price: variant?.unit_amount ? variant.unit_amount / 100 : undefined,
                priceValidUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(), // todo: fetch from stripe?
                itemCondition: 'https://schema.org/NewCondition',
                availability: 'https://schema.org/InStock',
                applicableCountry: 'US',
                hasMerchantReturnPolicy: {
                    '@type': 'MerchantReturnPolicy',
                    applicableCountry: 'US',
                    returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
                },
                shippingDetails: {
                    '@type': 'OfferShippingDetails',
                    shippingRate: {
                        '@type': 'MonetaryAmount',
                        value: 25, // todo: fetch shipping price from stripe?
                        currency: 'USD',
                    },
                    shippingDestination: {
                        '@type': 'DefinedRegion',
                        addressCountry: 'US',
                        addressRegion: ['27587'],
                    },
                },
            },
        })),
    } as JsonLdType;
}

// todo: variant descriptions, images, etc
