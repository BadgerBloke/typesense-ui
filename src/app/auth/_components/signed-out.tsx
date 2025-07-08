'use client';

import { useSession } from 'next-auth/react';

const SignedOut = ({ children }: { children: React.ReactNode }) => {
    const { data: session } = useSession();

    if (session) return null;

    return children;
};

export default SignedOut;
