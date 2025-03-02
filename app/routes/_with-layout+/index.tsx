export { default } from '~/components/pages/_with-layout/home-page';

import { data } from 'react-router';

export const loader = async () => {
    console.log('Loader data from get-collections');
    return data({
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
    });
};

export function meta() {
    return [{ title: 'Typesense Console | Developed by MKSingh' }, { name: 'description', content: 'Typesense Console | Developed by MKSingh' }];
}
