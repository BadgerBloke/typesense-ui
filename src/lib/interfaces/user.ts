export interface UserData {
    exp: number;
    iat: number;
    jti: string;
    iss: string;
    aud: string;
    sub: string; // user id
    typ: string;
    azp: string; // client
    session_state: string;
    acr: string;
    'allowed-origins': string[];
    realm_access: {
        roles: string[];
    };
    // resource_access: { account: { roles: [Array] } },
    scope: string;
    sid: string;
    email_verified: boolean;
    name: string;
    preferred_username: string;
    given_name: string;
    family_name: string;
    email: string;
}

export type Roles = 'owner' | 'manager' | 'reviewer' | 'video_editor' | 'content_editor';
