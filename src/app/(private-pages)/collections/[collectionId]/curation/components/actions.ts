'use server';

import { revalidatePath } from 'next/cache';
import { OverrideCreateSchema } from 'typesense/lib/Typesense/Overrides';

import { client } from '~/lib/services/typesense';
import { Message } from '~/lib/utils/message-handler';

import { OverridesSchema, OverridesType } from './schema';

export const createAndUpdateOverrides = async (values: OverridesType & { collection: string }) => {
    try {
        const validationResult = OverridesSchema.safeParse(values);
        if (!validationResult.success) return Message.error('Invalid data, please fix before resubmission');

        delete validationResult.data.customMetadata;
        delete validationResult.data.effectiveFrom;
        delete validationResult.data.effectiveTo;
        delete validationResult.data.filterDocuments;
        delete validationResult.data.hideDocuments;
        delete validationResult.data.pinDocuments;
        delete validationResult.data.replaceDocuments;
        delete validationResult.data.sortDocuments;
        delete validationResult.data.rule?.curateByFilter;
        delete validationResult.data.rule?.curateByQuery;
        delete validationResult.data.rule?.curateByTags;

        const res = await client
            .collections(values.collection)
            .overrides()
            .upsert(validationResult.data.id, validationResult.data as unknown as OverrideCreateSchema);
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
