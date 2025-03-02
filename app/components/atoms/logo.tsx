import { cn } from '~/lib/utils';

import { useSidebar } from '../ui/sidebar';

import Typography, { typographyVariants } from './typography';

const Logo = () => {
    const { state } = useSidebar();
    return (
        <div className="relative flex w-full select-none">
            <Typography variant="lead" className={state === 'collapsed' ? 'hidden' : '-top-6 absolute text-primary'}>
                Typesense
            </Typography>
            {state === 'collapsed' ? (
                <span className={cn(typographyVariants({ variant: 'large' }), 'gradient-bg rounded-sm shrink-0 p-1')}>TC</span>
            ) : (
                <span className={cn(typographyVariants({ variant: 'tiny' }), 'absolute left-8 -bottom-4 gradient-bg px-1 rounded-sm shrink-0 py-0.5')}>
                    CONSOLE
                </span>
            )}
        </div>
    );
};

export default Logo;
