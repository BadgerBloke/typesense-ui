'use server';
import { KeySchema } from 'typesense/lib/Typesense/Key';

import { client } from '~/lib/services/typesense';

import { APIKeySchema, APIKeySchemaType } from './schema';

export type State = {
    error: {
        collections?: string[] | undefined;
        description?: string[] | undefined;
        actions?: string[] | undefined;
        expires_at?: string[] | undefined;
        autodelete?: string[] | undefined;
    };
    pathname: string;
    data?: KeySchema;
    isResponse: boolean;
};

export const createAPIKey = async (state: State, formData: FormData) => {
    const formObject = Object.fromEntries(formData.entries()) as unknown as APIKeySchemaType;
    formObject.actions = formData.getAll('actions') as string[];
    formObject.collections = formData.getAll('collections') as string[];
    formObject.expires_at = parseInt(formObject.expires_at as unknown as string, 10);

    formObject.collections.length === 0 ? (formObject.collections = ['*']) : null;
    formObject.autodelete = formObject.autodelete === 'on' ? true : false;
    const validationResult = APIKeySchema.safeParse(formObject);

    if (!validationResult.success)
        return { error: validationResult.error.flatten().fieldErrors, pathname: state.pathname, isResponse: true };

    const keys = await client.keys().create(validationResult.data);
    return { data: keys, pathname: state.pathname, error: {}, isResponse: true };
};
