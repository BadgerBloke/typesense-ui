import Link from 'next/link';
import { format } from 'date-fns';
import { KeySchema } from 'typesense/lib/Typesense/Key';

import { PlusCircledIcon } from '@radix-ui/react-icons';

import Typography from '~/components/atoms/typography';
import { Badge } from '~/components/ui/badge';
import { buttonVariants } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import { client } from '~/lib/services/typesense';
import { cn } from '~/lib/utils';

interface ExtendedKeySchema extends KeySchema {
    autodelete: boolean;
}

const ApiKeysCard = async () => {
    const { keys } = (await client.keys().retrieve()) as { keys: ExtendedKeySchema[] };
    return keys.length ? (
        <Card>
            <CardHeader className="px-7">
                <div className="flex gap-3 flex-wrap-reverse md:flex-nowrap">
                    <div className="flex flex-col gap-4">
                        <CardTitle>API Keys</CardTitle>
                        <CardDescription>
                            All the API keys. You will be able to see first 4 characters of key.
                        </CardDescription>
                    </div>
                    <Link href="/settings/api-keys/add" className={cn(buttonVariants(), 'w-fit ml-auto')}>
                        <PlusCircledIcon className="h-4 w-4 mr-2" /> Create New API Key
                    </Link>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Description</TableHead>
                            <TableHead className="hidden sm:table-cell">Key</TableHead>
                            <TableHead className="hidden sm:table-cell">Status</TableHead>
                            <TableHead className="hidden sm:table-cell">Auto delete</TableHead>
                            <TableHead className="hidden sm:table-cell">Collections</TableHead>
                            <TableHead className="hidden sm:table-cell">Actions</TableHead>
                            <TableHead className="hidden md:table-cell">Expires at</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {keys.map(key => (
                            <TableRow key={key.id} className="bg-accent/25">
                                <TableCell>
                                    <div className="font-medium">{key.description}</div>
                                    {/* <div className="hidden text-sm text-muted-foreground md:inline">liam@example.com</div> */}
                                </TableCell>
                                <TableCell>
                                    <Typography variant="code">{`${key.value_prefix}******`}</Typography>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    <Badge
                                        className="text-xs"
                                        variant={key.expires_at && key.expires_at > Date.now() ? 'default' : 'secondary'}
                                    >
                                        {key.expires_at && key.expires_at > Date.now() ? 'Active' : 'Expired'}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge className="text-xs" variant={key.autodelete ? 'default' : 'secondary'}>
                                        {key.autodelete ? 'Yes' : 'No'}
                                    </Badge>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    <div className="flex flex-col gap-2">
                                        {key.collections.map(collection => (
                                            <Typography variant="small" key={collection}>
                                                {collection}
                                            </Typography>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    <div className="flex flex-col gap-2">
                                        {key.actions.map(action => (
                                            <Typography variant="small" key={action}>
                                                {action}
                                            </Typography>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {key.expires_at ? format(key.expires_at, 'PPP') : 'No expiry'}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    ) : (
        <div className="flex flex-1 m-auto w-fit items-center justify-center rounded-lg my-5 border border-dashed shadow-sm">
            <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-2xl font-bold tracking-tight">You have no API Key</h3>
                <p className="text-sm text-muted-foreground">
                    Do not use your master API key any operation.
                    <br />
                    Create your first scoped API Key start the journey
                </p>
            </div>
        </div>
    );
};

export default ApiKeysCard;
