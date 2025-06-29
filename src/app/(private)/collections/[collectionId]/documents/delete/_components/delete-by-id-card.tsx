import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';

import DeleteByIDForm from './delete-by-id-form';

const DeleteByIDCard = () => {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Delete by id</CardTitle>
                <CardDescription>Delete a document by its id.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex w-full flex-col gap-4">
                    <DeleteByIDForm />
                </div>
            </CardContent>
        </Card>
    );
};

export default DeleteByIDCard;
