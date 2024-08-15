'use client';

import { Fragment, useState } from 'react';
import Link from 'next/link';

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
import { Button, buttonVariants } from '~/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Separator } from '~/components/ui/separator';
import { DocumentsDataType } from '~/lib/interfaces/table-data-type';
import { cn } from '~/lib/utils';
import { dispatchToast } from '~/lib/utils/message-handler';

import { CollectionType } from '../../../components/schema';

import { deleteDocuments } from './actions';

export const columns = ({ collection }: { collection: CollectionType }): ColumnDef<DocumentsDataType>[] => [
    // {
    //     id: 'select',
    //     header: ({ table }) => (
    //         <Checkbox
    //             checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
    //             onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
    //             aria-label="Select all"
    //         />
    //     ),
    //     cell: ({ row }) => (
    //         <Checkbox
    //             checked={row.getIsSelected()}
    //             onCheckedChange={value => row.toggleSelected(!!value)}
    //             aria-label="Select row"
    //         />
    //     ),
    //     enableSorting: false,
    //     enableHiding: false,
    // },
    {
        accessorKey: 'id',
        header: 'ID',
        cell: ({ row }) => <div>{row.original.document.id}</div>,
    },
    {
        accessorKey: 'field',
        header: 'Fields',
        cell: ({ row }) => {
            const d = Object.keys(row.original.document);
            return (
                <div className="grid gap-3">
                    {d
                        .filter(k => k !== 'id')
                        .map((s, i) => (
                            <Fragment key={s}>
                                <Typography variant="small">{s}</Typography>
                                {i < d.length - 2 && (
                                    <Separator className="bg-transparent border-b border-border/60 border-dashed" />
                                )}
                            </Fragment>
                        ))}
                </div>
            );
        },
    },
    {
        accessorKey: 'field',
        header: 'Data type',
        cell: ({ row }) => {
            const d = Object.keys(row.original.document);
            return (
                <div className="grid gap-3">
                    {d
                        .filter(k => k !== 'id')
                        .map((s, i) => (
                            <Fragment key={s}>
                                <Typography variant="small" className="text-muted-foreground">
                                    {collection.fields.find((f: { name: string }) => f.name === s)?.type}
                                </Typography>
                                {i < d.length - 2 && (
                                    <Separator className="bg-transparent border-b border-border/60 border-dashed" />
                                )}
                            </Fragment>
                        ))}
                </div>
            );
        },
    },
    {
        accessorKey: 'field',
        header: 'Values',
        cell: ({ row }) => {
            const d = Object.keys(row.original.document);
            return (
                <div className="flex flex-col flex-1 gap-3 ">
                    {d
                        .filter(k => k !== 'id')
                        .map((s, i) => (
                            <Fragment key={s}>
                                <Typography variant="small">
                                    {row.original.document[s as keyof DocumentsDataType['document']]}
                                </Typography>
                                {i < d.length - 2 && (
                                    <Separator className="bg-transparent border-b border-border/60 border-dashed" />
                                )}
                            </Fragment>
                        ))}
                </div>
            );
        },
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
                            <UpdateButton id={row.original.document.id} name={collection.name} />
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            asChild
                            className={cn(buttonVariants({ variant: 'destructive' }), 'cursor-pointer w-full')}
                        >
                            <DeleteButton id={row.original.document.id} name={collection.name} />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

const UpdateButton = ({ id, name }: { id: string; name: string }) => {
    return (
        <Link
            className={cn(buttonVariants(), 'cursor-pointer w-full')}
            href={`/collections/${name}/documents/update?id=${id}`}
        >
            <IconPencil className="w-4 h-4 mr-2" />
            Update
        </Link>
    );
};

const DeleteButton = ({ id, name }: { id: string; name: string }) => {
    const [pending, setPending] = useState(false);
    const handleDelete = async () => {
        try {
            setPending(true);
            const res = await deleteDocuments({ id, collectionId: name });
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
                    <AlertDialogDescription>This will delete the Documents.</AlertDialogDescription>
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
