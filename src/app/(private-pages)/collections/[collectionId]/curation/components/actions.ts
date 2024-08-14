'use server';

import { revalidatePath } from 'next/cache';
import { v7 as uuid } from 'uuid';

import { client } from '~/lib/services/typesense';
import { Message } from '~/lib/utils/message-handler';

import { OverridesSchema, OverridesType } from './schema';

export const createAndUpdateOverrides = async (values: OverridesType & { collection: string }) => {
    try {
        const validationResult = OverridesSchema.safeParse(values);
        if (!validationResult.success) return Message.error('Invalid data, please fix before resubmission');
        const res = await client
            .collections(values.collection)
            .overrides()
            .upsert(validationResult.data.id || uuid(), validationResult.data);
        if (res) {
            revalidatePath(`/collections/${values.collection}/overrides`);
            return Message.success('Overrides successfully saved');
        }
        return Message.error('Something went unexpected');
    } catch (error) {
        return Message.error((error as Error).message);
    }
};

export const deleteOverrides = async ({ id, collectionId }: { id: string; collectionId: string }) => {
    try {
        const res = await client.collections(collectionId).overrides(id).delete();
        if (res.id) {
            revalidatePath(`/collections/${collectionId}/overrides`);
            return Message.success('Overrides successfully deleted');
        }
    } catch (error) {
        return Message.error((error as Error).message);
    }
};
