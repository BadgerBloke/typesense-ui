import { format } from 'date-fns';

import Typography from '~/components/atoms/typography';
import { Badge } from '~/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import { client } from '~/lib/services/typesense';

const ApiKeysCard = async () => {
    const { keys } = await client.keys().retrieve();
    return keys.length ? (
        <Card>
            <CardHeader className="px-7">
                <CardTitle>API Keys</CardTitle>
                <CardDescription>All the API keys which has been generated.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Description</TableHead>
                            <TableHead className="hidden sm:table-cell">Status</TableHead>
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
                                <TableCell className="hidden sm:table-cell">
                                    <Badge
                                        className="text-xs"
                                        variant={key.expires_at && key.expires_at > Date.now() ? 'default' : 'secondary'}
                                    >
                                        {key.expires_at && key.expires_at > Date.now() ? 'Active' : 'Expired'}
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
    ) : null;
};

export default ApiKeysCard;
