// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Icon, IconArticleFilled, IconHome2 } from '@tabler/icons-react';

type MenuType = {
    href: string;
    text: string;
    icon: Icon;
    name?: string;
    path?: string;
    havePage: boolean;
};

export type HeaderMenuType = MenuType & {
    children?: Omit<MenuType, 'icon'>[];
};

const HEADER_MENUS: Array<HeaderMenuType> = [
    {
        href: '/',
        text: 'Home',
        icon: IconHome2 as Icon,
        havePage: true,
    },
    {
        href: '/', // Don't leave href as blank string otherwise accordion will not work.
        text: 'Dropdown',
        icon: IconArticleFilled as Icon,
        havePage: false,
        children: [
            {
                href: '/dropdown/item-1',
                text: 'Item 1',
                havePage: true,
            },
            {
                href: '/dropdown/item-2',
                text: 'Item 2',
                havePage: true,
            },
            {
                href: '/dropdown/item-3',
                text: 'Item 3',
                havePage: true,
            },
        ],
    },
];

export const headerMenu = (orgId?: string) => {
    return HEADER_MENUS.map(menu => {
        return { ...menu, href: menu.href.replace('{{orgId}}', String(orgId)) };
    });
};
