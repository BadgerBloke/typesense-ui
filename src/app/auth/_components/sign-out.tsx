'use client';

import { usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';

import { Button } from '~/components/ui/button';

import { logoutAction } from './actions/logout';

const SignOutButton = () => {
    const redirectTo = usePathname();
    return (
        <form action={() => logoutAction({ redirectTo })}>
            <Button type="submit" className="w-full justify-start">
                <LogOut className="size-4 mr-2" /> Logout
            </Button>
        </form>
    );
};

export default SignOutButton;
