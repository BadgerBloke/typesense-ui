'use server';

import { client } from '~/lib/services/typesense';

export const getCollections = async () => {
    return await client.collections().retrieve();
};
