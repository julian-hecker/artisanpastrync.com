import { Section, SectionContent } from '@/components';
import { getUser } from '@/lib/auth';
import { classNames, heightMinusHeader } from '@/constants/class-names';
import { redirect } from 'next/navigation';
import { AuthCard } from '@/components/auth/auth-card';

export default async function LoginPage() {
    const user = await getUser();

    if (user) return redirect('/');

    return (
        <Section className='h-screen' style={{ height: heightMinusHeader }}>
            <Section.Background image='/images/chiffones.jpg' />
            <Section.Overlay className='bg-primary' opacity={0.5} />
            <SectionContent className={classNames.twoColumns}>
                <AuthCard />
            </SectionContent>
        </Section>
    );
}
