import { z } from 'zod';

import { CollectionType } from '~/app/(private-pages)/collections/components/schema';

import { jsonToZodSchema } from './renderer/json-to-zod-schema';
import { dispatchToast } from './message-handler';

export const jsonReader = async (files: File[], collection: CollectionType['fields']) => {
    const validationSchema = z.array(jsonToZodSchema(collection));
    try {
        if (!files || files.length === 0) throw new Error('No file selected!');

        const file = files[0];
        const reader = new FileReader();
        const fileData = await new Promise<Uint8Array>((resolve, reject) => {
            reader.onload = e => {
                const json = JSON.parse(e.target?.result as string);
                resolve(json);
            };
            reader.onerror = readError => {
                reject(readError);
            };
            reader.readAsText(file); // Read the file content as a text string
        });

        return validationSchema.safeParse(fileData);
    } catch (error) {
        dispatchToast({ type: 'error', message: (error as Error).message });
        throw error; // Optionally rethrow the error if needed
    }
};
