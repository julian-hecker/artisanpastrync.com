export type JsonLdType = {
    '@context'?: 'https://schema.org';
    '@type': string;
    '@id'?: string;
    name?: string;
    description?: string;
    url?: string;
    [key: string]:
        | string
        | string[]
        | number
        | boolean
        | null
        | undefined
        | JsonLdType
        | JsonLdType[];
};

export interface JsonLdProps {
    schema: JsonLdType | JsonLdType[];
}

/** https://developers.google.com/search/docs/appearance/structured-data/search-gallery */
export function JsonLd({ schema }: JsonLdProps) {
    return (
        <script
            type='application/ld+json'
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(schema),
            }}
        />
    );
}
