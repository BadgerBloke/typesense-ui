'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { client } from '~/lib/services/typesense';
import { Message } from '~/lib/utils/message-handler';

import { CollectionSchema, CollectionType } from './schema';

export const createCollection = async (params: CollectionType) => {
    const validationResult = CollectionSchema.safeParse(params);

    if (!validationResult.success) return Message.error(JSON.stringify(validationResult.error.flatten().fieldErrors));

    const d = validationResult.data;
    d.fields.map(f => {
        delete f['_id'];
        return f;
    });

    await client.collections().create(d);
    redirect('/collections');
};

export const deleteCollection = async ({ name }: { name: string }) => {
    const res = await client.collections(name).delete();
    revalidatePath('/collections');
    return res;
};
