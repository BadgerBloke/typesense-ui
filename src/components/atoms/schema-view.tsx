import { replacer } from '~/lib/utils';

const SchemaView = <T extends object>({ data }: { data: T }) => (
    <div>
        <pre>{JSON.stringify(data, replacer, 2)}</pre>
    </div>
);

export default SchemaView;
