'use server';

import { signOut } from '~/lib/auth';

export const logoutAction = async (args?: { redirectTo?: string }) => {
    if (!args) {
        args = {};
    }

    const { redirectTo } = args;
    await signOut({ redirectTo });
};
