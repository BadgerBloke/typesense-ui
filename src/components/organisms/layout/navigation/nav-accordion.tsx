import Link from 'next/link';
import clsx from 'clsx';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion';
import { buttonVariants } from '~/components/ui/button';
import { SideNavMenuType } from '~/lib/constants/navigation-menus';
import { cn } from '~/lib/utils';

const NavAccordion = ({ item, pathname, onClick }: { item: SideNavMenuType; pathname: string; onClick: () => void }) => {
    return (
        <Accordion
            type="single"
            collapsible
            defaultValue={
                item.defaultState === 'open'
                    ? item.path
                    : item.path.split('.').every(segment => pathname.includes(segment))
                      ? item.path
                      : undefined
            }
            className="w-full"
        >
            <AccordionItem value={item.path} className="space-y-2 border-none">
                <AccordionTrigger
                    className={cn(
                        buttonVariants({ variant: 'ghost' }),
                        clsx({
                            'bg-muted/50': item.path.split('.').every(segment => pathname.includes(segment)),
                        }),
                        'justify-between hover:no-underline'
                    )}
                    onClick={item.havePage ? () => onClick() : undefined}
                >
                    <span className="flex items-center">
                        {item.icon ? <item.icon className="mr-2 h-5 w-5" /> : null} {item.text}
                    </span>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="mx-4 flex flex-col gap-1 border-l border-muted">
                        {item.children?.map(e => (
                            <Link
                                key={`${item.path}-${e.path}`}
                                href={e.href}
                                onClick={onClick}
                                className={cn(
                                    buttonVariants({ variant: 'ghost' }),
                                    clsx({
                                        'bg-muted/50': e.path.split('.').every(segment => pathname.includes(segment)),
                                    }),
                                    'justify-start rounded-l-none'
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
};

export default NavAccordion;
