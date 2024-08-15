'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { IconCirclePlus, IconDeviceFloppy, IconRotateClockwise2 } from '@tabler/icons-react';

import Tooltip from '~/components/atoms/tooltip';
import Typography from '~/components/atoms/typography';
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion';
import { Button, buttonVariants } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Checkbox } from '~/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Separator } from '~/components/ui/separator';
import { cn, zodEnumToSelectData } from '~/lib/utils';
import { dispatchToast } from '~/lib/utils/message-handler';

import { createAndUpdateOverrides } from './actions';
import { OverridesSchema, OverridesType } from './schema';

const OverridesIngestionForm = ({ collectionId, defaultData }: { collectionId: string; defaultData?: OverridesType }) => {
    const [pending, setPending] = useState(false);
    const router = useRouter();
    const form = useForm<OverridesType>({
        defaultValues: {
            id: '',
            ...defaultData,
        },
        resolver: zodResolver(OverridesSchema),
    });

    const onSubmit = async (values: OverridesType) => {
        try {
            setPending(true);
            const res = await createAndUpdateOverrides({ ...values, collection: collectionId });
            if (res) {
                dispatchToast(res);
                router.push(`/collections/${collectionId}/overrides`);
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
                            <CardTitle>{defaultData ? 'Update' : 'Create'} curation</CardTitle>
                            <CardDescription>
                                Curation allows you to pin certain records at particular positions or hide results, for a
                                given search query.
                                <a
                                    href="https://typesense.org/docs/26.0/api/curation.html"
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
                                href={`/collections/${collectionId}/overrides`}
                                className={cn(buttonVariants(), 'whitespace-nowrap')}
                            >
                                Goto Overrides
                            </Link>
                        </div>
                    </div>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <CardContent className="flex flex-col gap-6">
                            <div className="grid gap-10 w-full p-1">
                                <FormField
                                    control={form.control}
                                    name="id"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Curation name*</FormLabel>
                                            <FormControl>
                                                <Input placeholder="eg. curate-apple" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="grid gap-6">
                                    <div className="inline-flex items-center gap-6 overflow-hidden">
                                        <Typography variant="large">Rules</Typography>
                                        <Separator />
                                    </div>
                                    <div className="grid gap-6 pl-4">
                                        <FormField
                                            control={form.control}
                                            name="curateByQuery"
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    <div className="inline-flex gap-2 items-center">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                        </FormControl>
                                                        <FormLabel>Curate by Search Query</FormLabel>
                                                    </div>
                                                    {field.value && (
                                                        <div className="inline-flex gap-0 items-center w-full">
                                                            <FormField
                                                                control={form.control}
                                                                name="rule.query"
                                                                render={({ field }) => (
                                                                    <FormItem className="w-full">
                                                                        <FormLabel className="sr-only">
                                                                            curate by query
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                placeholder="apple"
                                                                                className="rounded-r-none w-full"
                                                                                {...field}
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form.control}
                                                                name="rule.match"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel className="sr-only">
                                                                            query match type
                                                                        </FormLabel>
                                                                        <Select
                                                                            onValueChange={field.onChange}
                                                                            defaultValue={
                                                                                field.value ||
                                                                                OverridesSchema.shape.rule.shape.match.Enum
                                                                                    .exact
                                                                            }
                                                                        >
                                                                            <FormControl>
                                                                                <SelectTrigger className="items-start [&_[data-description]]:hidden rounded-l-none border-l-0 w-36">
                                                                                    <SelectValue placeholder="Select match type" />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent className="w-36">
                                                                                {zodEnumToSelectData(
                                                                                    Object.values(
                                                                                        OverridesSchema.shape.rule.shape
                                                                                            .match.Enum
                                                                                    )
                                                                                ).map(match => (
                                                                                    <SelectItem
                                                                                        key={match.value}
                                                                                        value={match.value}
                                                                                    >
                                                                                        {match.label}
                                                                                    </SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                    )}
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="curateByFilter"
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    <div className="inline-flex gap-2 items-center">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                        </FormControl>
                                                        <FormLabel>Curate by Filter</FormLabel>
                                                    </div>
                                                    {field.value && (
                                                        <FormField
                                                            control={form.control}
                                                            name="rule.filter_by"
                                                            render={({ field }) => (
                                                                <FormItem className="w-full">
                                                                    <FormLabel className="sr-only">
                                                                        curate by filter
                                                                    </FormLabel>
                                                                    <FormControl>
                                                                        <Input placeholder="category:shoes" {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    )}
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="curateByTags"
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    <div className="inline-flex gap-2 items-center">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                        </FormControl>
                                                        <FormLabel>Curate by Tags</FormLabel>
                                                    </div>
                                                    {field.value && (
                                                        <FormField
                                                            control={form.control}
                                                            name="rule.tags"
                                                            render={({ field }) => (
                                                                <FormItem className="w-full">
                                                                    <FormLabel className="sr-only">curate by tags</FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            placeholder="newsletter, web"
                                                                            {...field}
                                                                            value={field.value?.join(', ')}
                                                                            onChange={e =>
                                                                                field.onChange(
                                                                                    e.target.value
                                                                                        .split(',')
                                                                                        .map(v => v.trim())
                                                                                )
                                                                            }
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    )}
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-6">
                                    <div className="inline-flex items-center gap-6 overflow-hidden">
                                        <Typography variant="large">Actions</Typography>
                                        <Separator />
                                    </div>
                                    <div className="grid gap-6 pl-4">
                                        <FormField
                                            control={form.control}
                                            name="pinDocuments"
                                            render={({ field }) => (
                                                <FormItem className="w-full grid">
                                                    <div className="inline-flex gap-2 items-center">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                        </FormControl>
                                                        <FormLabel>Pin Documents</FormLabel>
                                                    </div>
                                                    {field.value && (
                                                        <div className="inline-flex items-center gap-4">
                                                            <FormField
                                                                control={form.control}
                                                                name="includes.0.id"
                                                                render={({ field }) => (
                                                                    <FormItem className="w-full">
                                                                        <FormLabel className="sr-only">
                                                                            include documents
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input placeholder="Doc ID" {...field} />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form.control}
                                                                name="includes.0.position"
                                                                render={({ field }) => (
                                                                    <FormItem className="w-full">
                                                                        <FormLabel className="sr-only">
                                                                            include documents
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                placeholder="Position"
                                                                                type="number"
                                                                                {...field}
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                    )}
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="hideDocuments"
                                            render={({ field }) => (
                                                <FormItem className="w-full grid">
                                                    <div className="inline-flex gap-2 items-center">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                        </FormControl>
                                                        <FormLabel>Hide Documents</FormLabel>
                                                    </div>
                                                    {field.value && (
                                                        <FormField
                                                            control={form.control}
                                                            name="excludes.0.id"
                                                            render={({ field }) => (
                                                                <FormItem className="w-full">
                                                                    <FormLabel className="sr-only">hide documents</FormLabel>
                                                                    <FormControl>
                                                                        <Input placeholder="Doc ID" {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    )}
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="filterDocuments"
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    <div className="inline-flex gap-2 items-center">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                        </FormControl>
                                                        <FormLabel>Filter Documents</FormLabel>
                                                    </div>
                                                    {field.value && (
                                                        <FormField
                                                            control={form.control}
                                                            name="filter_by"
                                                            render={({ field }) => (
                                                                <FormItem className="w-full">
                                                                    <FormLabel className="sr-only">filter by</FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            placeholder="eg. field=value or field={field}"
                                                                            {...field}
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    )}
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="sortDocuments"
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    <div className="inline-flex gap-2 items-center">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                        </FormControl>
                                                        <FormLabel>Sort Documents</FormLabel>
                                                    </div>
                                                    {field.value && (
                                                        <FormField
                                                            control={form.control}
                                                            name="sort_by"
                                                            render={({ field }) => (
                                                                <FormItem className="w-full">
                                                                    <FormLabel className="sr-only">sort by</FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            placeholder="eg. field1:asc,field2:desc"
                                                                            {...field}
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    )}
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="replaceDocuments"
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    <Tooltip
                                                        message="It cannot be used along with Remove Matched Tokens!"
                                                        hidden={!form.watch('remove_matched_tokens')}
                                                    >
                                                        <div className="inline-flex gap-2 items-center">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value}
                                                                    onCheckedChange={field.onChange}
                                                                    disabled={form.watch('remove_matched_tokens')}
                                                                />
                                                            </FormControl>
                                                            <FormLabel>Replace Query</FormLabel>
                                                        </div>
                                                    </Tooltip>
                                                    {field.value && (
                                                        <FormField
                                                            control={form.control}
                                                            name="replace_query"
                                                            render={({ field }) => (
                                                                <FormItem className="w-full">
                                                                    <FormLabel className="sr-only">
                                                                        replacement query
                                                                    </FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            placeholder="eg. replacement query"
                                                                            {...field}
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    )}
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="remove_matched_tokens"
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    <Tooltip
                                                        message="It cannot be used along with Replace Query!"
                                                        hidden={!form.watch('replaceDocuments')}
                                                    >
                                                        <div className="inline-flex gap-2 items-center">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value}
                                                                    onCheckedChange={field.onChange}
                                                                    disabled={form.watch('replaceDocuments')}
                                                                />
                                                            </FormControl>
                                                            <FormLabel>Remove Matched Tokens</FormLabel>
                                                        </div>
                                                    </Tooltip>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="filter_curated_hits"
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    <div className="inline-flex gap-2 items-center">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                        </FormControl>
                                                        <FormLabel>Apply Filters to Curated Items</FormLabel>
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="customMetadata"
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    <div className="inline-flex gap-2 items-center">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                        </FormControl>
                                                        <FormLabel>Return Custom Metadata</FormLabel>
                                                    </div>
                                                    {field.value && (
                                                        <FormField
                                                            control={form.control}
                                                            name="metadata"
                                                            render={({ field }) => (
                                                                <FormItem className="w-full">
                                                                    <FormLabel className="sr-only">
                                                                        Return Custom Metadata
                                                                    </FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            placeholder="eg. replacement query"
                                                                            {...field}
                                                                            value={JSON.stringify(field.value || '')}
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    )}
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="stop_processing"
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    <div className="inline-flex gap-2 items-center">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                        </FormControl>
                                                        <FormLabel>Stop Rule Processing After This Rule</FormLabel>
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-6">
                                    <div className="inline-flex items-center gap-6 overflow-hidden">
                                        <Typography variant="large">Options</Typography>
                                        <Separator />
                                    </div>
                                    <div className="grid gap-6 pl-4">
                                        <FormField
                                            control={form.control}
                                            name="effectiveFrom"
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    <div className="inline-flex gap-2 items-center">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                        </FormControl>
                                                        <FormLabel>Effective From</FormLabel>
                                                    </div>
                                                    {field.value && (
                                                        <FormField
                                                            control={form.control}
                                                            name="effective_from_ts"
                                                            render={({ field }) => (
                                                                <FormItem className="w-full">
                                                                    <FormLabel className="sr-only">Effective From</FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            placeholder="apple"
                                                                            className="rounded-r-none w-full"
                                                                            {...field}
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    )}
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="effectiveTo"
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    <div className="inline-flex gap-2 items-center">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                        </FormControl>
                                                        <FormLabel>Effective To</FormLabel>
                                                    </div>
                                                    {field.value && (
                                                        <FormField
                                                            control={form.control}
                                                            name="effective_to_ts"
                                                            render={({ field }) => (
                                                                <FormItem className="w-full">
                                                                    <FormLabel className="sr-only">Effective To</FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            placeholder="apple"
                                                                            className="rounded-r-none w-full"
                                                                            {...field}
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    )}
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                            <CardFooter className="flex p-0 gap-6 justify-end">
                                {defaultData ? (
                                    <Button
                                        onClick={() => {
                                            form.reset();
                                            router.push(`/collections/${collectionId}/overrides/add`);
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

export default OverridesIngestionForm;
