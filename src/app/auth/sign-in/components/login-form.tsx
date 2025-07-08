'use client';
import { useSearchParams } from 'next/navigation';

import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';

import { loginAction } from '../../_components/actions/login';

const LoginForm = () => {
    const searchParams = useSearchParams();
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>Sign in to your Typesense account.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <form
                    action={() => loginAction({ provider: 'keycloak', redirectTo: searchParams.get('callbackUrl') ?? '/' })}
                >
                    <Button type="submit">Signin with Keycloak</Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default LoginForm;
