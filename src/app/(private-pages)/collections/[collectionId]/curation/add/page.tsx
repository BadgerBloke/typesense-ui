import Typography from '~/components/atoms/typography';

import OverridesIngestionForm from '../components/overrides-ingestion-form';

const CurationAddPage = async ({ params: { collectionId } }: { params: { collectionId: string } }) => {
    return (
        <div className="flex h-full w-full flex-col gap-8">
            <div className="flex flex-1 flex-col gap-4 bg-muted/40 rounded-lg p-4 md:gap-8 md:p-10">
                <Typography variant="h1" className="text-3xl font-semibold">
                    Curation
                </Typography>
                <OverridesIngestionForm collectionId={collectionId} />
            </div>
        </div>
    );
};

export default CurationAddPage;
