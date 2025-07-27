'use client';

import { useActionState } from 'react';
import { useParams } from 'next/navigation';

import { SubmissionResult, useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod/v4';

import FormInput from '~/components/form-elements/input';
import SubmitButton from '~/components/form-elements/submit';

import { deleteById } from './action';
import { deleteByIdSchema } from './schema';

const DeleteByIDForm = () => {
    const { collectionId } = useParams<{ collectionId: string }>();
    const [lastResult, formAction] = useActionState(deleteById, { collectionId });
    const [form, fields] = useForm({
        lastResult: lastResult as SubmissionResult,
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: deleteByIdSchema });
        },
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',
    });
    return (
        <form id={form.id} onSubmit={form.onSubmit} noValidate action={formAction} className="flex flex-col w-full gap-4">
            <FormInput field={fields.id} label="Document id" placeholder="111" />
            <SubmitButton>Delete</SubmitButton>
        </form>
    );
};

export default DeleteByIDForm;
