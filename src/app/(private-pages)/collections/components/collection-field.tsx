import clsx from 'clsx';
import { Control } from 'react-hook-form';
import { v4 as uuid } from 'uuid';

import { IconArrowBackUp, IconMinus } from '@tabler/icons-react';

import Typography from '~/components/atoms/typography';
import { Button } from '~/components/ui/button';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Switch } from '~/components/ui/switch';
import { cn } from '~/lib/utils';

import { DataType, Locales } from './constant';
import { CollectionType } from './schema';

const CollectionField = ({
    control,
    index,
    removeRow,
    totalRow,
    drop,
    existingRow,
}: {
    control: Control<CollectionType, unknown>;
    index: number;
    totalRow: number;
    removeRow: () => void;
    drop?: boolean;
    existingRow?: boolean;
}) => (
    <div
        className={cn(
            'flex flex-col items-center sm:flex-row w-full gap-4 hover:bg-muted/50 transition-colors duration-300 border-y p-4',
            clsx({
                'grayscale cursor-not-allowed bg-muted/40': drop,
            })
        )}
    >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-9 gap-4 w-full">
            <FormField
                control={control}
                name={`fields.${index}.name`}
                render={({ field }) => (
                    <FormItem className="w-full xl:col-span-2">
                        <FormLabel>Name*</FormLabel>
                        <FormControl>
                            <Input placeholder="company_name" disabled={existingRow} {...field} />
                        </FormControl>
                        <FormDescription>Lowercase and only &ldquo;_&rdquo; allowed</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name={`fields.${index}.type`}
                render={({ field }) => (
                    <FormItem className="xl:col-span-2">
                        <FormLabel>Type*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={existingRow}>
                            <FormControl>
                                <SelectTrigger id="type" className="items-start [&_[data-description]]:hidden max-w-60">
                                    <SelectValue placeholder="Select data type" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent className="max-w-60">
                                {DataType.map(dt => (
                                    <SelectItem key={uuid()} value={dt.value}>
                                        <div className="grid gap-0.5">
                                            <Typography variant="code" className="w-fit py-0">
                                                {dt.value}
                                            </Typography>
                                            <p className="text-xs" data-description>
                                                {dt.label}
                                            </p>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormDescription>Data type is vital for indexing</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <div className="flex gap-4 w-full justify-around xl:col-span-3">
                <FormField
                    control={control}
                    name={`fields.${index}.facet`}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-4 w-fit py-1 items-center">
                            <FormLabel>Facet</FormLabel>
                            <FormControl>
                                <Switch disabled={existingRow} checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name={`fields.${index}.index`}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-4 w-fit py-1 items-center">
                            <FormLabel>Index</FormLabel>
                            <FormControl>
                                <Switch disabled={existingRow} checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name={`fields.${index}.optional`}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-4 w-fit py-1 items-center">
                            <FormLabel>Optional</FormLabel>
                            <FormControl>
                                <Switch disabled={existingRow} checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name={`fields.${index}.stem`}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-4 w-fit py-1 items-center">
                            <FormLabel>Stemming</FormLabel>
                            <FormControl>
                                <Switch disabled={existingRow} checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </div>
            <FormField
                control={control}
                name={`fields.${index}.locale`}
                render={({ field }) => (
                    <FormItem className="w-full xl:col-span-2">
                        <FormLabel>Locale</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={existingRow}>
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
                        <FormDescription>Leave blank if option not available</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
        {totalRow > 1 ? (
            <Button
                size="icon"
                type="button"
                variant={drop ? 'default' : 'destructive'}
                onClick={removeRow}
                className="mt-8 shrink-0"
            >
                {drop ? <IconArrowBackUp className="h-4 w-4" /> : <IconMinus className="h-4 w-4" />}
            </Button>
        ) : null}
    </div>
);

export default CollectionField;
