import Image from 'next/image';

import { Section } from '@/components/Section';
import { classNames } from '@/constants/class-names';

export const aboutSections = [
    {
        className: classNames.colors1,
        contentClassName: classNames.twoColumns,
        text: `Some of the best memories are made in the kitchen -- mixing, kneading, and
        waiting for something wonderful to come out of the oven. At Artisan Pastry,
        baking is more than a craft; it's a tradition that spans generations.`,
        image: {
            src: '/images/chiffones.jpg',
            alt: 'Our pillowy chiffon cake',
        },
    },
    {
        className: classNames.colors2,
        contentClassName: classNames.twoColumns,
        text: `Artisan Pastry was born from my great-grandmother's traditional baking
        methods, which included a cherished collection of cookie, cake, and pastry
        recipes. My mother compiled these beloved recipes into a book, inspiring me
        to open this business with her. Together, we aim to share our delicious
        pastries with our local communities and beyond.`,
        image: {
            src: '/images/alfajor.jpg',
            alt: 'Our buttery Peruvian Alfajor cookies filled with dulce de leche',
            className: 'md:-order-1',
        },
    },
    {
        className: classNames.colors1,
        contentClassName: 'md:w-1/2 m-auto',
        text: `From delicate cookies to rich, buttery cakes, each bite tells a story. A
        story one of home, heritage, and the joy of sharing something truly special.
        Whether you're looking for a treat for yourself or something to bring
        to the table, we're here to bake up something wonderful.`,
    },
    {
        className: classNames.colors2,
        contentClassName: classNames.twoColumns,
        text: `Every pastry we make is crafted from scratch with real, high-quality
        ingredients—nothing artificial, just honest flavors. We focus on using the
        best ingredients available, ensuring each bake is rich, flavorful, and made
        with care.`,
        image: {
            src: '/images/budin.jpg',
            alt: 'Our syrupy bread pudding with raisins',
        },
    },
    {
        className: classNames.colors1,
        contentClassName: '',
        text: `<strong>Welcome to Artisan Pastry.</strong> We hope you love what we create
        as much as we love making it!`,
        isCentered: true,
    },
];

export default function AboutPage() {
    return (
        <>
            {aboutSections.map((section, index) => (
                <Section key={index} className={section.className}>
                    <Section.Content className={section.contentClassName}>
                        <p
                            className={section.isCentered ? 'text-center' : ''}
                            dangerouslySetInnerHTML={{ __html: section.text }}
                        />
                        {section.image && (
                            <div
                                className={`relative aspect-square w-full ${
                                    section.image.className || ''
                                }`}
                            >
                                <Image
                                    src={section.image.src}
                                    alt={section.image.alt}
                                    fill
                                    className='object-contain'
                                />
                            </div>
                        )}
                    </Section.Content>
                </Section>
            ))}
        </>
    );
}
