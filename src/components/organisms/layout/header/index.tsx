'use client';
import { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import { Cross1Icon, HamburgerMenuIcon } from '@radix-ui/react-icons';

import SignOutButton from '~/app/auth/_components/sign-out';
import SignedIn from '~/app/auth/_components/signed-in';
import SignedOut from '~/app/auth/_components/signed-out';
import Typography from '~/components/atoms/typography';
import Logo from '~/components/molecules/logo';
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
import { headerMenu } from '~/lib/constants/header-menus';
import { cn } from '~/lib/utils';

import NavMenuDropdown from './nav-dropdown';

const Header = ({
    channelId,
    className,
    isOpen,
    setOpen,
}: {
    channelId?: string;
    className?: string;
    isOpen: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
    const pathname = usePathname();
    return (
        <header className={cn('mx-auto z-10 flex h-[4.5rem] w-full max-w-[1344px] items-center px-5 sm:px-10', className)}>
            <Link href="/" className="flex items-center gap-2 lg:min-w-48 px-2" onClick={() => setOpen(false)}>
                <Logo />
            </Link>
            <div className="ml-auto flex items-center gap-3 xl:hidden">
                {/* <ModeToggle /> */}
                <Button variant="outline" size="icon" onClick={() => setOpen(prev => !prev)}>
                    {isOpen ? <Cross1Icon className="h-4 w-4" /> : <HamburgerMenuIcon className="h-4 w-4" />}
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
                                <NavMenuDropdown key={menu.path} menu={menu} />
                            ) : (
                                <NavigationMenuItem key={menu.path} className="w-full" asChild>
                                    <NavigationMenuLink href={menu.href} className={navigationMenuTriggerStyle()}>
                                        {menu.text}
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            )
                        )}
                    </NavigationMenuList>
                </NavigationMenu>

                <div className="ml-auto flex flex-wrap items-center gap-5 xl:mt-0">
                    <SignedIn>
                        {({ session: { user } }) => (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.image ?? ''} />
                                        <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {/* <DropdownMenuItem> */}
                                    <Typography variant="p">{user?.name}</Typography>
                                    {/* </DropdownMenuItem> */}
                                    {/* <DropdownMenuItem> */}
                                    <Typography variant="muted">{user?.email}</Typography>
                                    <Separator className="my-1" />
                                    {/* </DropdownMenuItem> */}
                                    <DropdownMenuItem
                                        asChild
                                        className="cursor-pointer bg-destructive text-destructive-foreground"
                                    >
                                        <SignOutButton />
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </SignedIn>
                    <SignedOut>
                        <Link className={buttonVariants()} href={`/auth/sign-in?callback=${pathname}`}>
                            Log in
                        </Link>
                    </SignedOut>
                    {/* <ModeToggle /> */}
                </div>
            </div>
        </header>
    );
};

export default Header;
