'use client';
import { ComponentProps, useState } from 'react';
import { z, ZodObject, ZodRawShape } from 'zod/v4';

import { Form as FormPrimitive } from '@base-ui-components/react/form';

interface FormProps<T extends ZodRawShape> extends Omit<ComponentProps<typeof FormPrimitive>, 'onSubmit'> {
    schema: ZodObject<T>;
    onSubmit?: (data: z.infer<ZodObject<T>>) => void;
}

const Form = <T extends ZodRawShape>({ schema, onSubmit, action, ...props }: FormProps<T>) => {
    const [errors, setErrors] = useState({});

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formDataObject = Object.fromEntries(formData);

        const result = schema.safeParse(formDataObject);

        if (!result.success) {
            const flattened = result.error.flatten(issue => issue.message);
            setErrors(flattened.fieldErrors);
            return;
        }

        setErrors({});
        onSubmit?.(result.data);
    };

    return (
        <FormPrimitive
            className="flex w-full flex-col gap-4"
            errors={errors}
            onClearErrors={setErrors}
            onSubmit={handleSubmit}
            {...props}
        />
    );
};

export default Form;
