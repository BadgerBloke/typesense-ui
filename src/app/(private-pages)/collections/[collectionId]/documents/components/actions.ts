'use server';

import { revalidatePath } from 'next/cache';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { redirect } from 'next/navigation';

import { client } from '~/lib/services/typesense';
import { Message } from '~/lib/utils/message-handler';
import { jsonToZodSchema } from '~/lib/utils/renderer/json-to-zod-schema';

import { FieldsType } from '../../../components/schema';

export const createDocument = async ({
    collectionSchema,
    values,
}: {
    collectionSchema: FieldsType;
    values: Record<string, unknown>;
}) => {
    try {
        const validationResult = jsonToZodSchema(collectionSchema).safeParse(values);
        if (!validationResult.success) return Message.error('Invalid data, please fix before resubmission');

        const res = await client
            .collections(values.collection as string)
            .documents()
            .upsert({ ...validationResult.data, id: values.id });
        if (res) {
            redirect(
                `/collections/${values.collection}/documents?message=${JSON.stringify(Message.success('Documents successfully saved'))}`
            );
        }
        return Message.error('Something went unexpected');
    } catch (error) {
        if (isRedirectError(error)) throw error;
        return Message.error((error as Error).message);
    }
};

export const deleteDocuments = async ({ id, collectionId }: { id: string; collectionId: string }) => {
    try {
        const res = await client.collections(collectionId).documents(id).delete();
        if (res) {
            revalidatePath(`/collections/${collectionId}/documents`);
            return Message.success('Documents successfully deleted');
        }
    } catch (error) {
        return Message.error((error as Error).message);
    }
};
