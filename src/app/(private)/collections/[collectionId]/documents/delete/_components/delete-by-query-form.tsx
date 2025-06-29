'use client';

import Typography from '~/components/atoms/typography';
import Form from '~/components/form-elements/form';
import FormInput from '~/components/form-elements/input';
import SubmitButton from '~/components/form-elements/submit';

import { DeleteByQuerySchema, deleteByQuerySchema } from './schema';

const DeleteByQueryForm = () => {
    const handleSubmit = async (data: DeleteByQuerySchema) => {
        console.log({ data });
    };

    return (
        <Form schema={deleteByQuerySchema} onSubmit={handleSubmit}>
            <FormInput label="Query" name="q" placeholder="field>=1" />
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
        </Form>
    );
};

export default DeleteByQueryForm;
