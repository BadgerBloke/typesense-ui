'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { CLIENT, COOKIES } from '~/lib/config';

import { SignInFormSchema } from './schema';

export const login = async (callback: string, formData: FormData) => {
    const rawData = Object.fromEntries(formData);
    const validationResult = SignInFormSchema.safeParse({ ...rawData });

    if (!validationResult.success) throw new Error(JSON.stringify({ data: validationResult.error.format() }));

    const cookieStore = await cookies();
    cookieStore.set(COOKIES.authorization, validationResult.data.email, {
        domain: CLIENT.domain,
        secure: true,
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
        expires: 60 * 60 * 24 * 7,
    });
    redirect(callback);
};
