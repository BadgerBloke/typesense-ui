import * as React from 'react';
import { Cog, Grid2x2Plus, LayoutDashboard, Notebook } from 'lucide-react';
import { Link } from 'react-router';

import { NavMain } from '~/components/nav-main';
import { NavUser } from '~/components/nav-user';
import { ScrollArea } from '~/components/ui/scroll-area';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '~/components/ui/sidebar';

import Logo from './atoms/logo';
import SystemStatus from './atoms/system-status';

// This is sample data.
const data = {
    user: {
        name: 'MKSingh',
        email: 'me@mksingh.dev',
        avatar: '/avatars/mksingh.jpg',
    },
    navMain: [
        {
            title: 'Dashboard',
            url: '/',
            icon: LayoutDashboard,
        },
        {
            title: 'New Collection',
            url: '/collections/add',
            icon: Grid2x2Plus,
        },
        {
            title: 'Collections',
            url: '/collections',
            icon: Notebook,
            isActive: true,
            items: [
                {
                    title: 'Documents',
                    url: '#',
                },
                {
                    title: 'Synonyms',
                    url: '#',
                },
                {
                    title: 'Curation',
                    url: '#',
                },
            ],
        },
        {
            title: 'Settings',
            url: '/settings',
            icon: Cog,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="hover:bg-transparent">
                            <Link to="/" className="flex items-center gap-2 text-sm font-medium">
                                <Logo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <ScrollArea className="h-full">
                    <NavMain items={data.navMain} />
                </ScrollArea>
            </SidebarContent>
            <SidebarFooter>
                <SystemStatus />
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
