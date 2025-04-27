'use client';

import type { ReactNode } from 'react';

import { Drawer, DrawerContent, DrawerTitle } from '@/components/ui/drawer';
import { classNames } from '@/constants/class-names';
import { cn } from '@/lib/utils';
import { useCartContext } from './cart-context';

export const CartAsideDrawer = ({ children }: { children: ReactNode }) => {
    const { open, setOpen } = useCartContext();

    const closeDrawer = () => setOpen(false);

    return (
        <Drawer open={open} shouldScaleBackground={true} direction='right'>
            <DrawerTitle className='sr-only'>Shopping cart</DrawerTitle>
            <DrawerContent
                className={cn(
                    'sm:fixed sm:bottom-0 sm:left-auto sm:right-0 sm:top-0 sm:mt-0 sm:flex sm:h-full sm:w-1/2 sm:flex-col sm:overflow-hidden sm:rounded-none sm:shadow-xl lg:w-1/3',
                    classNames.colors1
                )}
                aria-describedby='cart-overlay-description'
                onPointerDownOutside={closeDrawer}
                onEscapeKeyDown={closeDrawer}
            >
                {children}
            </DrawerContent>
        </Drawer>
    );
};
