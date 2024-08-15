import Link from 'next/link';

import Typography from '~/components/atoms/typography';
import { buttonVariants } from '~/components/ui/button';
import { DocumentsDataType } from '~/lib/interfaces/table-data-type';
import { client } from '~/lib/services/typesense';
import { cn } from '~/lib/utils';

import { CollectionType } from '../../components/schema';

import DocumentsDataTable from './components/data-table';

const DocumentsPage = async ({ params: { collectionId } }: { params: { collectionId: string } }) => {
    const [documents, collection] = await Promise.all([
        client.collections(collectionId).documents().search({ q: '*' }, { cacheSearchResultsForSeconds: 0 }),
        client.collections(collectionId).retrieve(),
    ]);

    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-1 gap-4 p-4 md:gap-8 md:p-10">
                <Typography variant="h1" className="text-3xl font-semibold">
                    Documents
                </Typography>
                <Link href="documents/add" className={cn(buttonVariants(), 'w-fit ml-auto')}>
                    Create document
                </Link>
            </div>
            {documents.found ? (
                <DocumentsDataTable
                    documents={documents.hits as unknown as DocumentsDataType[]}
                    collection={collection as CollectionType}
                />
            ) : (
                <div className="flex flex-1 bg-muted/25 p-6 items-center justify-center rounded-lg border border-dashed shadow-sm">
                    <div className="flex flex-col items-center gap-1 text-center">
                        <h3 className="text-2xl font-bold tracking-tight">You have no Documents</h3>
                        <p className="text-sm text-muted-foreground">You can create a document by clicking below button.</p>
                        <Link href={`/collections/${collectionId}/documents/add`} className={cn(buttonVariants(), 'mt-4')}>
                            Create document
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DocumentsPage;
