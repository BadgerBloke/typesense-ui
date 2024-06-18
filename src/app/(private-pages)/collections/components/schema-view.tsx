import { CollectionType } from './schema';

const replacer = (key: string, value: unknown) => {
    if (key === '_id') {
        return undefined;
    }
    return value;
};

const SchemaView = ({ data }: { data: CollectionType }) => (
    <div>
        <pre>{JSON.stringify(data, replacer, 2)}</pre>
    </div>
);

export default SchemaView;
