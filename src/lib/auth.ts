/* eslint-disable @typescript-eslint/no-empty-object-type */
import NextAuth from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import type { Provider } from 'next-auth/providers';
import Google from 'next-auth/providers/google';
import Stripe from 'stripe';

// https://authjs.dev/getting-started/typescript?framework=next-js#module-augmentation
declare module 'next-auth' {
    /**
     * The shape of the user object returned in the OAuth providers' `profile` callback,
     * or the second parameter of the `session` callback, when using a database.
     */
    interface User {
        /** The user's stripe customer id. */
        stripeCustomerId: string;
        isAdmin: boolean;
    }
    /**
     * The shape of the account object returned in the OAuth providers' `account` callback,
     * Usually contains information about the provider being used, like OAuth tokens (`access_token`, etc).
     */
    interface Account {}

    /**
     * Returned by `useSession`, `auth`, contains information about the active session.
     */
    interface Session {}
}

declare module 'next-auth/jwt' {
    /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
    interface JWT {
        email: string;
        stripeCustomerId: string;
        isAdmin: boolean;
    }
}

const providers: Provider[] = [
    Google({ authorization: { params: { access_type: 'offline', prompt: 'consent' } } }),
];

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers,
    callbacks: {
        async jwt(params) {
            const { token, trigger } = params;
            if (!trigger || !token?.email) return token;

            // Find customer associated with user's email address
            let customer = await getStripeCustomerByEmailWithFetch(token.email);

            // update stripe profile each time, as this part of the callback hits on each login
            if (customer) await updateStripeCustomerWithFetch(customer.id, token);

            // ...Or create a new customer
            if (!customer) customer = await createStripeCustomerWithFetch(token);

            token.stripeCustomerId = customer.id;
            token.isAdmin = !!customer.metadata?.isAdmin;

            return token;
        },
        async session(params) {
            const { session, token } = params;

            session.user.stripeCustomerId = token.stripeCustomerId;
            session.user.isAdmin = token.isAdmin;

            return session;
        },
    },
});

export const getUser = async () => (await auth())?.user;

// Using fetch instead of stripe SDK for edge function support
const STRIPE_CUSTOMER_API_URL = 'https://api.stripe.com/v1/customers';

async function getStripeCustomerByEmailWithFetch(email: string): Promise<Stripe.Customer | null> {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + process.env.STRIPE_SECRET_KEY);
    const response = await fetch(`${STRIPE_CUSTOMER_API_URL}?email=${email}`, { headers });
    const customer = (await response.json())?.data[0] ?? null;
    return customer;
}

async function createStripeCustomerWithFetch(token: JWT): Promise<Stripe.Customer> {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + process.env.STRIPE_SECRET_KEY);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body = new URLSearchParams({
        email: token.email,
        name: token.name ?? 'Customer',
        'metadata[image]': token.picture ?? '',
    });

    const response = await fetch(STRIPE_CUSTOMER_API_URL, {
        method: 'POST',
        headers,
        body,
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(`Failed to create Stripe Customer: ${message}`);
    }

    const customer = await response.json();
    return customer;
}

async function updateStripeCustomerWithFetch(
    customerId: string,
    token: JWT
): Promise<Stripe.Customer> {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + process.env.STRIPE_SECRET_KEY);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body = new URLSearchParams({
        name: token.name ?? '',
        'metadata[image]': token.picture ?? '',
    });

    const response = await fetch(`${STRIPE_CUSTOMER_API_URL}/${customerId}`, {
        method: 'POST',
        headers,
        body,
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(`Failed to update Stripe Customer: ${message}`);
    }

    const customer = await response.json();
    return customer;
}
