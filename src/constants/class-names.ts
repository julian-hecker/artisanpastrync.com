/** Used for common tailwind classnames in order to ensure consistency */
export const classNames = {
    twoColumns: 'grid md:grid-cols-2 gap-16 items-center justify-items-center',
    colors1: 'bg-primary-100 dark:bg-primary-900 text-primary-900 dark:text-primary-50',
    colors2: 'bg-primary-50 dark:bg-primary-950 text-primary-950 dark:text-primary-50',
    colors3: 'bg-primary-100 dark:bg-primary-950 text-primary-950 dark:text-primary-50',
} as const;

export const heightMinusHeader = 'calc(100vh - 58px)';
