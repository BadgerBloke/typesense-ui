export let collectionsData = {
    collections: [
        {
            name: 'Documents',
            num_documents: 100,
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
        },
        {
            name: 'Synonyms',
            num_documents: 100,
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
        },
    ],
};

export const loader = async () => {
    return collectionsData;
};
