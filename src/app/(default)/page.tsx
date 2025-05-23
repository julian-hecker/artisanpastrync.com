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
                            Artisan Pastry LLC is a women-owned, mother-daughter pastry shop based
                            in Wake Forest, NC. Inspired by a lack of quality pastry shops in the
                            Triangle and our rich baking heritage, we offer a variety of cookies,
                            cakes, and pastries. All treats are made from scratch with high-quality,
                            seasonal, and locally sourced ingredients, setting us apart with our
                            commitment to whole, real ingredients. We also participate in monthly
                            farmers&apos; markets to connect with the community.
                        </p>
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
