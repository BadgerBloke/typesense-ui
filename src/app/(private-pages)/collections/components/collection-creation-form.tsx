'use client';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { FieldType } from 'typesense/lib/Typesense/Collection';
import { v4 as uuid } from 'uuid';

import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { IconDeviceFloppy, IconLoader2 } from '@tabler/icons-react';

import SchemaView from '~/components/atoms/schema-view';
import Typography from '~/components/atoms/typography';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { dispatchToast, MessageResponse } from '~/lib/utils/message-handler';

import { createCollection } from './action';
import CollectionField from './collection-field';
import { CollectionSchema, CollectionType } from './schema';

const CollectionCreationForm = () => {
    const [pending, startTransition] = useTransition();
    const form = useForm<CollectionType>({
        defaultValues: {
            name: '',
            fields: [
                {
                    _id: uuid(),
                    name: '',
                    type: undefined,
                },
            ],
        },
        resolver: zodResolver(CollectionSchema),
    });

    const onSubmit = async (values: CollectionType) => {
        startTransition(async () => {
            try {
                const res = await createCollection(values);

                if ((res as MessageResponse)?.type) {
                    dispatchToast(res as MessageResponse);
                } else {
                    dispatchToast({ type: 'success', message: 'Collection successfully created' });
                }
            } catch (error) {
                dispatchToast({ type: 'error', message: (error as Error).message });
            }
        });
    };

    const addNewRow = () => {
        const existingRows = form.getValues('fields');
        existingRows.push({
            _id: uuid(),
            name: '',
            type: '' as FieldType,
        });
        form.setValue('fields', existingRows);
    };

    const removeRow = (_id: string) => {
        const existingRows = form.getValues('fields');
        const index = existingRows.findIndex(e => e._id === _id);
        existingRows.splice(index, 1);
        form.setValue('fields', existingRows);
    };

    const sortingFields = form.watch('fields').filter(n => ['float', 'int32', 'int64'].includes(n.type) && !!n.name);
    return (
        <div className="flex flex-col gap-10 xl:flex-row xl:gap-8 w-full">
            <Card className="max-w-5xl">
                <CardHeader>
                    <CardTitle>Create collection</CardTitle>
                    <CardDescription>
                        Let&apos;s first create a collection with an explicit, pre-defined schema.
                    </CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <CardContent className="flex flex-col">
                            <div className="flex flex-col md:flex-row gap-4 w-full">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Collection name*</FormLabel>
                                            <FormControl>
                                                <Input placeholder="companies" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                This should be lowercase and without special characters.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="default_sorting_field"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Default sorting field</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                disabled={!sortingFields.length}
                                            >
                                                <FormControl>
                                                    <SelectTrigger
                                                        id="type"
                                                        className="items-start [&_[data-description]]:hidden w-64"
                                                    >
                                                        <SelectValue
                                                            placeholder={
                                                                sortingFields.length
                                                                    ? 'Select data type'
                                                                    : 'No sorting field created'
                                                            }
                                                        />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="w-64">
                                                    {sortingFields.map(n => (
                                                        <SelectItem key={n.name} value={n.name}>
                                                            {n.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormDescription>
                                                If not provided then name of an int32 / float field will be used
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="fields"
                                render={({ field }) => (
                                    <div className="mt-10">
                                        <Typography variant="large">Add fields</Typography>
                                        {field.value.map((f, i) => (
                                            <CollectionField
                                                key={f._id}
                                                control={form.control}
                                                index={i}
                                                removeRow={() => removeRow(f._id!)}
                                                totalRow={field.value.length}
                                            />
                                        ))}
                                    </div>
                                )}
                            />
                        </CardContent>
                        <CardFooter className="flex border-t py-4 gap-6 justify-between">
                            <Button disabled={pending}>
                                {pending ? (
                                    <>
                                        <IconLoader2 className="h-4 w-4 mr-2 animate-spin" /> Please wait...
                                    </>
                                ) : (
                                    <>
                                        <IconDeviceFloppy className="h-4 w-4 mr-2" /> Create
                                    </>
                                )}
                            </Button>
                            <Button type="button" variant="secondary" onClick={addNewRow}>
                                <PlusCircledIcon className="h-4 w-4 mr-2" /> Add more field
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
            <SchemaView<CollectionType> data={form.watch()} />
        </div>
    );
};

export default CollectionCreationForm;
