import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren } from 'react';

import { ThemeProvider } from './theme-provider';
import { CartModalProvider } from '../cart/cart-context';

export function Providers({ children }: PropsWithChildren) {
    return (
        <SessionProvider>
            <CartModalProvider>
                <ThemeProvider
                    attribute='class'
                    defaultTheme='system'
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </CartModalProvider>
        </SessionProvider>
    );
}
