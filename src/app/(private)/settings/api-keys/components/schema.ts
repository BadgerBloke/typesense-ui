import { z } from 'zod';

import { API_ACTIONS } from '~/lib/constants/api-actions';
import { extractAllIds } from '~/lib/utils';

const actionValues = extractAllIds(API_ACTIONS);

export const APIKeySchema = z
    .object({
        description: z
            .string({ required_error: 'Description is required!' })
            .min(5, 'Provide minimum 5 characters description.')
            .max(155, 'Description should not be more than 155 characters.'),
        actions: z.array(z.enum([actionValues[0], ...actionValues.slice(1)])).min(1),
        collections: z.array(z.string()).min(1),
        expires_at: z
            .string()
            .optional()
            .transform(val => (val ? Number(val) : undefined)),
        autodelete: z
            .literal('on')
            .optional()
            .transform(val => (val ? val === 'on' : undefined)),
    })
    .refine(
        data => {
            if (data.autodelete) {
                return data.expires_at !== undefined && data.expires_at > Math.floor(Date.now() / 1000);
            }
            return true;
        },
        {
            message: 'Expiration date is required and must be in the future when autodelete is enabled.',
            path: ['expires_at'],
        }
    );

export type APIKeySchemaType = z.infer<typeof APIKeySchema>;
