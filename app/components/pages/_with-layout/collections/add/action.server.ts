import { collectionsData } from '../action.server';

import type { Route } from '.react-router/types/app/routes/_with-layout+/collections+/+types/add';

export const loader = async () => {
    return collectionsData;
};

export const action = async ({ request }: Route.ActionArgs) => {
    const formData = await request.formData();
    const data = formData.get('name');
    console.log('Form data from add - collections: action ', data);
    if (!data) {
        return new Response('Name is required', { status: 400 });
    }
    collectionsData.collections.push(JSON.parse(data as string));
    return collectionsData;
};
