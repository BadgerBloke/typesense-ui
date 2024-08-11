import { notFound } from 'next/navigation';

import Typography from '~/components/atoms/typography';
import { client } from '~/lib/services/typesense';

import { SynonymsType } from '../components/schema';
import SynonymsIngestionForm from '../components/synonyms-ingestion-form';

const SynonymsUpdatePage = async ({
    params: { collectionId },
    searchParams,
}: {
    params: { collectionId: string };
    searchParams: { id?: string };
}) => {
    if (!searchParams.id) notFound();
    const defaultData = await client.collections(collectionId).synonyms(searchParams.id).retrieve();
    return (
        <div className="flex h-full w-full flex-col gap-8">
            <div className="flex flex-1 flex-col gap-4 bg-muted/40 rounded-lg p-4 md:gap-8 md:p-10">
                <Typography variant="h1" className="text-3xl font-semibold">
                    Synonyms
                </Typography>
                <SynonymsIngestionForm defaultData={defaultData as unknown as SynonymsType} collectionId={collectionId} />
            </div>
        </div>
    );
};

export default SynonymsUpdatePage;
