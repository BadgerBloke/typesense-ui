'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, UseFormReturn } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { IconCirclePlus, IconDeviceFloppy, IconRotateClockwise2 } from '@tabler/icons-react';

import Tooltip from '~/components/atoms/tooltip';
import Typography from '~/components/atoms/typography';
import { DateTimePicker } from '~/components/molecules/date-time-picker';
import { Button, buttonVariants } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Checkbox } from '~/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Separator } from '~/components/ui/separator';
import { SEARCHABLE_FIELD_TYPE } from '~/lib/constants';
import { cn, parseDate, zodEnumToSelectData } from '~/lib/utils';
import { dispatchToast } from '~/lib/utils/message-handler';

import { CollectionType } from '../../../components/schema';

import { createAndUpdateOverrides } from './actions';
import HideDocumentField, { HideDocOverridesType } from './hide-document-field';
import PinDocumentField, { RevisedOverridesType } from './pin-document-field';
import { MatchEnum, OverridesSchema, OverridesType } from './schema';

export interface SelectData {
    value: string;
    label: string;
}

export interface QueryByType {
    includes: string[];
    excludes: string[];
}

const OverridesIngestionForm = ({
    collection,
    defaultData,
}: {
    collection: CollectionType;
    defaultData?: OverridesType;
}) => {
    const [pending, setPending] = useState(false);
    const [queryBy, setQueryBy] = useState<QueryByType>({ includes: [], excludes: [] });
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
            const res = await createAndUpdateOverrides({ ...values, collection: collection.name });
            if (res) {
                dispatchToast(res);
                res.type === 'success' && router.push(`/collections/${collection.name}/curation`);
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
                                href={`/collections/${collection.name}/overrides`}
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
                                            name="rule.curateByQuery"
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
                                                        <div className="inline-flex gap-0 w-full">
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
                                                                                field.value || MatchEnum.Enum.exact
                                                                            }
                                                                        >
                                                                            <FormControl>
                                                                                <SelectTrigger className="items-start [&_[data-description]]:hidden rounded-l-none border-l-0 w-36">
                                                                                    <SelectValue placeholder="Select match type" />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent className="w-36">
                                                                                {zodEnumToSelectData(
                                                                                    Object.values(MatchEnum.Enum)
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
                                            name="rule.curateByFilter"
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
                                            name="rule.curateByTags"
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
                                                        <div className="grid gap-2 pl-6">
                                                            <div className="space-y-3">
                                                                <Typography variant="small">Query by</Typography>
                                                                <div className="flex flex-wrap gap-4">
                                                                    {collection.fields.map(f =>
                                                                        f.index && SEARCHABLE_FIELD_TYPE.includes(f.type) ? (
                                                                            <Label
                                                                                key={f.name}
                                                                                className="inline-flex items-center"
                                                                            >
                                                                                <Checkbox
                                                                                    className="mr-2"
                                                                                    checked={queryBy.includes.includes(
                                                                                        f.name
                                                                                    )}
                                                                                    onCheckedChange={e =>
                                                                                        setQueryBy(prev => ({
                                                                                            ...prev,
                                                                                            includes: e
                                                                                                ? [...prev.includes, f.name]
                                                                                                : prev.includes.filter(
                                                                                                      v => v !== f.name
                                                                                                  ),
                                                                                        }))
                                                                                    }
                                                                                />
                                                                                {f.name}
                                                                            </Label>
                                                                        ) : null
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <PinDocumentField
                                                                form={form as UseFormReturn<RevisedOverridesType>}
                                                                queryBy={queryBy}
                                                                collectionName={collection.name}
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
                                                        <div className="grid gap-2 pl-6">
                                                            <div className="space-y-3">
                                                                <Typography variant="small">Query by</Typography>
                                                                <div className="flex flex-wrap gap-4">
                                                                    {collection.fields.map(f =>
                                                                        f.index && SEARCHABLE_FIELD_TYPE.includes(f.type) ? (
                                                                            <Label
                                                                                key={f.name}
                                                                                className="inline-flex items-center"
                                                                            >
                                                                                <Checkbox
                                                                                    className="mr-2"
                                                                                    checked={queryBy.excludes.includes(
                                                                                        f.name
                                                                                    )}
                                                                                    onCheckedChange={e =>
                                                                                        setQueryBy(prev => ({
                                                                                            ...prev,
                                                                                            excludes: e
                                                                                                ? [...prev.excludes, f.name]
                                                                                                : prev.excludes.filter(
                                                                                                      v => v !== f.name
                                                                                                  ),
                                                                                        }))
                                                                                    }
                                                                                />
                                                                                {f.name}
                                                                            </Label>
                                                                        ) : null
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <HideDocumentField
                                                                form={form as UseFormReturn<HideDocOverridesType>}
                                                                queryBy={queryBy}
                                                                collectionName={collection.name}
                                                            />
                                                        </div>
                                                    )}
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
                                                                        <DateTimePicker
                                                                            value={parseDate(field.value)}
                                                                            onChange={field.onChange}
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
                                                                        <DateTimePicker
                                                                            value={parseDate(field.value)}
                                                                            onChange={field.onChange}
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
                                            router.push(`/collections/${collection.name}/overrides/add`);
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
