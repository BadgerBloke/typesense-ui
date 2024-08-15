import Typography from '~/components/atoms/typography';
import { client } from '~/lib/services/typesense';

import { CollectionType } from '../../../components/schema';
import DocumentsIngestionForm from '../components/documents-ingestion-form';

import BulkUploader from './components/bulk-uploader';

const DocumentAddPage = async ({ params: { collectionId } }: { params: { collectionId: string } }) => {
    const collectionSchema = await client.collections(collectionId).retrieve();

    // console.log('Collection Schema: ', documents.hits);
    return (
        <div className="flex h-full w-full flex-col gap-8 lg:flex-row">
            <div className="flex flex-col gap-4 bg-muted/40 rounded-lg p-4 md:gap-8 md:p-10 w-full">
                <Typography variant="h1" className="text-3xl font-semibold">
                    Document
                </Typography>
                <DocumentsIngestionForm collectionSchema={collectionSchema as unknown as CollectionType} />
            </div>
            <BulkUploader collection={collectionSchema as CollectionType} />
        </div>
    );
};

export default DocumentAddPage;
