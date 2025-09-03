import { ShoppingBasket, UsersRound } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Section } from '@/components/Section';
import { Button } from '@/components/ui/button';
import { classNames } from '@/constants/class-names';

export default function Home() {
    return (
        <>
            <Section className='h-screen'>
                <Section.Background video='/assets/hero-video.mp4' />
                <Section.Overlay className='bg-primary-900' opacity={0.5} />
                <Section.Content className='pt-20 text-primary-100 flex flex-col align-center justify-center gap-4'>
                    <h1 className='text-5xl font-bold'>Fine Baked Goods from Wake Forest, NC</h1>
                    <p className='text-2xl'>Taste the difference of our family&apos;s recipes</p>
                    <div className='flex flex-col sm:flex-row gap-4 '>
                        <Button variant='default' asChild className='gap-2'>
                            <Link href='/about'>
                                <UsersRound />
                                About Us
                            </Link>
                        </Button>
                        <Button variant='secondary' asChild className='gap-2'>
                            <Link href='/products'>
                                <ShoppingBasket />
                                Order Now!
                            </Link>
                        </Button>
                    </div>
                </Section.Content>
            </Section>
            <Section>
                <Section.Background className={classNames.colors1} />
                <Section.Content className={classNames.twoColumns}>
                    <div>
                        <p>
                            Artisan Pastry LLC is a women-owned, mother-daughter bakery in Wake
                            Forest, NC. Inspired by our family's love of baking and a desire to
                            share delicious treats with our community, we offer a wide variety of
                            cookies, cakes, and pastries. Every item is made from scratch using
                            high-quality, seasonal, and locally sourced ingredients. We're
                            passionate about real, wholesome baking and love connecting with our
                            neighbors at the occasional farmers' market.
                        </p>{' '}
                        <Button variant='default' className='mt-8' asChild>
                            <Link href='/about'>Learn More</Link>
                        </Button>
                    </div>
                    <Image
                        src='/images/chiffon.jpg'
                        alt='Our pillowy soft chiffon cake'
                        width='500'
                        height='500'
                    />
                </Section.Content>
            </Section>
        </>
    );
}
