'use client';

import { useActionState } from 'react';
import { useParams } from 'next/navigation';

import { SubmissionResult, useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod/v4';

import Typography from '~/components/atoms/typography';
import FormInput from '~/components/form-elements/input';
import SubmitButton from '~/components/form-elements/submit';

import { deleteByQuery } from './action';
import { deleteByQuerySchema } from './schema';

const DeleteByQueryForm = () => {
    const { collectionId } = useParams<{ collectionId: string }>();
    const [lastResult, formAction] = useActionState(deleteByQuery, { collectionId });
    const [form, fields] = useForm({
        lastResult: lastResult as SubmissionResult,
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: deleteByQuerySchema });
        },
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',
    });

    return (
        <form id={form.id} onSubmit={form.onSubmit} noValidate action={formAction} className="flex flex-col w-full gap-4">
            <FormInput field={fields.filter_by} label="Deletion query" placeholder="field>=1" />
            <Typography variant="muted">
                Read the{' '}
                <a
                    href="https://typesense.org/docs/28.0/api/documents.html#arguments"
                    target="_blank"
                    className="text-primary no-underline"
                    rel="noreferrer"
                >
                    docs
                </a>{' '}
                for more information on available filter_by options.
            </Typography>
            <SubmitButton>Delete</SubmitButton>
        </form>
    );
};

export default DeleteByQueryForm;
