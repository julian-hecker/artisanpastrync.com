import { classNames } from '@/constants/class-names';
import { cn } from '@/lib/utils';

import { GoogleLoginButton } from './google-login';

export function AuthCard() {
    return (
        <div
            className={cn(
                'mx-auto p-8 shadow-md rounded-lg flex flex-col gap-4',
                classNames.colors1
            )}
        >
            <h2 className='text-xl font-semibold text-center'>Sign up or Log in</h2>
            <hr className='border-primary' />
            <GoogleLoginButton />
        </div>
    );
}
