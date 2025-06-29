'use server';

import { redirect } from 'next/navigation';

import { parseWithZod } from '@conform-to/zod/v4';

import { client } from '~/lib/services/typesense';

import { deleteByIdSchema, deleteByQuerySchema } from './schema';

interface State {
    collectionId: string;
}

export const deleteById = async (prevState: unknown, formData: FormData) => {
    const { collectionId } = prevState as State;
    const result = parseWithZod(formData, { schema: deleteByIdSchema });
    if (result.status !== 'success') {
        return result.reply();
    }

    const res = await client.collections(collectionId).documents(result.value.id).delete();
    return (res as { id: string }).id === result.value.id
        ? redirect(`/collections/${collectionId}/documents`)
        : { collectionId };
};

export const deleteByQuery = async (prevState: unknown, formData: FormData) => {
    const { collectionId } = prevState as State;
    const result = parseWithZod(formData, { schema: deleteByQuerySchema });
    if (result.status !== 'success') {
        return result.reply();
    }

    const res = await client.collections(collectionId).documents().delete(result.value);
    return res.num_deleted ? redirect(`/collections/${collectionId}/documents`) : { collectionId };
};
