import Typesense from 'typesense';

import { TYPESENSE } from '../config';

export const client = new Typesense.Client({
    apiKey: TYPESENSE.apiKey,
    nodes: [
        {
            host: TYPESENSE.host,
            port: TYPESENSE.port,
            protocol: TYPESENSE.protocol,
        },
    ],
    connectionTimeoutSeconds: TYPESENSE.timeoutSeconds,
});

export const searchClient = new Typesense.SearchClient({
    apiKey: TYPESENSE.apiKey,
    nodes: [
        {
            host: TYPESENSE.host,
            port: TYPESENSE.port,
            protocol: TYPESENSE.protocol,
        },
    ],
    connectionTimeoutSeconds: TYPESENSE.timeoutSeconds,
});
