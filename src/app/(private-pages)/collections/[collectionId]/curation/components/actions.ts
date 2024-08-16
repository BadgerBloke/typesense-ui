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

        !validationResult.data.customMetadata && delete validationResult.data.metadata;
        delete validationResult.data.customMetadata;

        !validationResult.data.effectiveFrom && delete validationResult.data.effective_from_ts;
        delete validationResult.data.effectiveFrom;

        !validationResult.data.effectiveTo && delete validationResult.data.effective_to_ts;
        delete validationResult.data.effectiveTo;

        !validationResult.data.filterDocuments && delete validationResult.data.filter_by;
        delete validationResult.data.filterDocuments;

        !validationResult.data.hideDocuments && delete validationResult.data.excludes;
        delete validationResult.data.hideDocuments;

        !validationResult.data.pinDocuments && delete validationResult.data.includes;
        delete validationResult.data.pinDocuments;

        !validationResult.data.replaceDocuments && delete validationResult.data.replace_query;
        delete validationResult.data.replaceDocuments;

        !validationResult.data.sortDocuments && delete validationResult.data.sort_by;
        delete validationResult.data.sortDocuments;

        !validationResult.data.rule?.curateByFilter && delete validationResult.data.rule?.filter_by;
        delete validationResult.data.rule?.curateByFilter;

        !validationResult.data.rule?.curateByQuery && delete validationResult.data.rule?.query;
        !validationResult.data.rule?.curateByQuery && delete validationResult.data.rule?.match;
        delete validationResult.data.rule?.curateByQuery;

        !validationResult.data.rule?.curateByTags && delete validationResult.data.rule?.tags;
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

export const getDocuments = async ({ q, collection, queryBy }: { q: string; collection: string; queryBy: string }) => {
    try {
        const res = await client
            .collections(collection)
            .documents()
            .search({ q: `${q}*`, query_by: queryBy }, { cacheSearchResultsForSeconds: 60 });
        if (res.found) {
            return (res.hits as { document: { id: string } }[])?.map(d => ({
                ...d.document,
                value: d.document.id,
                label: d.document[queryBy.split(',')[0] as 'id'],
            }));
        }
        return [];
    } catch (error) {
        return [];
    }
};
