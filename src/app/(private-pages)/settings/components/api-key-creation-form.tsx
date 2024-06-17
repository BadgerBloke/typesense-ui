'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { format } from 'date-fns';
import { useFormStatus } from 'react-dom';
import { CollectionSchema } from 'typesense/lib/Typesense/Collection';

import { CalendarIcon } from '@radix-ui/react-icons';

import Typography from '~/components/atoms/typography';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion';
import { Button, buttonVariants } from '~/components/ui/button';
import { Calendar } from '~/components/ui/calendar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Checkbox } from '~/components/ui/checkbox';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { API_ACTIONS } from '~/lib/constants/api-actions';
import { cn, slugify } from '~/lib/utils';

import { createAPIKey } from './action';

const ApiKeyCreationCard = ({ collections }: { collections: CollectionSchema[] }) => {
    const [expiresAt, setExpiresAt] = useState<Date>();
    const pathname = usePathname();
    const createAPIKeyFunction = createAPIKey.bind(null, pathname);
    return (
        <Card>
            <CardHeader>
                <CardTitle>Create API Key</CardTitle>
                <div className="max-w-2xl flex flex-col gap-4">
                    <Typography variant="muted">
                        Typesense allows you to create API Keys with fine-grained access control. You can restrict access on
                        a per-collection, per-action, per-record or even per-field level or a mixture of these.
                    </Typography>
                    <Typography variant="muted">
                        Read more about how to manage access to data in Typesense in this{' '}
                        <a
                            target="_blank"
                            href="https://typesense.org/docs/guide/data-access-control.html"
                            rel="noreferrer"
                            className="text-primary"
                        >
                            dedicated guide article
                        </a>
                        .
                    </Typography>
                </div>
            </CardHeader>
            <form action={createAPIKeyFunction}>
                <CardContent className="space-y-8 my-5">
                    <div className="flex flex-col md:flex-row items-start justify-start gap-8">
                        <div className="flex flex-col gap-3 w-full">
                            <Label htmlFor="description">Key description</Label>
                            <Input placeholder="Search for companies from mobile app." name="description" id="description" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="expires_at">Key validity</Label>
                            <input name="expires_at" value={expiresAt?.getTime()} readOnly hidden />
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        id="expires_at"
                                        variant={'outline'}
                                        className={cn(
                                            'w-[240px] pl-3 text-left font-normal',
                                            !expiresAt && 'text-muted-foreground'
                                        )}
                                    >
                                        {expiresAt ? format(expiresAt, 'PPP') : <span>Pick a date</span>}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={expiresAt}
                                        onSelect={e => setExpiresAt(e)}
                                        disabled={(date: Date) => date < new Date() || date > new Date('2035-01-01')}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Typography variant="small">
                            Select <Typography variant="code">collections</Typography> scope
                        </Typography>

                        <Accordion
                            type="multiple"
                            className="w-full flex flex-wrap gap-x-4 gap-y-5 bg-muted/50 p-4 rounded-lg"
                        >
                            {collections?.length ? (
                                collections.map(collection => (
                                    <div key={collection.name} className="flex items-center space-x-2">
                                        <Checkbox id={collection.name} value={collection.name} name="collections" />
                                        <Label
                                            htmlFor={collection.name}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {collection.name}
                                        </Label>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-1 m-auto w-fit items-center justify-center rounded-lg my-5 border border-dashed shadow-sm">
                                    <div className="flex flex-col items-center gap-1 text-center">
                                        <h3 className="text-2xl font-bold tracking-tight">You have no collection</h3>
                                        <p className="text-sm text-muted-foreground">
                                            If you create an API key now, it will have access to all future collections.
                                            <br />
                                            To restrict access, please create the collections first.
                                        </p>
                                        <Link href="/collections/add" className={cn(buttonVariants(), 'mt-4')}>
                                            Create collection
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </Accordion>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Typography variant="small">
                            Select <Typography variant="code">actions</Typography> scope
                        </Typography>
                        <Accordion
                            type="multiple"
                            className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 bg-muted/50 rounded-lg"
                        >
                            {Object.keys(API_ACTIONS).map(action => (
                                <AccordionItem key={slugify(action)} value={action} className="flex flex-col gap-3">
                                    <AccordionTrigger className="px-4 justify-between hover:no-underline radix-state-open:bg-muted/50 rounded-md hover:bg-muted/25">
                                        <Typography variant="small">{action}</Typography>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-4">
                                        {API_ACTIONS[action].map(ac => (
                                            <div key={ac.value} className="flex items-center space-x-2 my-3">
                                                <Checkbox id={ac.value} value={ac.value} name="actions" />
                                                <Label
                                                    htmlFor={ac.value}
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    {ac.label}
                                                </Label>
                                            </div>
                                        ))}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <SubmitButton />
                </CardFooter>
            </form>
        </Card>
    );
};

const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending ? 'Please wait...' : 'Create'}
        </Button>
    );
};

export default ApiKeyCreationCard;
