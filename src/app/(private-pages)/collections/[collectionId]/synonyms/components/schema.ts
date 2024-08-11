import { z } from 'zod';

export const SynonymsSchema = z.object({
    id: z.string().optional(),
    root: z.string().optional(),
    synonyms: z.array(z.string().min(1, 'Synonyms is required')).min(1, 'At least one synonyms needs to be added'),
    locale: z.string().optional(),
    symbols_to_index: z.array(z.string()).optional(),
});

export type SynonymsType = z.infer<typeof SynonymsSchema>;
