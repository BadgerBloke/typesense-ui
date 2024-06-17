export const API_ACTIONS: { [key: string]: Array<{ label: string; value: string }> } = {
    'Collection actions': [
        { value: 'collections:create', label: 'Allows a collection to be created.' },
        { value: 'collections:delete', label: 'Allows a collection to be deleted.' },
        { value: 'collections:get', label: 'Allows a collection schema to be retrieved.' },
        { value: 'collections:list', label: 'Allows retrieving all collection schema.' },
        { value: 'collections:*', label: 'Allow all kinds of collection related operations.' },
    ],
    'Document actions': [
        { value: 'documents:search', label: 'Allows only search requests.' },
        { value: 'documents:get', label: 'Allows fetching a single document.' },
        { value: 'documents:create', label: 'Allows creating documents.' },
        { value: 'documents:upsert', label: 'Allows upserting documents.' },
        { value: 'documents:update', label: 'Allows updating documents.' },
        { value: 'documents:delete', label: 'Allows deletion of documents.' },
        { value: 'documents:import', label: 'Allows import of documents in bulk.' },
        { value: 'documents:export', label: 'Allows export of documents in bulk.' },
        { value: 'documents:*', label: 'Allows all document operations.' },
    ],
    'Alias actions': [
        { value: 'aliases:list', label: 'Allows all aliases to be fetched.' },
        { value: 'aliases:get', label: 'Allows a single alias to be retrieved' },
        { value: 'aliases:create', label: 'Allows the creation of aliases.' },
        { value: 'aliases:delete', label: 'Allows the deletion of aliases.' },
        { value: 'aliases:*', label: 'Allows all alias operations.' },
    ],
    'Synonym actions': [
        { value: 'synonyms:list', label: 'Allows all synonyms to be fetched.' },
        { value: 'synonyms:get', label: 'Allows a single synonym to be retrieved' },
        { value: 'synonyms:create', label: 'Allows the creation of synonyms.' },
        { value: 'synonyms:delete', label: 'Allows the deletion of synonyms.' },
        { value: 'synonyms:*', label: 'Allows all synonym operations.' },
    ],
    'Override actions': [
        { value: 'overrides:list', label: 'Allows all overrides to be fetched.' },
        { value: 'overrides:get', label: 'Allows a single override to be retrieved' },
        { value: 'overrides:create', label: 'Allows the creation of overrides.' },
        { value: 'overrides:delete', label: 'Allows the deletion of overrides.' },
        { value: 'overrides:*', label: 'Allows all override operations.' },
    ],
    'Stopwords actions': [
        { value: 'stopwords:list', label: 'Allows all stopword sets to be fetched.' },
        { value: 'stopwords:get', label: 'Allows a single stopword set to be retrieved' },
        { value: 'stopwords:create', label: 'Allows the creation of a stopword set.' },
        { value: 'stopwords:delete', label: 'Allows the deletion of a stopword set.' },
        { value: 'stopwords:*', label: 'Allows all stopwords operations.' },
    ],
    'Keys actions': [
        { value: 'keys:list', label: 'Allows fetching of metadata for all keys' },
        { value: 'keys:get', label: 'Allows metadata for a single key to be fetched' },
        { value: 'keys:create', label: 'Allows the creation of API keys.' },
        { value: 'keys:delete', label: 'Allows the deletion of API keys.' },
        { value: 'keys:*', label: 'Allows all API Key related operations.' },
    ],
    'Misc actions': [
        { value: 'metrics.json:list', label: 'Allows access to the metrics endpoint.' },
        { value: 'stats.json:list', label: 'Allows access to the stats endpoint.' },
        { value: 'debug:list', label: 'Allows access to the /debug endpoint.' },
        { value: '*', label: 'Allows all operations.' },
    ],
};
