import Typography from '~/components/atoms/typography';
import { client } from '~/lib/services/typesense';
import { addFieldIds } from '~/lib/utils';

import CollectionUpdateForm from './components/collection-update-form';

const EditCollectionPage = async ({ params: { collectionId } }: { params: { collectionId: string } }) => {
    const collection = await client.collections(collectionId).retrieve();

    return (
        <div className="flex flex-col gap-10 xl:flex-row xl:gap-8 w-full">
            <CollectionUpdateForm collection={addFieldIds(collection) || []} collectionName={collectionId} />
            <div className="bg-muted/10 flex flex-col gap-6">
                <Typography variant="lead">Existing schema</Typography>
                <pre>{JSON.stringify(collection, undefined, 2)}</pre>
            </div>
        </div>
    );
};

export default EditCollectionPage;
