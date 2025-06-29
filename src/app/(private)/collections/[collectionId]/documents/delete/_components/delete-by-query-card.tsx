import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';

import DeleteByQueryForm from './delete-by-query-form';

const DeleteByQueryCard = () => {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Delete by query</CardTitle>
                <CardDescription>Delete all documents matching a query.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex w-full flex-col gap-4">
                    <DeleteByQueryForm />
                </div>
            </CardContent>
        </Card>
    );
};

export default DeleteByQueryCard;
