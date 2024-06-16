import { cn } from '~/lib/utils';

export type TypographyVariant =
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'p'
    | 'blockquote'
    | 'code'
    | 'lead'
    | 'large'
    | 'small'
    | 'muted';

const Typography = ({
    variant,
    children,
    className,
}: {
    variant: TypographyVariant;
    children: React.ReactNode;
    className?: string;
}) => {
    switch (variant) {
        case 'h1': {
            return (
                <h1 className={cn('scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl', className)}>
                    {children}
                </h1>
            );
        }
        case 'h2': {
            return (
                <h2
                    className={cn(
                        'scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0',
                        className
                    )}
                >
                    {children}
                </h2>
            );
        }
        case 'h3': {
            return <h3 className={cn('scroll-m-20 text-2xl font-semibold tracking-tight', className)}>{children}</h3>;
        }
        case 'h4': {
            return <h4 className={cn('scroll-m-20 text-xl font-semibold tracking-tight', className)}>{children}</h4>;
        }
        case 'p': {
            return <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}>{children}</p>;
        }
        case 'blockquote': {
            return <blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)}>{children}</blockquote>;
        }
        case 'code': {
            return (
                <code
                    className={cn(
                        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
                        className
                    )}
                >
                    {children}
                </code>
            );
        }
        case 'lead': {
            return <p className={cn('text-xl text-muted-foreground', className)}>{children}</p>;
        }
        case 'large': {
            return <div className={cn('text-lg font-semibold', className)}>{children}</div>;
        }
        case 'small': {
            return <small className={cn('text-sm font-medium leading-none', className)}>{children}</small>;
        }
        case 'muted': {
            return <p className={cn('text-sm text-muted-foreground', className)}>{children}</p>;
        }
        default: {
            return <></>;
        }
    }
};

export default Typography;
