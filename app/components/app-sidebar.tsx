import * as React from 'react';
import { Cog, Grid2x2Plus, LayoutDashboard, Notebook } from 'lucide-react';
import { Link } from 'react-router';

import Typography, { typographyVariants } from '~/client/components/atoms/typography';
import { NavMain } from '~/client/components/nav-main';
import { NavUser } from '~/client/components/nav-user';
import { ScrollArea } from '~/client/components/ui/scroll-area';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '~/client/components/ui/sidebar';
import { cn } from '~/client/lib/utils';

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
            isActive: true,
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
                        <SidebarMenuButton size="lg" asChild>
                            <Link to="/" className="flex items-center gap-2 text-sm font-medium">
                                <Typography variant="large">Typesense</Typography>
                                <span className={cn(typographyVariants({ variant: 'large' }), 'gradient-bg px-1 rounded-sm')}>UI</span>
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
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
