import Link from 'next/link';
import { notFound } from 'next/navigation';

import Typography from '~/components/atoms/typography';
import CopyButton from '~/components/molecules/copy-button';
import { buttonVariants } from '~/components/ui/button';
import { cn } from '~/lib/utils';

const AddApiKeySuccessPage = async ({ searchParams }: { searchParams: Promise<{ message?: string }> }) => {
    const { message } = await searchParams;

    if (!message) notFound();
    return (
        <div className="flex flex-1 p-6 w-full items-center justify-center rounded-lg my-5 border border-dashed shadow-sm">
            <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-2xl font-bold tracking-tight">Api Key successfully created!</h3>
                <p className="text-sm text-muted-foreground">
                    Copy the API Key and keep it safe. You will not be able to see it again.
                </p>
                <div className="flex gap-3 items-center mt-3">
                    <Typography variant="code" className="shadow-sm px-2">
                        {message}
                    </Typography>
                    <CopyButton>{message}</CopyButton>
                </div>
                <Link href="/settings/api-keys" className={cn(buttonVariants(), 'mt-6')}>
                    View API Keys
                </Link>
            </div>
        </div>
    );
};

export default AddApiKeySuccessPage;
