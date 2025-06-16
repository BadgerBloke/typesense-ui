'use client';

import { useFormState, useFormStatus } from 'react-dom';

import { IconLoader2, IconTrash } from '@tabler/icons-react';

import { Button } from '~/components/ui/button';
import { dispatchToast } from '~/lib/utils/message-handler';

import { deleteAPIKey } from './action';

const ApiKeyDeleteButton = ({ apiKeyId }: { apiKeyId: number }) => {
    const { pending } = useFormStatus();
    const [state, formAction] = useFormState(deleteAPIKey, { isResponse: false, apiKeyId, error: {}, success: false });

    if (state.isResponse) {
        if (state.success) {
            dispatchToast({ type: 'success', message: `API Key with ID: ${state.apiKeyId} successfully deleted` });
        } else {
            dispatchToast({ type: 'error', message: state.error.message! });
        }
    }
    return (
        <form action={formAction}>
            <Button disabled={pending} size="icon" variant="ghost">
                {pending ? (
                    <IconLoader2 className="h-4 w-4 animate-spin" />
                ) : (
                    <IconTrash className="h-4 w-4 text-rose-500" />
                )}
            </Button>
        </form>
    );
};

export default ApiKeyDeleteButton;
