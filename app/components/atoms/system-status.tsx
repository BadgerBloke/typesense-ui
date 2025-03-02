import { cva, type VariantProps } from 'class-variance-authority';
import { useFetcher } from 'react-router';

import { cn } from '~/lib/utils';

import { typographyVariants } from './typography';

const statusVariants = cva('', {
    variants: {
        status: {
            info: 'bg-info-foreground',
            success: 'bg-success-foreground',
            warning: 'bg-warning-foreground',
            error: 'bg-destructive-foreground',
        },
    },
    defaultVariants: {
        status: 'info',
    },
});

const statusLabelVariants = cva('', {
    variants: {
        status: {
            info: 'text-info-foreground',
            success: 'text-success-foreground',
            warning: 'text-warning-foreground',
            error: 'text-destructive-foreground',
        },
    },
    defaultVariants: {
        status: 'info',
    },
});

const statusMap: Record<string, { status: VariantProps<typeof statusVariants>['status']; message: string }> = {
    true: { status: 'info', message: 'Search engine is healthy' },
    false: { status: 'error', message: 'Search engine is not healthy' },
};

const SystemStatus = () => {
    const fetcher = useFetcher({ key: 'system-status' });

    if (typeof window !== 'undefined' && fetcher.state === 'idle' && !fetcher.data) {
        fetcher.load('/action/system-status');
    }
    return fetcher.data ? (
        <div
            className={cn(
                typographyVariants({ variant: 'tiny' }),
                statusLabelVariants({ status: statusMap[String(fetcher.data.ok)].status }),
                'mx-auto py-2 flex items-center gap-2 select-none'
            )}
        >
            <span
                className={cn(
                    statusVariants({ status: statusMap[String(fetcher.data.ok)].status }),
                    'size-2 rounded-full flex items-center justify-center overflow-visible'
                )}
            >
                <span
                    className={cn(statusVariants({ status: statusMap[String(fetcher.data.ok)].status }), 'size-3 rounded-full flex animate-ping shrink-0')}
                />
            </span>
            {statusMap[String(fetcher.data.ok)].message}
        </div>
    ) : null;
};

export default SystemStatus;
