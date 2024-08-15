import Link from 'next/link';

import Typography from '~/components/atoms/typography';
import DataTable from '~/components/molecules/data-table';
import { buttonVariants } from '~/components/ui/button';
import { OverridesDataType } from '~/lib/interfaces/table-data-type';
import { client } from '~/lib/services/typesense';
import { cn } from '~/lib/utils';

import { columns } from './components/overrides-data-table';

const SynonymsPage = async ({ params: { collectionId } }: { params: { collectionId: string } }) => {
    const { overrides } = await client.collections(collectionId).overrides().retrieve();
    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-1 gap-4 p-4 md:gap-8 md:p-10">
                <Typography variant="h1" className="text-3xl font-semibold">
                    Synonyms
                </Typography>
                <Link href="curation/add" className={cn(buttonVariants(), 'w-fit ml-auto')}>
                    Create curation
                </Link>
            </div>
            {overrides.length ? (
                <DataTable<OverridesDataType, keyof OverridesDataType> data={overrides} columns={columns} filterKey="id" />
            ) : (
                <div className="flex flex-1 bg-muted/25 p-6 items-center justify-center rounded-lg border border-dashed shadow-sm">
                    <div className="flex flex-col items-center gap-1 text-center">
                        <h3 className="text-2xl font-bold tracking-tight">You have no Synonyms</h3>
                        <p className="text-sm text-muted-foreground">You can create a curation by clicking below button.</p>
                        <Link href={`/collections/${collectionId}/curation/add`} className={cn(buttonVariants(), 'mt-4')}>
                            Create curation
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SynonymsPage;
