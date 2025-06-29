import { z } from 'zod/v4';

export const deleteByIdSchema = z.object({
    id: z.string({ message: 'Document id is required' }).min(1, { message: 'Document id is required' }),
});

export const deleteByQuerySchema = z.object({
    filter_by: z.string({ message: 'Query is required' }).min(1, { message: 'Query is required' }),
});
