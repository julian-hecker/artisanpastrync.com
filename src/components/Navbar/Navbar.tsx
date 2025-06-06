'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, ReactNode, useState } from 'react';

import { AuthButton } from '@/components/auth/auth-button';
import { CartButton } from '@/components/cart/cart-button';
import { Logo } from '@/components/Logo';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { Button, ButtonProps } from '@/components/ui/button';
import { LINKS, NavLink } from '@/constants/navigation';
import { useIsScrolled } from '@/hooks/useIsScrolled';
import { cn } from '@/lib/utils';

import './navbar.css';

export type NavButton = Pick<ButtonProps, 'onClick' | 'variant' | 'className'> & {
    label: string;
};

export interface NavbarProps {
    links?: NavLink[];
    enableScroll?: boolean;
    className?: string;
    serverButtons?: ReactNode;
}

const buttonClassNames =
    'text-primary-900 bg-transparent group-[.transparent]:text-primary-50 transition-colors duration-500 gap-2';

export const Navbar: FC<NavbarProps> = ({ className, links = LINKS, enableScroll }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    // by default, enable scroll on landing page only
    enableScroll ??= pathname === '/';

    const isScrolled = useIsScrolled({ disabled: !enableScroll });

    const isSolid = !enableScroll || isMenuOpen || isScrolled;
    return (
        <header
            className={cn(
                'navbar group bg-primary-50 shadow-md',
                isSolid ? 'solid' : 'transparent bg-transparent shadow-none',
                isScrolled ? 'scrolled' : 'not-scrolled',
                isMenuOpen ? 'menu-open' : 'menu-closed',
                enableScroll ? 'fixed' : 'relative',
                className
            )}
        >
            <div className='h-full container mx-auto px-4 py-4 flex justify-between items-center'>
                <div className='flex items-center grow'>
                    <div className='links hidden lg:flex space-x-4'>
                        {links.map(({ label, href, icon }) => (
                            <Button
                                variant='default'
                                asChild
                                className={buttonClassNames}
                                key={href}
                            >
                                <Link href={href}>
                                    {icon}
                                    {label}
                                </Link>
                            </Button>
                        ))}
                    </div>
                </div>
                <Link href='/' className='absolute left-1/2 -translate-x-1/2'>
                    <Logo className='duration-500 transition-transform origin-top' />
                </Link>
                <div className='flex items-center grow justify-end'>
                    <div className='hidden lg:flex space-x-4'>
                        <ThemeToggle variant='default' className={buttonClassNames} />
                        <AuthButton variant='default' className={buttonClassNames} />
                        <CartButton variant='default' className={buttonClassNames} />
                    </div>
                    <div className='lg:hidden flex'>
                        <button
                            onClick={() => setIsMenuOpen((open) => !open)}
                            aria-label={
                                isMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'
                            }
                        >
                            <div className={cn('hamburger', { open: isMenuOpen })}>
                                <span className='bar'></span>
                                <span className='bar'></span>
                                <span className='bar'></span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <div
                className={cn(
                    'menu-overlay -z-10 lg:hidden fixed inset-0 bg-primary-50 bg-opacity-90 flex transition-[opacity,transform] duration-500 ease-in-out overflow-hidden opacity-0'
                )}
                style={{
                    transform: isMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
                    opacity: isMenuOpen ? 1 : 0,
                }}
            >
                <div className='container mx-auto mt-16 px-4 pt-4 overflow-y-auto'>
                    <nav className='space-y-4'>
                        <div className='links flex flex-col items-end gap-4 space'>
                            <AuthButton variant='outline' />
                            {links.map(({ label, href }) => (
                                <Button
                                    key={label}
                                    onClick={() => setIsMenuOpen(false)}
                                    variant='link'
                                    tabIndex={isMenuOpen ? 0 : -1}
                                    asChild
                                >
                                    <Link href={href}>{label}</Link>
                                </Button>
                            ))}
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
