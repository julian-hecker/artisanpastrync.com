import { unstable_cache } from 'next/cache';
import { Fragment } from 'react';

import { Section } from '@/components/Section';
import { TAGS } from '@/constants/cache-tags';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { classNames } from '@/constants/class-names';
import { getAllProducts } from '@/services/product';

import { ProductList } from './_components/product-list';

const getProductsCached = unstable_cache(() => getAllProducts(), [], { tags: [TAGS.products] });

export default async function ProductsPage() {
    const products = await getProductsCached();

    return (
        <Fragment>
            <Section as='nav' className={classNames.colors3}>
                <Section.Content className='flex flex-row justify-between py-4'>
                    <Breadcrumbs items={{ Home: '/', Products: '/products' }} />
                </Section.Content>
            </Section>

            <Section className='bg-primary-50 dark:bg-primary-900 text-primary-900 dark:text-primary-50'>
                <Section.Content>
                    <ProductList products={products} />
                </Section.Content>
            </Section>
        </Fragment>
    );
}
