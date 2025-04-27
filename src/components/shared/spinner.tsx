import { cn } from '@/lib/utils';

export function Spinner({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                'pointer-events-none size-5 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent',
                className
            )}
        />
    );
}
