'use server';

import { signIn, signOut } from '@/lib/auth';

export async function signOutAction() {
    await signOut();
}

export async function googleSignInAction(formData: FormData) {
    const redirectTo = formData.get('redirectTo') as string;
    await signIn('google', { redirectTo });
}
