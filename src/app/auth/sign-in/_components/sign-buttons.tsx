import Image from 'next/image';

import { Button } from '~/components/ui/button';
import { signIn } from '~/lib/auth';

export const KeycloakSignInButton = async ({ callbackUrl }: { callbackUrl?: string }) => {
    const keycloakId = process.env.AUTH_KEYCLOAK_ID;

    return keycloakId ? (
        <form
            action={async () => {
                'use server';
                await signIn('keycloak', { redirectTo: callbackUrl ?? '/' });
            }}
        >
            <Button type="submit">
                <Image
                    src="https://authjs.dev/img/providers/keycloak.svg"
                    alt="Okta"
                    width={20}
                    height={20}
                    className="mr-2"
                />
                Signin with Keycloak
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
            <Button type="submit">
                <Image src="https://authjs.dev/img/providers/okta.svg" alt="Okta" width={20} height={20} className="mr-2" />
                Signin with Okta
            </Button>
        </form>
    ) : null;
};
