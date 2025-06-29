import { Metadata } from 'next';

import Typography from '~/components/atoms/typography';

import DeleteByIDCard from './_components/delete-by-id-card';
import DeleteByQueryCard from './_components/delete-by-query-card';

export const metadata: Metadata = {
    title: 'Delete Documents',
    description: 'Delete documents from a collection.',
};

const DeleteDocumentsPage = () => {
    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-1 gap-4 p-4 md:gap-8 md:p-10 justify-between">
                <Typography variant="h1" className="text-3xl font-semibold">
                    Delete documents
                </Typography>
            </div>
            <div className="flex flex-col lg:flex-row gap-6 w-full">
                <DeleteByQueryCard />
                <DeleteByIDCard />
            </div>
        </div>
    );
};

export default DeleteDocumentsPage;
