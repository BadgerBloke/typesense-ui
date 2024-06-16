export const IAM = {
    baseUrl: String(process.env.NEXT_PUBLIC_IAM_BASE_URL),
};

export const CLIENT = {
    host: String(process.env.NEXT_PUBLIC_HOST_URL),
    domain: String(process.env.CLIENT_DOMAIN),
};

export const COOKIES = {
    authorization: 'Authorization',
    refresh: 'Refresh',
    iamProvider: 'IAM-Provider',
    providerAccessToken: 'Provider-Access-Token',
    providerRefreshToken: 'Provider-Refresh-Token',
    provider: 'Provider',
    rememberMe: 'Remember-Me',
};
