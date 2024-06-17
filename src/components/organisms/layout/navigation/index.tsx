'use client';
import { Fragment, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { v4 as uuid } from 'uuid';

import { Cross1Icon, HamburgerMenuIcon } from '@radix-ui/react-icons';

import Breadcrumb from '~/components/molecules/breadcrumb';
import { Button, buttonVariants } from '~/components/ui/button';
import { ScrollArea } from '~/components/ui/scroll-area';
import { sideNavMenu } from '~/lib/constants/navigation-menus';
import { cn } from '~/lib/utils';

import NavAccordion from './nav-accordion';
import Panel from './panel';

const Navigation: React.FC<{
    children: React.ReactNode;
    collectionId: string;
}> = ({ children, collectionId }) => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    return (
        <Fragment>
            <div className="flex w-full">
                <nav className="sticky top-[4.75rem] flex h-[calc(100dvh-4.75rem)] mt-1 w-fit max-w-xs flex-col lg:min-w-[220px]">
                    {/* Desktop Navigation Bar */}
                    <ScrollArea className="hidden h-[calc(100dvh-4.75rem)] mt-1 px-2 lg:block">
                        <div className="flex flex-col gap-2">
                            {sideNavMenu({ collectionId }).map(menu =>
                                menu.children ? (
                                    <NavAccordion
                                        key={uuid()}
                                        item={menu}
                                        pathname={pathname}
                                        onClick={() => setOpen(false)}
                                    />
                                ) : (
                                    <Link
                                        key={uuid()}
                                        href={menu.href}
                                        onClick={() => setOpen(false)}
                                        className={cn(
                                            buttonVariants({ variant: 'ghost' }),
                                            clsx({
                                                'bg-muted/50': pathname === menu.href,
                                            }),
                                            'justify-start no-underline'
                                        )}
                                    >
                                        <menu.icon className="mr-2 h-5 w-5" /> {menu.text}
                                    </Link>
                                )
                            )}
                        </div>
                    </ScrollArea>

                    {/* Mobile Navigation Bar */}
                    <Panel
                        onClick={() => setOpen(false)}
                        open={open}
                        trigger={
                            <Button
                                variant="outline"
                                size="icon"
                                className="ml-auto xl:hidden"
                                onClick={() => setOpen(false)}
                                aria-label="Toggle menu"
                            >
                                {open ? <Cross1Icon className="h-4 w-4" /> : <HamburgerMenuIcon className="h-4 w-4" />}
                            </Button>
                        }
                    >
                        <div className="flex flex-col gap-2">
                            {sideNavMenu({ collectionId }).map(menu =>
                                menu.children ? (
                                    <NavAccordion
                                        key={uuid()}
                                        item={menu}
                                        pathname={pathname}
                                        onClick={() => setOpen(false)}
                                    />
                                ) : (
                                    <Link
                                        key={uuid()}
                                        href={menu.href}
                                        onClick={() => setOpen(false)}
                                        className={cn(
                                            buttonVariants({ variant: 'ghost' }),
                                            clsx({
                                                'bg-muted/50': pathname === menu.href,
                                            }),
                                            'justify-start no-underline'
                                        )}
                                    >
                                        <menu.icon className="mr-2 h-5 w-5" /> {menu.text}
                                    </Link>
                                )
                            )}
                        </div>
                    </Panel>
                </nav>
                <main className="min-h-screenLessNav px-4 flex w-full flex-col gap-6 py-2">
                    <div className="flex w-full items-center gap-4">
                        <Breadcrumb pathname={pathname} collectionId={collectionId} />
                    </div>
                    {children}
                </main>
            </div>
        </Fragment>
    );
};

export default Navigation;
