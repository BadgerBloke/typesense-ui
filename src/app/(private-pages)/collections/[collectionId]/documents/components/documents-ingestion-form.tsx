'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { IconCirclePlus, IconDeviceFloppy, IconRotateClockwise2 } from '@tabler/icons-react';

import Typography from '~/components/atoms/typography';
import { Button, buttonVariants } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { cn } from '~/lib/utils';
import { dispatchToast } from '~/lib/utils/message-handler';
import { jsonToZodSchema } from '~/lib/utils/renderer/json-to-zod-schema';

import { CollectionType } from '../../../components/schema';

import { createDocument } from './actions';

const DocumentsIngestionForm = ({
    collectionSchema,
    defaultData,
}: {
    collectionSchema: CollectionType;
    defaultData?: { [x: string]: string };
}) => {
    const [pending, setPending] = useState(false);
    const router = useRouter();

    const form = useForm<{ [x: string]: string }>({
        defaultValues: defaultData,
        resolver: zodResolver(jsonToZodSchema(collectionSchema.fields)),
    });

    const onSubmit = async (values: { [x: string]: string }) => {
        try {
            setPending(true);
            const res = await createDocument({
                values: { ...values, id: defaultData?.id, collection: collectionSchema.name },
                collectionSchema: collectionSchema.fields,
            });
            if (res) {
                dispatchToast(res);
                // router.push(`/collections/${collectionSchema.name}/documents`);
            }
        } catch (e) {
            dispatchToast({ type: 'error', message: (e as Error).message });
        } finally {
            setPending(false);
        }
    };
    return (
        <div className="flex flex-col gap-10 xl:flex-row xl:gap-8 w-full">
            <Card className="w-full">
                <CardHeader>
                    <div className="flex justify-between space-x-1.5">
                        <div className="flex flex-col space-y-1.5">
                            <CardTitle>{defaultData ? 'Update' : 'Create'} document</CardTitle>
                            <CardDescription>
                                Every record you index in Typesense is called a{' '}
                                <Typography variant="code">Document</Typography>.
                                <a
                                    href="https://typesense.org/docs/26.0/api/documents.html"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="text-primary ml-2"
                                >
                                    Read the documentation
                                </a>
                            </CardDescription>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Link
                                href={`/collections/${collectionSchema.name}/documents`}
                                className={cn(buttonVariants(), 'whitespace-nowrap')}
                            >
                                Goto Documents
                            </Link>
                        </div>
                    </div>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <CardContent className="flex flex-col gap-6">
                            {collectionSchema.fields.map(schemaField => (
                                <FormField
                                    key={schemaField.name.slugify()}
                                    control={form.control}
                                    name={schemaField.name}
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>
                                                {schemaField.name.fromSnakeToSentenceCase()}
                                                {!schemaField.optional && '*'}
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder={schemaField.name} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}
                            <CardFooter className="flex p-0 gap-6 justify-end">
                                {defaultData ? (
                                    <Button
                                        onClick={() => {
                                            form.reset();
                                            router.push(`/collections/${collectionSchema.name}/documents/add`);
                                        }}
                                        type="button"
                                        variant="secondary"
                                        disabled={pending}
                                    >
                                        <IconCirclePlus className="h-4 w-4 mr-2" /> Create new
                                    </Button>
                                ) : null}
                                <Button type="submit" disabled={pending}>
                                    {pending ? (
                                        <IconRotateClockwise2 className="animate-spin h-4 w-4 mr-2" />
                                    ) : (
                                        <IconDeviceFloppy className="h-4 w-4 mr-2" />
                                    )}
                                    {pending ? 'Processing...' : defaultData ? 'Update' : 'Create'}
                                </Button>
                            </CardFooter>
                        </CardContent>
                    </form>
                </Form>
            </Card>
        </div>
    );
};

export default DocumentsIngestionForm;
