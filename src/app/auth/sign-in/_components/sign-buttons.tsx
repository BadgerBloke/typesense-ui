import { signIn } from '~/lib/auth';

import Button from './button';

export const KeycloakSignInButton = async ({ callbackUrl }: { callbackUrl?: string }) => {
    const keycloakId = process.env.AUTH_KEYCLOAK_ID;

    return keycloakId ? (
        <form
            action={async () => {
                'use server';
                await signIn('keycloak', { redirectTo: callbackUrl ?? '/' });
            }}
        >
            <Button src="https://authjs.dev/img/providers/keycloak.svg" alt="Keycloak">
                Sign in with Keycloak
            </Button>
        </form>
    ) : null;
};

export const OktaSignInButton = async ({ callbackUrl }: { callbackUrl?: string }) => {
    const oktaId = process.env.AUTH_OKTA_ID;

    return oktaId ? (
        <form
            action={async () => {
                'use server';
                await signIn('okta', { redirectTo: callbackUrl ?? '/' });
            }}
        >
            <Button src="https://authjs.dev/img/providers/okta.svg" alt="Okta">
                Sign in with Okta
            </Button>
        </form>
    ) : null;
};
