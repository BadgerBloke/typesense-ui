import { Metadata } from 'next';

import LoginForm from './components/login-form';

export const metadata: Metadata = {
    title: 'Sign In',
    description: 'Sign in to your Typesense account.',
};

const LoginPage = () => {
    return (
        <div className="flex w-screen items-center justify-center h-svh flex-col px-4">
            <LoginForm />
        </div>
    );
};

export default LoginPage;
