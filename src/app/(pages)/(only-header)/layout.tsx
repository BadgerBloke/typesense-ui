import { Fragment } from 'react';

import Header from '~/components/organisms/layout/header';

const PagesLayout = ({ children }: { children: React.ReactNode }) => (
    <Fragment>
        <Header />
        {children}
    </Fragment>
);

export default PagesLayout;
