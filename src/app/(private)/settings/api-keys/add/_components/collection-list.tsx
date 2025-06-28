import Link from 'next/link';
import { CollectionSchema } from 'typesense/lib/Typesense/Collection';

import { buttonVariants } from '~/components/ui/button';
import { Checkbox } from '~/components/ui/checkbox';
import { Label } from '~/components/ui/label';
import { cn } from '~/lib/utils';

const CollectionList = ({ collections }: { collections: CollectionSchema[] }) => {
    return collections?.length ? (
        collections.map(collection => (
            <div key={collection.name} className="flex items-center space-x-2">
                <Checkbox id={collection.name} value={collection.name} name="collections" />
                <Label
                    htmlFor={collection.name}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    {collection.name}
                </Label>
            </div>
        ))
    ) : (
        <div className="flex flex-1 m-auto w-fit items-center justify-center rounded-lg my-5 border border-dashed shadow-sm">
            <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-2xl font-bold tracking-tight">You have no collection</h3>
                <p className="text-sm text-muted-foreground">
                    If you create an API key now, it will have access to all future collections.
                    <br />
                    To restrict access, please create the collections first.
                </p>
                <Link href="/collections/add" className={cn(buttonVariants(), 'mt-4')}>
                    Create collection
                </Link>
            </div>
        </div>
    );
};

export default CollectionList;
