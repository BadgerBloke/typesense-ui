import { z } from 'zod';

import { DataType, Locales } from './constant';

const dataTypes = DataType.map(dt => dt.value);
const locales = Locales.map(l => l.value);

export const FieldsSchema = z
    .array(
        z.object({
            _id: z.string().uuid().optional(),
            name: z
                .string({ required_error: 'Name is required' })
                .min(1, 'Name must be minimum 1 characters long.')
                .max(36, 'Name cannot be longer than 36 characters'),
            type: z.enum([dataTypes[0], ...dataTypes.slice(1)], {
                required_error: 'Type is required',
                invalid_type_error: 'Select an option',
            }),
            facet: z.boolean().optional(),
            index: z.boolean().optional(),
            optional: z.boolean().optional(),
            stem: z.boolean().optional(),
            locale: z.enum([locales[0], ...locales.slice(1), ''], { invalid_type_error: 'Select valid option' }).optional(),
            drop: z.boolean().optional(),
        })
    )
    .min(1, 'Add at least 1 field');

export const CollectionSchema = z
    .object({
        name: z
            .string({ required_error: 'Name is required' })
            .min(2, 'Name must be minimum 2 characters long.')
            .max(25, 'Name cannot be longer than 25 characters'),
        fields: FieldsSchema,
        default_sorting_field: z.string().optional(),
    })
    .refine(
        data => {
            if (data.default_sorting_field) {
                const fieldNames = data.fields.map(field => field.name);
                return fieldNames.includes(data.default_sorting_field);
            }
            return true;
        },
        {
            message: 'Default sorting field must be one of the field names',
            path: ['default_sorting_field'],
        }
    );

export type CollectionType = z.infer<typeof CollectionSchema>;
