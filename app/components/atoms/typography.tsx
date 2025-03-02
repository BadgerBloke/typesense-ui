import React, { type JSX } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/lib/utils';

export type TypographyVariant = 'hero' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'blockquote' | 'code' | 'lead' | 'large' | 'small' | 'muted' | 'tiny';

// Mapping of variants to their default HTML elements
const variantElementMap: Record<TypographyVariant, keyof JSX.IntrinsicElements> = {
    hero: 'h1',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    p: 'p',
    blockquote: 'blockquote',
    code: 'code',
    lead: 'p',
    large: 'div',
    small: 'small',
    muted: 'p',
    tiny: 'span',
};

// Define typography variants using cva
export const typographyVariants = cva('', {
    variants: {
        variant: {
            hero: 'scroll-m-20 font-extrabold tracking-wider text-[4.5em] lg:text-[6em]',
            h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
            h2: 'scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0',
            h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
            h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
            p: 'leading-7 [&:not(:first-child)]:mt-6',
            blockquote: 'mt-6 border-l-2 pl-6 italic',
            code: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
            lead: 'text-xl text-muted-foreground',
            large: 'text-lg font-semibold',
            small: 'text-sm font-medium leading-none',
            muted: 'text-sm text-muted-foreground',
            tiny: 'text-[10px] leading-3 text-muted-foreground',
        },
    },
    defaultVariants: {
        variant: 'p',
    },
});

// Extract variant props from the cva function
export type TypographyProps = React.HTMLAttributes<HTMLElement> &
    VariantProps<typeof typographyVariants> & {
        as?: keyof JSX.IntrinsicElements;
    };

const Typography = ({ variant = 'p', as, children, className, ...props }: TypographyProps) => {
    // Determine which element to render
    const Element = as || variantElementMap[variant as TypographyVariant];

    return React.createElement(
        Element,
        {
            className: cn(typographyVariants({ variant }), className),
            ...props,
        },
        children
    );
};

export { Typography };
export default Typography;
