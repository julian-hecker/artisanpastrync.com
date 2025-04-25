import { useEffect, useState } from 'react';

interface UseScrollStateOptions {
    threshold?: number; // The scroll position (in pixels) to trigger the `isScrolled` state
    disabled?: boolean; // Whether to disable the scroll listener
}

/**
 * Custom hook to track whether the user has scrolled past a certain threshold.
 * @param options - Configuration options for the hook.
 * @returns `isScrolled` - A boolean indicating if the scroll position is past the threshold.
 */
export function useIsScrolled({ threshold = 50, disabled = false }: UseScrollStateOptions = {}) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        if (disabled) return;

        const updateIsScrolled = () => {
            setIsScrolled(window.scrollY > threshold);
        };

        updateIsScrolled(); // Check initial scroll position

        const handleScroll = () => {
            updateIsScrolled();
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [disabled, threshold]);

    return isScrolled;
}
