import { TreeNode } from '~/components/ui/checkbox-tree';

export const API_ACTIONS: TreeNode = {
    id: '*',
    label: 'Allows all operations.',
    children: [
        {
            id: 'collections:*',
            label: 'Allow all kinds of collection related operations.',
            children: [
                { id: 'collections:create', label: 'Allows a collection to be created.' },
                { id: 'collections:delete', label: 'Allows a collection to be deleted.' },
                { id: 'collections:get', label: 'Allows a collection schema to be retrieved.' },
                { id: 'collections:list', label: 'Allows retrieving all collection schema.' },
            ],
        },
        {
            id: 'documents:*',
            label: 'Allows all document operations.',
            children: [
                { id: 'documents:search', label: 'Allows only search requests.' },
                { id: 'documents:get', label: 'Allows fetching a single document.' },
                { id: 'documents:create', label: 'Allows creating documents.' },
                { id: 'documents:upsert', label: 'Allows upserting documents.' },
                { id: 'documents:update', label: 'Allows updating documents.' },
                { id: 'documents:delete', label: 'Allows deletion of documents.' },
                { id: 'documents:import', label: 'Allows import of documents in bulk.' },
                { id: 'documents:export', label: 'Allows export of documents in bulk.' },
            ],
        },
        {
            id: 'aliases:*',
            label: 'Allows all alias operations.',
            children: [
                { id: 'aliases:list', label: 'Allows all aliases to be fetched.' },
                { id: 'aliases:get', label: 'Allows a single alias to be retrieved' },
                { id: 'aliases:create', label: 'Allows the creation of aliases.' },
                { id: 'aliases:delete', label: 'Allows the deletion of aliases.' },
            ],
        },
        {
            id: 'synonyms:*',
            label: 'Allows all synonym operations.',
            children: [
                { id: 'synonyms:list', label: 'Allows all synonyms to be fetched.' },
                { id: 'synonyms:get', label: 'Allows a single synonym to be retrieved' },
                { id: 'synonyms:create', label: 'Allows the creation of synonyms.' },
                { id: 'synonyms:delete', label: 'Allows the deletion of synonyms.' },
            ],
        },
        {
            id: 'overrides:*',
            label: 'Allows all override operations.',
            children: [
                { id: 'overrides:list', label: 'Allows all overrides to be fetched.' },
                { id: 'overrides:get', label: 'Allows a single override to be retrieved' },
                { id: 'overrides:create', label: 'Allows the creation of overrides.' },
                { id: 'overrides:delete', label: 'Allows the deletion of overrides.' },
            ],
        },
        {
            id: 'stopwords:*',
            label: 'Allows all stopwords operations.',
            children: [
                { id: 'stopwords:list', label: 'Allows all stopword sets to be fetched.' },
                { id: 'stopwords:get', label: 'Allows a single stopword set to be retrieved' },
                { id: 'stopwords:create', label: 'Allows the creation of a stopword set.' },
                { id: 'stopwords:delete', label: 'Allows the deletion of a stopword set.' },
            ],
        },
        {
            id: 'keys:*',
            label: 'Allows all API Key related operations.',
            children: [
                { id: 'keys:list', label: 'Allows fetching of metadata for all keys' },
                { id: 'keys:get', label: 'Allows metadata for a single key to be fetched' },
                { id: 'keys:create', label: 'Allows the creation of API keys.' },
                { id: 'keys:delete', label: 'Allows the deletion of API keys.' },
            ],
        },
        { id: 'metrics.json:list', label: 'Allows access to the metrics endpoint.' },
        { id: 'stats.json:list', label: 'Allows access to the stats endpoint.' },
        { id: 'debug:list', label: 'Allows access to the /debug endpoint.' },
    ],
};
