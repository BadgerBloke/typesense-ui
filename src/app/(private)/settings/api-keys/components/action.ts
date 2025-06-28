'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { KeySchema } from 'typesense/lib/Typesense/Key';

import { client } from '~/lib/services/typesense';
import { cleanupActions } from '~/lib/utils';

import { APIKeySchema, APIKeySchemaType } from './schema';

export type State = {
    error: {
        collections?: string[] | undefined;
        description?: string[] | undefined;
        actions?: string[] | undefined;
        expires_at?: string[] | undefined;
        autodelete?: string[] | undefined;
    };
    data?: KeySchema;
};

export const createAPIKey = async (state: State, formData: FormData) => {
    const formObject = Object.fromEntries(formData.entries()) as unknown as APIKeySchemaType;
    formObject.collections = formData.getAll('collections') as string[];
    formObject.actions = cleanupActions(formData.getAll('actions') as string[]);

    if (formObject.collections.length === 0) formObject.collections = ['*'];
    const validationResult = APIKeySchema.safeParse(formObject);

    if (!validationResult.success)
        return {
            error: validationResult.error?.flatten().fieldErrors,
        };

    const keys = await client.keys().create(validationResult.data);
    redirect(`/settings/api-keys/add/success?message=${keys.value}`);
};

export const deleteAPIKey = async (state: {
    isResponse: boolean;
    apiKeyId?: number;
    error: { message?: string };
    success?: boolean;
}) => {
    if (isNaN(state.apiKeyId as number))
        return { error: { message: 'API Key ID is required' }, isResponse: true, success: false };

    await client.keys(state.apiKeyId as number).delete();

    revalidatePath('/settings/api-keys');
    return { isResponse: true, success: true, error: {}, apiKeyId: state.apiKeyId };
};
