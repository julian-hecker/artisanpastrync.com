import { cn } from '@/lib/utils';
import { GoogleLoginButton } from './google-login';
import { classNames } from '@/constants/class-names';
import { Separator } from '@/components/ui/separator';

export function AuthCard() {
    return (
        <div
            className={cn(
                'mx-auto p-8 shadow-md rounded-lg flex flex-col gap-4',
                classNames.colors1
            )}
        >
            <h2 className='text-xl font-semibold text-center'>Sign up or Log in</h2>
            <Separator />
            <GoogleLoginButton />
        </div>
    );
}
