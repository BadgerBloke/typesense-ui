'use server';

import { revalidatePath } from 'next/cache';
import { v7 as uuid } from 'uuid';

import { client } from '~/lib/services/typesense';
import { Message } from '~/lib/utils/message-handler';

import { SynonymsSchema, SynonymsType } from './schema';

export const createAndUpdateSynonyms = async (values: SynonymsType & { collection: string }) => {
    try {
        const validationResult = SynonymsSchema.safeParse(values);
        if (!validationResult.success) return Message.error('Invalid data, please fix before resubmission');
        const res = await client
            .collections(values.collection)
            .synonyms()
            .upsert(validationResult.data.id || uuid(), validationResult.data);
        if (res) {
            revalidatePath(`/collections/${values.collection}/synonyms`);
            return Message.success('Synonyms successfully saved');
        }
        return Message.error('Something went unexpected');
    } catch (error) {
        return Message.error((error as Error).message);
    }
};

export const deleteSynonyms = async ({ id, collectionId }: { id: string; collectionId: string }) => {
    try {
        const res = await client.collections(collectionId).synonyms(id).delete();
        if (res.id) {
            revalidatePath(`/collections/${collectionId}/synonyms`);
            return Message.success('Synonyms successfully deleted');
        }
    } catch (error) {
        return Message.error((error as Error).message);
    }
};
