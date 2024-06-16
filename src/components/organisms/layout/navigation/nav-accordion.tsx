import Link from 'next/link';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { v4 as uuid } from 'uuid';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion';
import { buttonVariants } from '~/components/ui/button';
import { SideNavMenuType } from '~/lib/constants/navigation-menus';
import { cn } from '~/lib/utils';

const NavAccordion = ({ item, pathname, onClick }: { item: SideNavMenuType; pathname: string; onClick: () => void }) => {
    const router = useRouter();
    const handleTriggerClick = () => {
        router.push(item.href);
        onClick();
    };

    return (
        <Accordion
            type="single"
            collapsible
            defaultValue={item.defaultState || (pathname.includes(item.href) ? item.href : undefined)}
            className="w-full"
        >
            <AccordionItem value={item.defaultState || item.href} className="space-y-2 border-none">
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
                    <div className="mx-4 flex flex-col gap-1 border-l border-muted">
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
