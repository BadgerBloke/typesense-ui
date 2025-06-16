'use client';
import { ChangeEvent, useMemo, useState } from 'react';
import debounce from 'lodash-es/debounce';

import DataTable from '~/components/molecules/data-table';
import { SEARCHABLE_FIELD_TYPE } from '~/lib/constants';
import { DocumentsDataType } from '~/lib/interfaces/table-data-type';

import { CollectionType } from '../../../components/schema';

import { searchDocuments } from './actions';
import { columns } from './columns';

const DocumentsDataTable = ({ documents, collection }: { documents: DocumentsDataType[]; collection: CollectionType }) => {
    const [docs, setDocs] = useState<DocumentsDataType[]>();

    const handleSearch = async (e: ChangeEvent<HTMLInputElement>, queryBy: string[]) => {
        if (e.target.value.length > 2) {
            const res = await searchDocuments({
                q: `${e.target.value}*`,
                queryBy: queryBy.join(','),
                collectionId: collection.name,
            });
            if (res?.hits) {
                setDocs(res.hits as unknown as DocumentsDataType[]);
            }
        } else {
            setDocs(undefined);
        }
    };

    const debouncedHandleSearch = debounce(handleSearch, 1000);

    const filterByFields = useMemo(
        () =>
            collection.fields
                .filter(d => d.index && SEARCHABLE_FIELD_TYPE.includes(d.type))
                .map(d => ({ label: d.name, value: d.name })),
        [collection]
    );
    return (
        <DataTable<DocumentsDataType, keyof DocumentsDataType>
            data={docs ?? documents}
            columns={columns({ collection })}
            filterPlaceholder="document"
            filterFn={debouncedHandleSearch}
            filterBy={filterByFields}
        />
    );
};

export default DocumentsDataTable;
