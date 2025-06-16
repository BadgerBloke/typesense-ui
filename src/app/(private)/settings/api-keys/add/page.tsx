import { client } from '~/lib/services/typesense';

import ApiKeyCreationCard from '../components/api-key-creation-form';

const SettingsPage = async () => {
    const collections = await client.collections().retrieve();

    return <ApiKeyCreationCard collections={collections} />;
};

export default SettingsPage;
