import { notFound } from 'next/navigation';

import Typography from '~/components/atoms/typography';
import { client } from '~/lib/services/typesense';

import OverridesIngestionForm from '../components/overrides-ingestion-form';
import { OverridesType } from '../components/schema';

const CurationUpdatePage = async ({
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
                    Curation
                </Typography>
                <OverridesIngestionForm defaultData={defaultData as unknown as OverridesType} collectionId={collectionId} />
            </div>
        </div>
    );
};

export default CurationUpdatePage;
