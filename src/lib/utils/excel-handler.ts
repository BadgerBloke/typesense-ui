import { read, utils } from 'xlsx';
import { z } from 'zod';

import { CollectionType } from '~/app/(private-pages)/collections/components/schema';
import { dispatchToast } from '~/lib/utils/message-handler';

import { jsonToZodSchema } from './renderer/json-to-zod-schema';

export const excelReader = async (files: File[], collection: CollectionType['fields']) => {
    const validationSchema = z.array(jsonToZodSchema(collection));
    try {
        if (!files || files.length === 0) throw new Error('No file selected!');

        const file = files[0];
        const reader = new FileReader();

        // Wrap FileReader operations in a Promise
        const fileData = await new Promise<Uint8Array>((resolve, reject) => {
            reader.onload = e => {
                const data = new Uint8Array(e.target?.result as ArrayBuffer);
                resolve(data);
            };
            reader.onerror = readError => {
                reject(readError);
            };
            reader.readAsArrayBuffer(file);
        });

        const workbook = read(fileData, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        const range = utils.decode_range(worksheet['!ref'] || '');
        const headers: { [key: string]: string } = {};
        for (let col = range.s.c; col <= range.e.c; col++) {
            const cellAddress = utils.encode_cell({ r: range.s.r, c: col });
            const cell = worksheet[cellAddress];
            if (cell && cell.t === 's') {
                headers[cellAddress] = (cell.v as string).toCamelCase();
            }
        }

        for (const [cellAddress, header] of Object.entries(headers)) {
            worksheet[cellAddress].w = header;
        }

        const jsonData = utils.sheet_to_json(worksheet, { blankrows: false }) as { [k: string]: string | number }[];

        return validationSchema.safeParse(jsonData);
    } catch (error) {
        dispatchToast({ type: 'error', message: (error as Error).message });
        throw error; // Optionally rethrow the error if needed
    }
};
