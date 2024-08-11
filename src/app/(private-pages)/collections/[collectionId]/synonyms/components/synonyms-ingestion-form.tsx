'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { IconCirclePlus, IconDeviceFloppy, IconRotateClockwise2 } from '@tabler/icons-react';

import { Locales } from '~/app/(private-pages)/collections/components/constant';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion';
import { Button, buttonVariants } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { cn } from '~/lib/utils';
import { dispatchToast } from '~/lib/utils/message-handler';

import { createAndUpdateSynonyms } from './actions';
import { SynonymsSchema, SynonymsType } from './schema';

const SynonymsIngestionForm = ({ collectionId, defaultData }: { collectionId: string; defaultData?: SynonymsType }) => {
    const [pending, setPending] = useState(false);
    const router = useRouter();
    const form = useForm<SynonymsType>({
        defaultValues: {
            synonyms: [''],
            ...defaultData,
        },
        resolver: zodResolver(SynonymsSchema),
    });

    const onSubmit = async (values: SynonymsType) => {
        try {
            setPending(true);
            const res = await createAndUpdateSynonyms({ ...values, collection: collectionId });
            if (res) {
                dispatchToast(res);
                router.push(`/collections/${collectionId}/synonyms`);
            }
        } catch (e) {
            dispatchToast({ type: 'error', message: (e as Error).message });
        } finally {
            setPending(false);
        }
    };
    return (
        <div className="flex flex-col gap-10 xl:flex-row xl:gap-8 w-full">
            <Card className="max-w-5xl">
                <CardHeader>
                    <div className="flex justify-between space-x-1.5">
                        <div className="flex flex-col space-y-1.5">
                            <CardTitle>{defaultData ? 'Update' : 'Create'} synonyms</CardTitle>
                            <CardDescription>
                                <a
                                    href="https://typesense.org/docs/26.0/api/synonyms.html"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="text-primary"
                                >
                                    Read the documentation
                                </a>{' '}
                                for information on one-way vs multi-way synonyms.
                            </CardDescription>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Link
                                href={`/collections/${collectionId}/synonyms`}
                                className={cn(buttonVariants(), 'whitespace-nowrap')}
                            >
                                Goto Synonyms
                            </Link>
                        </div>
                    </div>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <CardContent className="flex flex-col gap-6">
                            <div className="grid md:grid-cols-2 gap-4 w-full p-1">
                                <FormField
                                    control={form.control}
                                    name="id"
                                    render={({ field }) => (
                                        <FormItem className="sr-only">
                                            <FormLabel>Synonyms*</FormLabel>
                                            <FormControl>
                                                <Input readOnly {...field} />
                                            </FormControl>
                                            <FormDescription>Separate words by commas</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="synonyms"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Synonyms*</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="eg. iphone, android, blackberry"
                                                    {...field}
                                                    value={field.value.join(', ')}
                                                    onChange={e =>
                                                        field.onChange(e.target.value.split(',').map(v => v.trim()))
                                                    }
                                                />
                                            </FormControl>
                                            <FormDescription>Separate words by commas</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="root"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Root</FormLabel>
                                            <FormControl>
                                                <Input placeholder="eg. smart phone" {...field} />
                                            </FormControl>
                                            <FormDescription>Leave empty to create a multi-way synonym</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Accordion collapsible type="single">
                                <AccordionItem value="advance">
                                    <AccordionTrigger>Advance</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="grid md:grid-cols-2 gap-4 w-full p-1">
                                            <FormField
                                                control={form.control}
                                                name="symbols_to_index"
                                                render={({ field }) => (
                                                    <FormItem className="w-full">
                                                        <FormLabel>Symbols to Index</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="eg. +,-" {...field} />
                                                        </FormControl>
                                                        <FormDescription>Separate symbols by commas</FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="locale"
                                                render={({ field }) => (
                                                    <FormItem className="w-full">
                                                        <FormLabel>Locale</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger className="items-start [&_[data-description]]:hidden">
                                                                    <SelectValue placeholder="Select locale" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {Locales.map(locale => (
                                                                    <SelectItem key={locale.value} value={locale.value}>
                                                                        {locale.label}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        <FormDescription>Leave un-selected to auto-detect</FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                            <CardFooter className="flex p-0 gap-6 justify-end">
                                {defaultData ? (
                                    <Button
                                        onClick={() => {
                                            form.reset();
                                            router.push(`/collections/${collectionId}/synonyms/add`);
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

export default SynonymsIngestionForm;
