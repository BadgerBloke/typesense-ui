import { Fragment } from 'react';

import Header from '~/components/organisms/layout/header';
import Navigation from '~/components/organisms/layout/navigation';
import { client } from '~/lib/services/typesense';

const PagesLayout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
    const collections = await client.collections().retrieve();
    const data = collections.map(collection => ({ label: collection.name, value: collection.name }));
    return (
        <Fragment>
            <Header className="sticky top-0 max-w-full bg-background/50 backdrop-blur-md sm:px-4" />
            <div className="flex w-full">
                <Navigation collections={data}>{children}</Navigation>
            </div>
        </Fragment>
    );
};

export default PagesLayout;
