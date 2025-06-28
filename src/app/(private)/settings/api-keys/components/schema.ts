import { z } from 'zod/v4';

import { API_ACTIONS } from '~/lib/constants/api-actions';
import { extractAllIds } from '~/lib/utils';

const actionValues = extractAllIds(API_ACTIONS);

export const APIKeySchema = z.object({
    description: z
        .string({ message: 'Description is required!' })
        .min(5, { message: 'Provide minimum 5 characters description.' })
        .max(155, { message: 'Description should not be more than 155 characters.' }),
    actions: z
        .array(z.enum([actionValues[0], ...actionValues.slice(1)]), { message: 'Actions are required!' })
        .min(1, { message: 'Provide at least one action.' }),
    collections: z
        .array(z.string(), { message: 'Collections are required!' })
        .min(1, { message: 'Provide at least one collection.' }),
    expires_at: z.string({ message: 'Expiration date is required!' }).transform(Number),
    autodelete: z
        .literal('on')
        .optional()
        .transform(val => val === 'on'),
});

export type APIKeySchemaType = z.infer<typeof APIKeySchema>;
