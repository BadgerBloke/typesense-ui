import { z } from 'zod';

import { API_ACTIONS } from '~/lib/constants/api-actions';

const actionValues = Object.values(API_ACTIONS)
    .flat()
    .map(action => action.value);

export const APIKeySchema = z.object({
    description: z
        .string({ required_error: 'Description is required!' })
        .min(5, 'Provide minimum 5 characters description.')
        .max(155, 'Description should not be more than 155 characters.'),
    actions: z.array(z.enum([actionValues[0], ...actionValues.slice(1)])).min(1),
    collections: z.array(z.string()).min(1),
    expires_at: z.number().refine(timestamp => timestamp > Math.floor(Date.now() / 1000), {
        message: 'Expiration date must be in the future.',
    }),
    autodelete: z.union([z.enum(['on']), z.boolean()]),
});

export type APIKeySchemaType = z.infer<typeof APIKeySchema>;
