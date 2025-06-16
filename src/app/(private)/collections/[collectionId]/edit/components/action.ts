'use server';

import { redirect } from 'next/navigation';

import { client } from '~/lib/services/typesense';
import { Message } from '~/lib/utils/message-handler';

import { CollectionType, FieldsSchema } from '../../../components/schema';

interface UpdateCollectionParams {
    values: CollectionType['fields'];
    collectionName: string;
}

export const updateCollection = async (params: UpdateCollectionParams) => {
    const { values, collectionName } = params;
    console.log({ values });
    const validationResult = FieldsSchema.safeParse(values);

    if (!validationResult.success) return Message.error(JSON.stringify(validationResult.error.flatten().fieldErrors));

    const d = validationResult.data;
    d.map(f => {
        delete f['_id'];
        return f;
    });

    console.log({ d });

    await client.collections(collectionName).update({ fields: d });
    redirect('/collections');
};
