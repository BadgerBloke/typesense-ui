import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';

const DeleteByIDCard = () => {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Delete by id</CardTitle>
                <CardDescription>Delete a document by its id.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex w-full flex-col gap-4">
                    Read the docs for more information on available filter_by options.
                </div>
            </CardContent>
        </Card>
    );
};

export default DeleteByIDCard;
