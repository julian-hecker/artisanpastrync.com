import { MetadataRoute } from 'next';
import { unstable_cache } from 'next/cache';

import { TAGS } from '@/constants/cache-tags';
import { SITE_URL } from '@/constants/environment';
import { nameToSlug } from '@/lib/utils';
import { getAllProducts } from '@/services/product';

const getProductsCached = unstable_cache(() => getAllProducts(), [], { tags: [TAGS.products] });

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const paths = ['', '/about', '/products', '/login'];

    const products = await getProductsCached();
    const productEntries = products.map((product) => ({
        url: `${SITE_URL}/products/${nameToSlug(product.name)}`,
        lastModified: new Date(product.updated * 1000),
    }));

    return paths
        .map((path) => ({ url: SITE_URL + path, lastModified: new Date() }))
        .concat(productEntries);
}
