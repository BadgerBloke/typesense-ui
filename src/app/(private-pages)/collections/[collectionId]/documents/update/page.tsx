import { notFound } from 'next/navigation';

import Typography from '~/components/atoms/typography';
import { client } from '~/lib/services/typesense';

import { CollectionType } from '../../../components/schema';
import DocumentsIngestionForm from '../components/documents-ingestion-form';

const DocumentUpdatePage = async ({
    params: { collectionId },
    searchParams,
}: {
    params: { collectionId: string };
    searchParams: { id?: string };
}) => {
    if (!searchParams.id) notFound();
    const [defaultData, collection] = await Promise.all([
        client.collections(collectionId).documents(searchParams.id).retrieve(),
        client.collections(collectionId).retrieve(),
    ]);
    return (
        <div className="flex h-full w-full flex-col gap-8">
            <div className="flex flex-col gap-4 bg-muted/40 rounded-lg p-4 md:gap-8 md:p-10 w-full">
                <Typography variant="h1" className="text-3xl font-semibold">
                    Document
                </Typography>
                <DocumentsIngestionForm
                    defaultData={defaultData as { [x: string]: string }}
                    collectionSchema={collection as unknown as CollectionType}
                />
            </div>
        </div>
    );
};

export default DocumentUpdatePage;
