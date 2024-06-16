'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { v4 as uuid } from 'uuid';

import { Cross1Icon, HamburgerMenuIcon } from '@radix-ui/react-icons';

import Typography from '~/components/atoms/typography';
import ModeToggle from '~/components/molecules/mode-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button, buttonVariants } from '~/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '~/components/ui/navigation-menu';
import { Separator } from '~/components/ui/separator';
import { SheetClose } from '~/components/ui/sheet';
import { IAM } from '~/lib/config';
import { headerMenu } from '~/lib/constants/header-menus';
import { UserData } from '~/lib/interfaces/user';
import { cn } from '~/lib/utils';

import NavAccordion from './nav-accordion';
import NavMenuDropdown from './nav-dropdown';
import Pannel from './pannel';

const Header = ({ userData, channelId, className }: { userData?: UserData; channelId?: string; className?: string }) => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    return (
        <header className={cn('mx-auto flex h-[4.5rem] w-full max-w-[1344px] items-center px-5 sm:px-10', className)}>
            <Link href="/" className="flex items-center gap-2 lg:min-w-48 px-2" onClick={() => setOpen(false)}>
                <Typography variant="large">MKSingh</Typography>
            </Link>
            <div className="ml-auto flex items-center gap-3 xl:hidden">
                <ModeToggle />
                <Button variant="outline" size="icon" onClick={() => setOpen(open => !open)}>
                    {open ? <Cross1Icon className="h-4 w-4" /> : <HamburgerMenuIcon className="h-4 w-4" />}
                </Button>
            </div>
            <div
                className={clsx(
                    'absolute left-0 top-[4.375rem] z-20 hidden h-[calc(100vh-4.375rem)] w-full overflow-y-auto bg-[#E9E9E9] p-5 sm:px-10 xl:static xl:ml-20 xl:flex xl:h-auto xl:items-center xl:overflow-y-visible xl:bg-transparent xl:p-0 dark:bg-black xl:dark:bg-transparent'
                )}
            >
                {/* Desktop Navigation Bar */}
                <NavigationMenu className="hidden xl:block">
                    <NavigationMenuList>
                        {headerMenu(channelId)?.map(menu =>
                            menu.children ? (
                                <NavMenuDropdown key={uuid()} menu={menu} />
                            ) : (
                                <NavigationMenuItem key={uuid()} className="w-full" asChild>
                                    <NavigationMenuLink href={menu.href} className={navigationMenuTriggerStyle()}>
                                        {menu.text}
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            )
                        )}
                    </NavigationMenuList>
                </NavigationMenu>

                <div className="ml-auto flex flex-wrap items-center gap-5 xl:mt-0">
                    {userData ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src="" />
                                    <AvatarFallback>
                                        {userData.given_name.charAt(0) + (userData.family_name?.charAt(0) || '')}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {/* <DropdownMenuItem> */}
                                <Typography variant="p">{userData.name}</Typography>
                                {/* </DropdownMenuItem> */}
                                {/* <DropdownMenuItem> */}
                                <Typography variant="muted">{userData.email}</Typography>
                                <Separator className="my-1" />
                                {/* </DropdownMenuItem> */}
                                <DropdownMenuItem
                                    asChild
                                    className="cursor-pointer bg-destructive text-destructive-foreground"
                                >
                                    <a href={`${IAM.baseUrl}/api/logout`}>Logout</a>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link className={buttonVariants()} href={`${IAM.baseUrl}/login?callback=${pathname}`}>
                            Log in
                        </Link>
                    )}
                    <ModeToggle />
                </div>
            </div>

            {/* Mobile Navigation Bar */}
            <Pannel
                onClick={() => setOpen(false)}
                open={open}
                trigger={
                    <Button variant="outline" size="icon" className="ml-auto xl:hidden" onClick={() => setOpen(false)}>
                        {open ? <Cross1Icon className="h-4 w-4" /> : <HamburgerMenuIcon className="h-4 w-4" />}
                    </Button>
                }
            >
                <div className="flex flex-col gap-2">
                    {headerMenu(channelId)?.map(menu =>
                        menu.children ? (
                            <NavAccordion key={uuid()} item={menu} onClick={() => setOpen(false)} pathname={pathname} />
                        ) : (
                            <SheetClose asChild key={uuid()}>
                                <Link
                                    href={menu.href}
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
                            </SheetClose>
                        )
                    )}
                </div>
            </Pannel>
        </header>
    );
};

export default Header;
