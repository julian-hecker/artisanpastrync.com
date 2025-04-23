'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button, ButtonProps } from '@/components/ui/button';

export type ThemeToggleProps = ButtonProps;

export function ThemeToggle({ className, ...props }: ThemeToggleProps) {
    const { setTheme, systemTheme } = useTheme();

    const toggleTheme = () =>
        setTheme((theme) => {
            if (theme !== 'system') return 'system';
            return systemTheme === 'dark' ? 'light' : 'dark';
        });

    return (
        <Button
            variant='default'
            size='icon'
            {...props}
            className={className}
            onClick={toggleTheme}
        >
            <Sun className='hidden dark:block' />
            <Moon className='block dark:hidden' />
            <span className='sr-only'>Toggle theme</span>
        </Button>
    );
}
