'use server';

import { client } from '~/lib/services/typesense';

import { deleteByIdSchema } from './schema';

interface State {
    success: boolean;
    collectionId: string;
}

export const deleteById = async ({ collectionId }: State, formData: FormData) => {
    const result = deleteByIdSchema.safeParse(Object.fromEntries(formData));
    if (!result.success) {
        const flattenedIssues = result.error.flatten(issue => issue.message);
        return { success: false, collectionId, error: flattenedIssues.fieldErrors };
    }

    console.log({ collectionId, id: result.data.id });
    await client.collections(collectionId).documents(result.data.id).delete();
    return { success: true, collectionId };
};
