'use client';
import { useSearchParams } from 'next/navigation';
import { useFormStatus } from 'react-dom';

import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

import { login } from './action';

const LoginForm = () => {
    const searchParams = useSearchParams();
    const loginWithCallback = login.bind(null, searchParams.get('callback') || '/');
    return (
        <Card className="w-full max-w-sm">
            <form action={loginWithCallback}>
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>Enter your email below to login to your account.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" name="email" placeholder="m@example.com" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" name="password" required />
                    </div>
                </CardContent>
                <CardFooter>
                    <SubmitButton />
                </CardFooter>
            </form>
        </Card>
    );
};

const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
        <Button disabled={pending} className="w-full">
            {pending ? 'Signing in...' : 'Sign in'}
        </Button>
    );
};

export default LoginForm;
