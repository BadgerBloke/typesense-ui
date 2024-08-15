import { z } from 'zod';

import { FieldsType } from '~/app/(private-pages)/collections/components/schema';

export const jsonToZodSchema = (fields: FieldsType): z.ZodSchema<Record<string, z.ZodTypeAny>> => {
    const schemaShape: Record<string, z.ZodTypeAny> = {};

    for (const field of fields) {
        let fieldSchema: z.ZodTypeAny;

        switch (field.type) {
            case 'bool':
                fieldSchema = z.boolean();
                break;
            case 'bool[]':
                fieldSchema = z.array(z.boolean());
                break;
            case 'auto':
            case 'string':
            case 'string*':
            case 'image':
                fieldSchema = z.string();
                break;
            case 'string[]':
                fieldSchema = z.array(z.string());
                break;
            case 'int32':
            case 'int64':
                fieldSchema = z.union([z.number(), z.string().transform(Number)]);
                break;
            case 'int32[]':
            case 'int64[]':
                fieldSchema = z.array(z.union([z.number(), z.string().transform(Number)]));
                break;
            case 'float':
                fieldSchema = z.union([z.number(), z.string().transform(parseFloat)]);
                break;
            case 'float[]':
                fieldSchema = z.array(z.union([z.number(), z.string().transform(parseFloat)]));
                break;
            case 'object':
                fieldSchema = z.record(z.union([z.string(), z.number()])); // TODO: value type can be different.
                break;
            case 'object[]':
                fieldSchema = z.array(z.record(z.union([z.string(), z.number()]))); // TODO: value type can be different.
                break;
            case 'geopoint':
                fieldSchema = z.array(z.string().transform(parseFloat)).length(2);
                break;
            case 'geopoint[]':
                fieldSchema = z.array(z.array(z.string().transform(parseFloat)).length(2));
                break;
            default:
                fieldSchema = z.unknown();
                break;
        }

        if (field.optional) {
            fieldSchema = fieldSchema.optional();
        }

        schemaShape[field.name] = fieldSchema;
    }

    return z.object(schemaShape);
};
