import nextAuth from 'next-auth';
import Keycloak from 'next-auth/providers/keycloak';

export const { auth, handlers, signIn, signOut } = nextAuth({
    providers: [Keycloak],
    callbacks: {
        authorized: ({ auth }) => {
            return !!auth;
        },
    },
    pages: {
        signIn: '/auth/sign-in',
        signOut: '/auth/sign-in',
        error: '/auth/error',
    },
});
