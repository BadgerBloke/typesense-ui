import { z } from 'zod/v4';

export const deleteByIdSchema = z.object({
    id: z.string({ message: 'Document id is required' }).min(1, { message: 'Document id is required' }),
});
export type DeleteByIdSchema = z.infer<typeof deleteByIdSchema>;

export const deleteByQuerySchema = z.object({
    q: z.string({ message: 'Query is required' }).min(1, { message: 'Query is required' }),
});
export type DeleteByQuerySchema = z.infer<typeof deleteByQuerySchema>;
