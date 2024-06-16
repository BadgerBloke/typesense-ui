import { Icon, IconLayoutDashboard, IconTable, IconTablePlus } from '@tabler/icons-react';

type MenuType = {
    href: string;
    text: string;
    icon: Icon;
    name?: string;
    path?: string;
    defaultState?: 'open' | 'close';
    havePage: boolean;
};

export type SideNavMenuType = MenuType & {
    children?: Omit<MenuType, 'icon'>[];
};

const SIDE_NAV_MENUS: Array<SideNavMenuType> = [
    {
        href: '/',
        text: 'Dashboard',
        icon: IconLayoutDashboard as Icon,
        name: 'Dashboard',
        path: '/',
        havePage: true,
    },
    {
        href: '/collections/add',
        text: 'New Collection',
        icon: IconTablePlus as Icon,
        path: 'add',
        havePage: true,
    },
    {
        href: '/collections',
        text: 'Collections',
        icon: IconTable as Icon,
        path: 'collections',
        defaultState: 'open',
        havePage: true,
        children: [
            {
                href: '/collections/{{collectionId}}/synonyms',
                text: 'Synonyms',
                path: 'synonyms',
                havePage: true,
            },
            {
                href: '/collections/{{collectionId}}/curation',
                text: 'Curation',
                path: 'curation',
                havePage: true,
            },
        ],
    },
];

export const sideNavMenu = ({ collectionId }: { collectionId: string }) => {
    return SIDE_NAV_MENUS.map(menu => {
        return { ...menu, href: menu.href.replace('{{collectionId}}', collectionId) };
    });
};

export type BreadcrumbItemType = { label: string; href?: string; havePage: boolean }[];
export const generateItems = ({ pathname, collectionId }: { pathname: string; collectionId: string }) => {
    const routes = pathname.split('/').filter(e => e !== collectionId);
    const items: BreadcrumbItemType = [];
    routes.forEach(route => {
        if (route) {
            const obj = findItemByPath(sideNavMenu({ collectionId }), route);

            if (obj) {
                items.push({ label: obj.name || obj.text, href: obj.href, havePage: obj.havePage });
            } else {
                items.push({ label: route, havePage: false });
            }
        }
    });
    return items;
};

const findItemByPath = (data: Array<SideNavMenuType>, path: string): Omit<MenuType, 'icon'> | null => {
    for (const item of data) {
        if (item.path === path) {
            return item;
        }
        if (item.children) {
            const result: Omit<MenuType, 'icon'> | null = findItemByPath(item.children as SideNavMenuType[], path);
            if (result) {
                return result;
            }
        }
    }
    return null;
};
