'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';

import { CollectionType } from '~/app/(private-pages)/collections/components/schema';
import { DocumentsDataType } from '~/lib/interfaces/table-data-type';
import { client } from '~/lib/services/typesense';
import { Message } from '~/lib/utils/message-handler';
import { jsonToZodSchema } from '~/lib/utils/renderer/json-to-zod-schema';

export const uploadBulkDocuments = async ({
    data,
    collection,
}: {
    data: DocumentsDataType[];
    collection: CollectionType;
}) => {
    const validationSchema = z.array(jsonToZodSchema(collection.fields)).min(1, 'At least one document is required.');
    const validationResult = validationSchema.safeParse(data);
    if (!validationResult.success) return Message.error(JSON.stringify(validationResult.error.flatten().fieldErrors));

    const res = await client.collections(collection.name).documents().import(validationResult.data, { action: 'upsert' });
    if (res) {
        const failedCases = res.filter(r => !r.success);
        if (failedCases?.length) {
            return Message.error(JSON.stringify(failedCases));
        }
        redirect(`/collections/${collection.name}/documents`);
    }
};
