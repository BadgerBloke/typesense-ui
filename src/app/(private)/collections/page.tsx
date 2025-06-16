import Link from 'next/link';

import { buttonVariants } from '~/components/ui/button';
import { client } from '~/lib/services/typesense';
import { cn } from '~/lib/utils';

import CollectionsList from './components/collections-list';

const Collections = async () => {
    const collections = await client.collections().retrieve();
    return collections.length ? (
        <CollectionsList collections={collections} />
    ) : (
        <div className="flex flex-1 bg-muted/25 items-center justify-center rounded-lg border border-dashed shadow-sm">
            <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-2xl font-bold tracking-tight">You have no collections</h3>
                <p className="text-sm text-muted-foreground">You can create a collection to start indexing the documents.</p>
                <Link href="/collections/add" className={cn(buttonVariants(), 'mt-4')}>
                    Create collection
                </Link>
            </div>
        </div>
    );
};

export default Collections;
