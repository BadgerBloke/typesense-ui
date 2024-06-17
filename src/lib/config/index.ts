export const IAM = {
    baseUrl: String(process.env.NEXT_PUBLIC_IAM_BASE_URL),
};

export const TYPESENSE = {
    host: String(process.env.TYPESENSE_HOST),
    port: Number(process.env.TYPESENSE_PORT),
    protocol: String(process.env.TYPESENSE_PROTOCOL),
    timeoutSeconds: Number(process.env.TYPESENSE_CONNECTION_TIMEOUT_SECONDS),
    healthPath: String(process.env.TYPESENSE_HEALTH_PATH),
    apiKey: String(process.env.TYPESENSE_API_KEY),
    getHealthCheckUrl: function () {
        return `${this.protocol}://${this.host}:${this.port}${this.healthPath}`;
    },
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
