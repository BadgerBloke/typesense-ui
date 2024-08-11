import Navigation from '~/components/organisms/layout/navigation';
import { client } from '~/lib/services/typesense';

const PagesLayout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
    const collections = await client.collections().retrieve();
    const data = collections.map(collection => ({ label: collection.name, value: collection.name }));
    return (
        <div className="flex w-full">
            <Navigation collections={data}>{children}</Navigation>
        </div>
    );
};

export default PagesLayout;
