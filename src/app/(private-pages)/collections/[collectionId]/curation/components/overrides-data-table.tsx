'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { IconPencil, IconRotateClockwise2, IconTrash } from '@tabler/icons-react';
import { ColumnDef } from '@tanstack/react-table';

import Typography from '~/components/atoms/typography';
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
import { Badge } from '~/components/ui/badge';
import { Button, buttonVariants } from '~/components/ui/button';
import { Checkbox } from '~/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { OverridesDataType } from '~/lib/interfaces/table-data-type';
import { cn } from '~/lib/utils';
import { dispatchToast } from '~/lib/utils/message-handler';

import { deleteOverrides } from './actions';

export const columns: ColumnDef<OverridesDataType>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={value => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'id',
        header: 'Overrides',
        cell: ({ row }) => (
            <div className="space-x-1.5 space-y-1.5">
                {(row.getValue('id') as string[]).map(s => (
                    <Badge key={s}>{s}</Badge>
                ))}
            </div>
        ),
    },
    {
        accessorKey: 'root',
        header: 'Root',
        cell: ({ row }) => (
            <div className="space-y-1.5">{row.getValue('root') || <Typography variant="muted">NA</Typography>}</div>
        ),
    },
    {
        accessorKey: 'symbols_to_index',
        header: 'Symbols to index',
        cell: ({ row }) => (
            <div className="space-y-1.5">
                {(row.getValue('symbols_to_index') as string[] | undefined)?.join(', ') || (
                    <Typography variant="muted">None</Typography>
                )}
            </div>
        ),
    },
    {
        accessorKey: 'locale',
        header: 'Locale',
        cell: ({ row }) => (
            <div className="space-y-1.5">{row.getValue('locale') || <Typography variant="muted">Default</Typography>}</div>
        ),
    },
    {
        id: 'rowActions',
        enableHiding: false,
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <DotsHorizontalIcon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="flex flex-col gap-1">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                            <UpdateButton id={row.original.id} />
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            asChild
                            className={cn(buttonVariants({ variant: 'destructive' }), 'cursor-pointer w-full')}
                        >
                            <DeleteButton id={row.original.id} />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

const UpdateButton = ({ id }: { id: string }) => {
    const pathname = usePathname();
    return (
        <Link
            className={cn(buttonVariants(), 'cursor-pointer w-full')}
            href={`/collections/${pathname.split('/')[2]}/synonyms/update?id=${id}`}
        >
            <IconPencil className="w-4 h-4 mr-2" />
            Update
        </Link>
    );
};

const DeleteButton = ({ id }: { id: string }) => {
    const [pending, setPending] = useState(false);
    const pathname = usePathname();
    const handleDelete = async () => {
        try {
            setPending(true);
            const res = await deleteOverrides({ id, collectionId: pathname.split('/')[2] });
            if (res) {
                dispatchToast(res);
            }
        } catch (error) {
            dispatchToast({ type: 'error', message: (error as Error).message });
        } finally {
            setPending(false);
        }
    };
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive">
                    <IconTrash className="w-4 h-4 mr-2" />
                    Remove
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>This will delete the Overrides.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button variant="destructive" onClick={handleDelete} disabled={pending}>
                            {pending ? (
                                <IconRotateClockwise2 className="animate-spin h-4 w-4 mr-2" />
                            ) : (
                                <IconTrash className="h-4 w-4 mr-2" />
                            )}
                            {pending ? 'Processing...' : 'Continue'}
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
