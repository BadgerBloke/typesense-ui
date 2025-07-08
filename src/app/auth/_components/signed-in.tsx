'use client';

import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';

interface Props {
    children: (props: { session: Session }) => React.ReactNode;
}

const SignedIn = ({ children }: Props) => {
    const { data: session } = useSession();

    if (!session) return null;

    return children({ session });
};

export default SignedIn;
