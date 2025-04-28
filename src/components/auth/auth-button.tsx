'use client';

import { LogIn, LogOut } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { signOutAction } from './actions';

export type AuthButtonProps = ButtonProps;

export function AuthButton({ className, ...props }: AuthButtonProps) {
    const { data: session, status } = useSession();

    if (status === 'loading')
        return (
            <Button {...props} disabled className={cn('gap-2', className)}>
                <LogIn />
                Sign in
            </Button>
        );

    if (!session?.user)
        return (
            <Button {...props} asChild className={cn('gap-2', className)}>
                <Link href='/login'>
                    <LogIn />
                    Sign in
                </Link>
            </Button>
        );

    return (
        <form action={signOutAction}>
            <Button type='submit' {...props} className={cn('gap-2', className)}>
                <LogOut />
                Sign Out
            </Button>
        </form>
    );
}
