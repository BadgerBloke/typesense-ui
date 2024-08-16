import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { IconMinus, IconPlus } from '@tabler/icons-react';

import Typography from '~/components/atoms/typography';
import { Button } from '~/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '~/components/ui/command';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { cn } from '~/lib/utils';
import { dispatchToast } from '~/lib/utils/message-handler';

import { getDocuments } from './actions';
import { QueryByType, SelectData } from './overrides-ingestion-form';
import { OverridesType } from './schema';

export interface RevisedOverridesType extends Omit<OverridesType, 'includes'> {
    includes?:
        | {
              id: string;
              position: number;
              label: string;
          }[]
        | undefined;
}

interface PinDocumentFieldProps {
    form: UseFormReturn<RevisedOverridesType>;
    queryBy: QueryByType;
    collectionName: string;
}

const PinDocumentField: React.FC<PinDocumentFieldProps> = ({ form, queryBy, collectionName }) => {
    const [documents, setDocuments] = useState<SelectData[]>([]);
    const includes = form.watch('includes');

    useEffect(() => {
        if (!queryBy.includes.length) {
            setDocuments([]);
        }
    }, [queryBy.includes]);

    const handleDocumentSearch = async (q: string) => {
        try {
            if (queryBy.includes.length) {
                const res = await getDocuments({ q, collection: collectionName, queryBy: queryBy.includes.join(',') });
                const selectedDocs = [];
                form.getValues('excludes') && selectedDocs.push(form.getValues('excludes'));
                form.getValues('includes') && selectedDocs.push(form.getValues('includes'));
                const selectedDocIds = new Set(selectedDocs.flat()?.map(doc => doc?.id));
                setDocuments(res.filter(doc => !selectedDocIds.has(doc.id)));
            } else {
                setDocuments([]);
            }
        } catch (error) {
            dispatchToast({ type: 'error', message: (error as Error).message });
        }
    };

    const handleAddNewItem = () => {
        const newArray = [...includes!, {}];
        form.setValue('includes', newArray as { id: string; position: number; label: string }[]);
    };

    const handleRemoveItem = (i: number) => {
        const newArray = [...includes!];
        newArray.splice(i, 1);
        form.setValue('includes', newArray);
    };
    return includes?.length ? (
        includes.map((o, i) => (
            <div className="inline-flex" key={o.id}>
                <FormField
                    control={form.control}
                    name={`includes.${i}.id`}
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel className="sr-only">include document</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                'w-80 justify-between rounded-r-none',
                                                !field.value && 'text-muted-foreground'
                                            )}
                                        >
                                            {field.value
                                                ? form.getValues(`includes.${i}.label`) ||
                                                  `Doc ID: ${field.value} (default value)`
                                                : 'Select document'}
                                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 p-0">
                                    <Command shouldFilter={false}>
                                        <CommandInput
                                            placeholder="Search document..."
                                            className="h-9"
                                            onValueChange={handleDocumentSearch}
                                        />
                                        <CommandList>
                                            <CommandEmpty>
                                                {queryBy.includes.length
                                                    ? 'No document found.'
                                                    : 'Select at least one query by field.'}
                                            </CommandEmpty>
                                            <CommandGroup>
                                                {documents.map(document => (
                                                    <CommandItem
                                                        value={document.value}
                                                        key={document.value}
                                                        onSelect={() => {
                                                            form.setValue(`includes.${i}.id`, document.value);
                                                            form.setValue(`includes.${i}.label`, document.label);
                                                        }}
                                                    >
                                                        <div className="inline-flex gap-2 items-center">
                                                            {queryBy.includes.map(f => (
                                                                <Typography key={f} variant="small">
                                                                    {document[f as 'label']}
                                                                </Typography>
                                                            ))}
                                                        </div>
                                                        <CheckIcon
                                                            className={cn(
                                                                'ml-auto h-4 w-4',
                                                                document.value === field.value ? 'opacity-100' : 'opacity-0'
                                                            )}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={`includes.${i}.position`}
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel className="sr-only">include documents</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Position"
                                    type="number"
                                    className="rounded-l-none border-l-0"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="inline-flex mt-2">
                    <Button size="icon" className="shrink-0 ml-3" type="button" onClick={handleAddNewItem}>
                        <IconPlus className="h-4 w-4" />
                    </Button>
                    {includes.length > 1 && (
                        <Button
                            size="icon"
                            className="shrink-0 ml-3"
                            type="button"
                            variant="destructive"
                            onClick={() => handleRemoveItem(i)}
                        >
                            <IconMinus className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>
        ))
    ) : (
        <div className="inline-flex items-center">
            <FormField
                control={form.control}
                name={`includes.0.id`}
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                        <FormLabel className="sr-only">include document</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        role="combobox"
                                        className={cn(
                                            'w-80 justify-between rounded-r-none',
                                            !field.value && 'text-muted-foreground'
                                        )}
                                    >
                                        {field.value
                                            ? documents.find(document => document.value === field.value)?.label ||
                                              'Select document'
                                            : 'Select document'}
                                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 p-0">
                                <Command shouldFilter={false}>
                                    <CommandInput
                                        placeholder="Search document..."
                                        className="h-9"
                                        onValueChange={handleDocumentSearch}
                                    />
                                    <CommandList>
                                        <CommandEmpty>
                                            {queryBy.includes.length
                                                ? 'No document found.'
                                                : 'Select at least one query by field.'}
                                        </CommandEmpty>
                                        <CommandGroup>
                                            {documents.map(document => (
                                                <CommandItem
                                                    value={document.value}
                                                    key={document.value}
                                                    onSelect={() => {
                                                        form.setValue(`includes.0.id`, document.value);
                                                    }}
                                                >
                                                    <div className="inline-flex gap-2 items-center">
                                                        {queryBy.includes.map(f => (
                                                            <Typography key={f} variant="small">
                                                                {document[f as 'label']}
                                                            </Typography>
                                                        ))}
                                                    </div>
                                                    <CheckIcon
                                                        className={cn(
                                                            'ml-auto h-4 w-4',
                                                            document.value === field.value ? 'opacity-100' : 'opacity-0'
                                                        )}
                                                    />
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name={`includes.0.position`}
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel className="sr-only">include documents</FormLabel>
                        <FormControl>
                            <Input placeholder="Position" type="number" className="rounded-l-none border-l-0" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Button size="icon" className="shrink-0 mt-2 ml-3" type="button" onClick={handleAddNewItem}>
                <IconPlus className="h-4 w-4" />
            </Button>
        </div>
    );
};

export default PinDocumentField;
