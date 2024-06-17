'use server';

import { revalidatePath } from 'next/cache';

import { client } from '~/lib/services/typesense';

import { APIKeySchema, APIKeySchemaType } from './schema';

export const createAPIKey = (pathname: string, formData: FormData) => {
    const formObject = Object.fromEntries(formData.entries()) as unknown as APIKeySchemaType;
    formObject.actions = formData.getAll('actions') as string[];
    formObject.collections = formData.getAll('collections') as string[];
    formObject.expires_at = parseInt(formObject.expires_at as unknown as string, 10);

    formObject.collections.length === 0 ? (formObject.collections = ['*']) : null;
    const validationResult = APIKeySchema.safeParse(formObject);

    if (!validationResult.success) return { error: validationResult.error.format() };

    const keys = client.keys().create(validationResult.data);
    revalidatePath(pathname);
    return keys;
};
