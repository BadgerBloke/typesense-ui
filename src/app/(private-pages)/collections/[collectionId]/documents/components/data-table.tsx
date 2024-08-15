'use client';
import DataTable from '~/components/molecules/data-table';
import { DocumentsDataType } from '~/lib/interfaces/table-data-type';

import { CollectionType } from '../../../components/schema';

import { columns } from './columns';

const DocumentsDataTable = ({ documents, collection }: { documents: DocumentsDataType[]; collection: CollectionType }) => {
    return (
        <DataTable<DocumentsDataType, keyof DocumentsDataType>
            data={documents}
            columns={columns({ collection })}
            filterKey="document"
        />
    );
};

export default DocumentsDataTable;
