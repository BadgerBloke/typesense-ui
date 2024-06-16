import Link from 'next/link';
import clsx from 'clsx';
import { v4 as uuid } from 'uuid';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion';
import { buttonVariants } from '~/components/ui/button';
import { HeaderMenuType } from '~/lib/constants/header-menus';
import { cn } from '~/lib/utils';

const NavAccordion = ({ item, pathname, onClick }: { item: HeaderMenuType; pathname: string; onClick: () => void }) => (
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
            >
                <span className="flex items-center">
                    {item.icon ? <item.icon className="mr-2 h-5 w-5" /> : null} {item.text}
                </span>
            </AccordionTrigger>
            <AccordionContent>
                <div className="mx-4 flex flex-col gap-1 rounded-md bg-muted/30">
                    {item.children?.map(e => (
                        <Link
                            key={uuid()}
                            href={e.href}
                            onClick={onClick}
                            className={cn(
                                buttonVariants({ variant: 'ghost' }),
                                clsx({
                                    'bg-muted/50': pathname === e.href,
                                }),
                                'justify-start'
                            )}
                        >
                            {e.text}
                        </Link>
                    ))}
                </div>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
);

export default NavAccordion;
