import { ComponentProps } from 'react';

import { Field } from '@base-ui-components/react/field';

interface FormInputProps extends ComponentProps<'input'> {
    label: string;
}

const FormInput = ({ name, label, ...props }: FormInputProps) => {
    return (
        <Field.Root
            name={name}
            className="w-full border-input shadow-sm bg-background focus-within:border-ring focus-within:ring-ring/50 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40 has-aria-invalid:border-destructive relative rounded-md border transition-[color,box-shadow] outline-none focus-within:ring-[3px] has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 has-[input:is(:disabled)]:*:pointer-events-none"
        >
            <Field.Label className="w-full text-foreground block px-3 pt-2 text-xs font-medium">{label}</Field.Label>
            <Field.Control
                className="text-foreground placeholder:text-muted-foreground/70 flex h-10 w-full bg-transparent px-3 pb-2 text-sm focus-visible:outline-none"
                {...props}
            />
            <Field.Error className="w-full block px-3 pb-2 text-xs text-destructive" />
        </Field.Root>
    );
};

export default FormInput;
