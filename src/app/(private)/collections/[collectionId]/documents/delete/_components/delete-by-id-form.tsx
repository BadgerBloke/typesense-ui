'use client';

import { useActionState } from 'react';
import { useParams } from 'next/navigation';

import Form from '~/components/form-elements/form';
import FormInput from '~/components/form-elements/input';
import SubmitButton from '~/components/form-elements/submit';

import { deleteById } from './action';
import { deleteByIdSchema } from './schema';

const DeleteByIDForm = () => {
    const { collectionId } = useParams<{ collectionId: string }>();
    const [, formAction] = useActionState(deleteById, { success: false, collectionId });
    return (
        <Form schema={deleteByIdSchema} action={formAction}>
            <FormInput label="Document id" name="id" placeholder="Enter a document id" />
            <SubmitButton>Delete</SubmitButton>
        </Form>
    );
};

export default DeleteByIDForm;
