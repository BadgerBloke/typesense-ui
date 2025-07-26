export const IAM = {
    baseUrl: String(process.env.NEXT_PUBLIC_IAM_BASE_URL),
};

export const TYPESENSE = {
    // host: String(process.env.TYPESENSE_HOST),
    url: String(process.env.TYPESENSE_URL),
    // port: Number(process.env.TYPESENSE_PORT),
    // protocol: String(process.env.TYPESENSE_PROTOCOL),
    timeoutSeconds: Number(process.env.TYPESENSE_CONNECTION_TIMEOUT_SECONDS),
    healthPath: String(process.env.TYPESENSE_HEALTH_PATH),
    apiKey: String(process.env.TYPESENSE_API_KEY),
    version: String(process.env.TYPESENSE_VERSION),
    getHealthCheckUrl: function () {
        return `${this.url}${this.healthPath}`;
    },
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
