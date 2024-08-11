import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion';
import { Button, buttonVariants } from '~/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { SideNavMenuType } from '~/lib/constants/navigation-menus';
import { cn } from '~/lib/utils';

import { SelectData } from '.';

const NavAccordion = ({
    item,
    collectionId,
    pathname,
    onClick,
    collections,
}: {
    item: SideNavMenuType;
    collectionId?: string;
    pathname: string;
    onClick: () => void;
    collections: SelectData[];
}) => {
    const router = useRouter();
    const [collection, setCollection] = useState<string | undefined>(collectionId);
    const handleTriggerClick = () => {
        router.push(item.href);
        onClick();
    };

    return (
        <Accordion
            type="single"
            collapsible
            defaultValue={pathname.includes(item.href) ? item.href : undefined}
            className="w-full"
        >
            <AccordionItem value={item.href} className="space-y-2 border-none">
                <AccordionTrigger
                    className={cn(
                        buttonVariants({ variant: 'ghost' }),
                        clsx({
                            'bg-muted/50': pathname.includes(item.href),
                        }),
                        'justify-between hover:no-underline'
                    )}
                    onClick={item.havePage ? () => handleTriggerClick() : undefined}
                >
                    <span className="flex items-center">
                        {item.icon ? <item.icon className="mr-2 h-5 w-5" /> : null} {item.text}
                    </span>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="p-1 pl-2">
                        {item.path === 'collections' && (
                            <Select
                                onValueChange={e => {
                                    setCollection(e);
                                    router.push(`/collections/${e}`);
                                }}
                                value={collection}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a collection" />
                                </SelectTrigger>
                                <SelectContent>
                                    {collections.map(collection => (
                                        <SelectItem key={collection.value.slugify()} value={collection.value}>
                                            {collection.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    </div>
                    <div className="mx-4 flex flex-col gap-1 border-l border-muted">
                        {item.children?.map(e =>
                            collection ? (
                                <Link
                                    key={`${item.path}-${e.path}`}
                                    href={e.href.templateStringToValue({ collectionId: collection })}
                                    onClick={onClick}
                                    className={cn(
                                        buttonVariants({ variant: 'ghost' }),
                                        clsx({
                                            'bg-muted/50': pathname.includes(e.path),
                                        }),
                                        'justify-start rounded-l-none'
                                    )}
                                >
                                    {e.text}
                                </Link>
                            ) : (
                                <Button
                                    variant="ghost"
                                    disabled
                                    key={`${item.path}-${e.path}`}
                                    className="justify-start rounded-l-none"
                                >
                                    {e.text}
                                </Button>
                            )
                        )}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default NavAccordion;
