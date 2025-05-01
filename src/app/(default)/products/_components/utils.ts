import { nameToSlug } from '@/lib/utils';

export const getVariantPath = (productName: string, variantName: string | null): string => {
    return `/products/${nameToSlug(productName)}${variantName ? '/' + nameToSlug(variantName) : ''}`;
};
