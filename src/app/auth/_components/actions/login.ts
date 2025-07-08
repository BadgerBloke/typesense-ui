'use server';

import { signIn } from '~/lib/auth';

export const loginAction = async ({ provider, redirectTo }: { provider: string; redirectTo: string }) => {
    await signIn(provider, { redirectTo });
};
