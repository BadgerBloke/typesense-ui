import { useFetcher } from 'react-router';

const AddCollectionPage = () => {
    const fetcher = useFetcher({ key: 'collections' });
    return (
        <>
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="bg-muted/50 aspect-video rounded-xl">
                    <pre>{JSON.stringify(fetcher.data, null, 2)}</pre>
                </div>
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="flex-1 bg-muted/50 aspect-video rounded-xl">
                    <fetcher.Form method="post" action="/collections/add">
                        <input
                            type="hidden"
                            name="name"
                            value={JSON.stringify({
                                name: 'New Collection',
                                num_documents: 0,
                                fields: [
                                    {
                                        name: 'id',
                                        type: 'string',
                                        facet: false,
                                        optional: false,
                                    },
                                    {
                                        name: 'title',
                                        type: 'string',
                                        facet: true,
                                        optional: false,
                                    },
                                    {
                                        name: 'description',
                                        type: 'string',
                                        facet: false,
                                        optional: false,
                                    },
                                ],
                            })}
                        />
                        <button type="submit">Add Collection</button>
                    </fetcher.Form>
                </div>
            </div>
            <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </>
    );
};

export default AddCollectionPage;
