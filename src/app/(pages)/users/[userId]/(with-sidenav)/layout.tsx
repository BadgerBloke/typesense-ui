import { Fragment } from 'react';

import Header from '~/components/organisms/layout/header';
import Navigation from '~/components/organisms/layout/navigation';

const PagesLayout: React.FC<{ children: React.ReactNode; params: { userId: string } }> = async ({ children, params }) => (
    <Fragment>
        <Header className="sticky top-0 max-w-full bg-background/50 backdrop-blur-md sm:px-4" />
        <div className="flex w-full">
            <Navigation orgId={params.userId}>{children}</Navigation>
        </div>
    </Fragment>
);

export default PagesLayout;
