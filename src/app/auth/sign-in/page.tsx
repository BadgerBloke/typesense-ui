import { Metadata } from 'next';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';

import { KeycloakSignInButton, OktaSignInButton } from './_components/sign-buttons';

export const metadata: Metadata = {
    title: 'Sign In',
    description: 'Sign in to your Typesense account.',
};

const LoginPage = async ({ searchParams }: { searchParams: Promise<{ callbackUrl?: string }> }) => {
    const { callbackUrl } = await searchParams;
    return (
        <div className="flex w-screen items-center justify-center h-svh flex-col px-4">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>Sign in to your Typesense account.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <KeycloakSignInButton callbackUrl={callbackUrl} />
                    <OktaSignInButton callbackUrl={callbackUrl} />
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginPage;
