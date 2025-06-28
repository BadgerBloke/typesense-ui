import { client } from '~/lib/services/typesense';

import ApiKeyCreationCard from '../components/api-key-creation-form';

const SettingsPage = async () => {
    const collections = client.collections().retrieve();
    return <ApiKeyCreationCard collectionsPromise={collections} />;
};

export default SettingsPage;
