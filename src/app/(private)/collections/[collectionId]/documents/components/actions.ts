'use server';

import { revalidatePath } from 'next/cache';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { redirect } from 'next/navigation';

import { FieldsType } from '~/app/(private)/collections/components/schema';
import { TYPESENSE } from '~/lib/config';
import { client } from '~/lib/services/typesense';
import { Message } from '~/lib/utils/message-handler';
import { jsonToZodSchema } from '~/lib/utils/renderer/json-to-zod-schema';

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

export const searchDocuments = async ({
    q,
    queryBy,
    collectionId,
}: {
    q: string;
    queryBy: string;
    collectionId: string;
}) => {
    try {
        return await client
            .collections(collectionId)
            .documents()
            .search({ q, query_by: queryBy }, { cacheSearchResultsForSeconds: 0 });
    } catch {
        return;
    }
};

type ExportDocumentsResponse =
    | {
          success: true;
          data: string;
          filename: string;
      }
    | {
          success: false;
          error: string;
      };

export const exportDocuments = async ({ collectionId }: { collectionId: string }): Promise<ExportDocumentsResponse> => {
    try {
        const response = await fetch(`${TYPESENSE.url}/collections/${collectionId}/documents/export`, {
            method: 'GET',
            headers: {
                'X-TYPESENSE-API-KEY': TYPESENSE.apiKey,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.text();

        const timestamp = new Date().toLocaleString().replace(/[/, :.]+/g, '-');
        return {
            success: true,
            data,
            filename: `documents-export-${collectionId}-${timestamp}.jsonl`,
        };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred',
        };
    }
};
