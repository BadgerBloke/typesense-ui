'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';

import { Cross1Icon, HamburgerMenuIcon } from '@radix-ui/react-icons';

import Breadcrumb from '~/components/molecules/breadcrumb';
import { Button, buttonVariants } from '~/components/ui/button';
import { ScrollArea } from '~/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { SheetClose, SheetDescription, SheetHeader, SheetTitle } from '~/components/ui/sheet';
import { SIDE_NAV_MENUS } from '~/lib/constants/navigation-menus';
import { cn } from '~/lib/utils';

import Header from '../header';

import NavAccordion from './nav-accordion';
import Panel from './panel';

export interface SelectData {
    label: string;
    value: string;
}

const Navigation: React.FC<{
    children: React.ReactNode;
    collections: SelectData[];
}> = ({ children, collections }) => {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const routeSegments = pathname.split('/');
    const collectionId = useMemo(
        () =>
            routeSegments.length > 2 && routeSegments[1] === 'collections' && routeSegments[2] !== 'add'
                ? decodeURIComponent(routeSegments[2])
                : undefined,
        [routeSegments]
    );
    return (
        <div className="flex flex-col w-full">
            <Header
                isOpen={open}
                setOpen={setOpen}
                className="sticky top-0 max-w-full bg-background/50 backdrop-blur-md sm:px-4"
            />
            <div className="flex w-full">
                <nav className="sticky top-[4.75rem] flex h-[calc(100dvh-4.75rem)] mt-1 w-fit max-w-xs flex-col xl:min-w-[220px]">
                    {/* Desktop Navigation Bar */}
                    <ScrollArea className="hidden h-[calc(100dvh-4.75rem)] mt-1 px-2 xl:block">
                        <div className="flex flex-col gap-2">
                            {SIDE_NAV_MENUS.map(menu =>
                                menu.children && menu.path !== 'collections' ? (
                                    <NavAccordion
                                        key={menu.path}
                                        item={menu}
                                        pathname={pathname}
                                        onClick={() => setOpen(false)}
                                    />
                                ) : menu.path === 'collections' ? (
                                    <div className="flex flex-col gap-2 mx-4" key={menu.path}>
                                        <Link
                                            key={menu.path}
                                            href={menu.href}
                                            onClick={() => setOpen(false)}
                                            className={cn(
                                                buttonVariants({ variant: 'ghost' }),
                                                clsx({
                                                    'bg-muted/50': pathname.includes(menu.path),
                                                }),
                                                'justify-start no-underline -ml-4'
                                            )}
                                        >
                                            <menu.icon className="mr-2 h-5 w-5" /> {menu.text}
                                        </Link>
                                        <div className="p-1 pl-2">
                                            <Select
                                                onValueChange={e => router.push(`/collections/${e}`)}
                                                value={collectionId}
                                                disabled={!collections.length}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue
                                                        placeholder={
                                                            collections.length
                                                                ? 'Select a collection'
                                                                : 'No collection found'
                                                        }
                                                    />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {collections.map(collection => (
                                                        <SelectItem
                                                            key={collection.value.slugify()}
                                                            value={collection.value}
                                                        >
                                                            {collection.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="mx-4 flex flex-col gap-1 border-l border-muted">
                                            {menu.children?.map(e =>
                                                collectionId ? (
                                                    <Link
                                                        key={`${menu.path}-${e.path}`}
                                                        href={e.href.templateStringToValue({ collectionId })}
                                                        className={cn(
                                                            buttonVariants({ variant: 'ghost' }),
                                                            clsx({
                                                                'bg-muted/50': e.path
                                                                    .split('.')
                                                                    .every(segment => pathname.includes(segment)),
                                                            }),
                                                            'justify-start rounded-l-none whitespace-nowrap'
                                                        )}
                                                    >
                                                        {e.text}
                                                    </Link>
                                                ) : (
                                                    <Button
                                                        variant="ghost"
                                                        disabled
                                                        key={`${menu.path}-${e.path}`}
                                                        className="justify-start rounded-l-none whitespace-nowrap"
                                                    >
                                                        {e.text}
                                                    </Button>
                                                )
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        key={menu.path}
                                        href={menu.href}
                                        onClick={() => setOpen(false)}
                                        className={cn(
                                            buttonVariants({ variant: 'ghost' }),
                                            clsx({
                                                'bg-muted/50':
                                                    menu.path === '/'
                                                        ? pathname === menu.path
                                                        : menu.path.split('.').every(segment => pathname.includes(segment)),
                                            }),
                                            'justify-start no-underline pl-4 mr-4'
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
                        <SheetHeader className="sr-only">
                            <SheetTitle>Navigation Menu</SheetTitle>
                            <SheetDescription>Navigate to the desired section</SheetDescription>
                        </SheetHeader>
                        <div className="flex flex-col gap-2">
                            {SIDE_NAV_MENUS.map(menu =>
                                menu.children && menu.path !== 'collections' ? (
                                    <NavAccordion
                                        key={menu.path}
                                        item={menu}
                                        pathname={pathname}
                                        onClick={() => setOpen(false)}
                                    />
                                ) : menu.path === 'collections' ? (
                                    <div className="flex flex-col gap-2 mx-4" key={menu.path}>
                                        <Link
                                            key={menu.path}
                                            href={menu.href}
                                            onClick={() => setOpen(false)}
                                            className={cn(
                                                buttonVariants({ variant: 'ghost' }),
                                                clsx({
                                                    'bg-muted/50': pathname.includes(menu.path),
                                                }),
                                                'justify-start no-underline -ml-4'
                                            )}
                                        >
                                            <menu.icon className="mr-2 h-5 w-5" /> {menu.text}
                                        </Link>
                                        <div className="p-1 pl-2">
                                            <Select
                                                onValueChange={e => router.push(`/collections/${e}`)}
                                                value={collectionId}
                                                disabled={!collections.length}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue
                                                        placeholder={
                                                            collections.length
                                                                ? 'Select a collection'
                                                                : 'No collection found'
                                                        }
                                                    />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {collections.map(collection => (
                                                        <SelectItem
                                                            key={collection.value.slugify()}
                                                            value={collection.value}
                                                        >
                                                            {collection.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="mx-4 flex flex-col gap-1 border-l border-muted">
                                            {menu.children?.map(e =>
                                                collectionId ? (
                                                    <Link
                                                        key={`${menu.path}-${e.path}`}
                                                        href={e.href.templateStringToValue({ collectionId })}
                                                        className={cn(
                                                            buttonVariants({ variant: 'ghost' }),
                                                            clsx({
                                                                'bg-muted/50': e.path
                                                                    .split('.')
                                                                    .every(segment => pathname.includes(segment)),
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
                                                        key={`${menu.path}-${e.path}`}
                                                        className="justify-start rounded-l-none"
                                                    >
                                                        {e.text}
                                                    </Button>
                                                )
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <SheetClose asChild key={menu.path}>
                                        <Link
                                            href={menu.href}
                                            onClick={() => setOpen(false)}
                                            className={cn(
                                                buttonVariants({ variant: 'ghost' }),
                                                clsx({
                                                    'bg-muted/50':
                                                        menu.path === '/'
                                                            ? pathname === menu.path
                                                            : menu.path
                                                                  .split('.')
                                                                  .every(segment => pathname.includes(segment)),
                                                }),
                                                'justify-start no-underline'
                                            )}
                                        >
                                            <menu.icon className="mr-2 h-5 w-5" /> {menu.text}
                                        </Link>
                                    </SheetClose>
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
        </div>
    );
};

export default Navigation;
