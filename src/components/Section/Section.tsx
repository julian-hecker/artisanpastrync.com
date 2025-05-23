import Image from 'next/image';
import {
    ComponentPropsWithoutRef,
    CSSProperties,
    ElementType,
    FC,
    ReactNode,
    VideoHTMLAttributes,
} from 'react';

import { cn } from '@/lib/utils';

export interface SectionBackgroundProps extends VideoHTMLAttributes<HTMLVideoElement> {
    image?: string;
    video?: string;
    color?: string;
    className?: string;
    style?: CSSProperties;
}

export const SectionBackground: FC<SectionBackgroundProps> = ({
    image,
    video,
    color,
    className,
    style,
    ...videoProps
}) => {
    const baseClassNames = 'section__background absolute top-0 left-0 w-full h-full';

    if (video)
        return (
            <video
                autoPlay
                loop
                muted
                playsInline
                {...videoProps}
                style={style}
                className={cn(baseClassNames, 'object-cover object-center', className)}
            >
                <source src={video} />
                {image && (
                    <Image
                        src={image}
                        alt=''
                        fill
                        className={cn(baseClassNames, 'object-cover object-center', className)}
                    />
                )}
            </video>
        );

    if (image)
        return (
            <div className={cn(baseClassNames, className)} style={style}>
                <Image src={image} alt='' fill className='object-cover object-center' priority />
            </div>
        );

    if (color)
        return (
            <div
                className={cn(baseClassNames, 'bg-cover bg-center', `bg-${color}`, className)}
                style={{ ...style, backgroundColor: color }}
            ></div>
        );

    return <div className={cn(baseClassNames, 'bg-cover bg-center', className)}></div>;
};

export interface SectionOverlayProps {
    color?: string;
    opacity?: number;
    gradient?: string;
    className?: string;
    style?: CSSProperties;
}

export const SectionOverlay: FC<SectionOverlayProps> = ({
    color,
    opacity,
    gradient,
    className,
    style,
}) => (
    <div
        className={cn`section__overlay absolute top-0 left-0 w-full h-full ${className}`}
        style={{
            opacity,
            backgroundColor: gradient ? undefined : color,
            background: gradient,
            ...style,
        }}
    ></div>
);

export interface SectionContentProps {
    className?: string;
    children?: React.ReactNode;
    style?: CSSProperties;
}

export const SectionContent: FC<SectionContentProps> = ({ className, children, style }) => {
    return (
        <div
            className={cn`section__content relative container h-full mx-auto px-4 py-8 ${className}`}
            style={style}
        >
            {children}
        </div>
    );
};

export interface SectionProps<T extends ElementType> {
    as?: T;
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
}

export const Section = <T extends ElementType = 'section'>({
    className,
    style,
    children,
    as,
    ...rest
}: SectionProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof SectionProps<T>>) => {
    const Component = as || 'section';

    return (
        <Component className={cn`section relative ${className}`} style={style} {...rest}>
            {children}
        </Component>
    );
};

Section.Background = SectionBackground;
Section.Overlay = SectionOverlay;
Section.Content = SectionContent;

export default Section;

// https://codecoolture.com/blog/react-compound-components/
// https://github.com/codecoolture/tddworkshop.com/blob/trunk/pages/en/index.tsx
