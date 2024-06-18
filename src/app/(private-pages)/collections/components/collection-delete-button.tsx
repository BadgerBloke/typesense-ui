'use client';
import { useTransition } from 'react';

import { IconLoader2, IconTrash } from '@tabler/icons-react';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '~/components/ui/alert-dialog';
import { Button } from '~/components/ui/button';
import { dispatchToast } from '~/lib/utils/message-handler';

import { deleteCollection } from './action';

const CollectionDeleteButton = ({ name }: { name: string }) => {
    const [pending, startTransition] = useTransition();

    const handleDelete = async () => {
        try {
            await startTransition(async () => {
                await deleteCollection({ name });
                dispatchToast({ type: 'success', message: 'Collection successfully deleted' });
            });
        } catch (error) {
            dispatchToast({ type: 'error', message: (error as Error).message });
        }
    };
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button disabled={pending} size="icon" variant="destructive">
                    {pending ? <IconLoader2 className="h-4 w-4 animate-spin" /> : <IconTrash className="h-4 w-4" />}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Permanently drops a collection. This action cannot be undone. For large collections, this might have
                        an impact on read latencies.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction variant="destructive" onClick={handleDelete}>
                        {pending ? 'Please wait...' : 'Continue'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default CollectionDeleteButton;
