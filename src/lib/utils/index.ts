import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CollectionSchema } from 'typesense/lib/Typesense/Collection';
import { v4 as uuid } from 'uuid';

import { TreeNode } from '~/components/ui/checkbox-tree';

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

export const slugify = (str: string) => {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
};

export const replacer = (key: string, value: unknown) => {
    if (key === '_id') {
        return undefined;
    }
    return value;
};

export const addFieldIds = (collection: CollectionSchema): CollectionSchema => {
    const updatedFields = collection.fields?.map(field => {
        if (!field._id) {
            return { ...field, _id: uuid() };
        }
        return field;
    });

    return { ...collection, fields: updatedFields };
};

export const zodEnumToSelectData = <T extends string[]>(data: T) => {
    return data.map(d => ({ label: d.fromSnakeToSentenceCase(['CF']), value: d }));
};

export const parseDate = (value?: Date | number): Date | undefined => {
    if (value instanceof Date) {
        return value;
    } else if (typeof value === 'number') {
        return new Date(value * 1000);
    }
    return;
};

export const bytesToMB = (bytes: number | string): number => {
    return +(+bytes / (1024 * 1024)).toFixed(2);
};

export const cleanupActions = (actions: string[]): string[] => {
    if (actions.includes('*')) {
        return ['*'];
    }
    const wildcardPrefixes = new Set<string>();

    for (const action of actions) {
        if (action.endsWith(':*')) {
            const prefix = action.slice(0, -2); // Remove ":*"
            wildcardPrefixes.add(prefix);
        }
    }

    function isCoveredByWildcard(action: string): boolean {
        if (action.endsWith(':*')) {
            return false;
        }

        const parts = action.split(':');
        for (let i = 1; i < parts.length; i++) {
            const prefix = parts.slice(0, i).join(':');
            if (wildcardPrefixes.has(prefix)) {
                return true;
            }
        }
        return false;
    }

    return actions.filter(action => !isCoveredByWildcard(action));
};

export const extractAllIds = (node: TreeNode) => {
    const ids = [node.id];

    if (node.children) {
        for (const child of node.children) {
            ids.push(...extractAllIds(child));
        }
    }

    return ids;
};
