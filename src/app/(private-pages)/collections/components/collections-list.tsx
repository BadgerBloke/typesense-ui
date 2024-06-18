import Link from 'next/link';
import { format } from 'date-fns';
import { CollectionSchema } from 'typesense/lib/Typesense/Collection';

import Typography from '~/components/atoms/typography';
import { Badge } from '~/components/ui/badge';
import { buttonVariants } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import { cn } from '~/lib/utils';

import CollectionDeleteButton from './collection-delete-button';

// {
//     created_at: 1718687547,
//     default_sorting_field: '',
//     enable_nested_fields: false,
//     fields: [Array],
//     name: 'test_collection',
//     num_documents: 0,
//     symbols_to_index: [],
//     token_separators: []
//   }
const CollectionsList = ({ collections }: { collections: CollectionSchema[] }) => (
    <Card className="bg-muted/15">
        <CardHeader>
            <div className="flex w-full justify-between">
                <div className="flex flex-col gap-2">
                    <CardTitle>Collections</CardTitle>
                    <CardDescription>
                        The collections are returned sorted by creation date, with the most recent collections appearing
                        first.
                    </CardDescription>
                </div>
                <Link href="/collections/add" className={cn(buttonVariants(), 'w-fit')}>
                    Create collections
                </Link>
            </div>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Documents</TableHead>
                        <TableHead>Default sorting field</TableHead>
                        <TableHead>Nested fields</TableHead>
                        <TableHead className="hidden md:table-cell">Fields</TableHead>
                        <TableHead className="hidden md:table-cell">Symbols to index</TableHead>
                        <TableHead className="hidden md:table-cell">Token separators</TableHead>
                        <TableHead className="hidden md:table-cell">Created at</TableHead>
                        <TableHead>
                            <span className="sr-only">Actions</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {collections.map(collection => (
                        <TableRow key={collection.name}>
                            <TableCell className="font-medium">{collection.name}</TableCell>
                            <TableCell className="font-medium">{collection.num_documents}</TableCell>
                            <TableCell>
                                <Typography variant="code">{collection.default_sorting_field || 'Not available'}</Typography>
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline">{collection.enable_nested_fields ? 'Enabled' : 'Disabled'}</Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                {collection.fields?.map(f => f.name).join(', ')}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                {collection.symbols_to_index?.join(', ') || 'None'}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                {collection.token_separators?.join(', ') || 'None'}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{format(collection.created_at, 'PPP')}</TableCell>
                            <TableCell>
                                <CollectionDeleteButton name={collection.name} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
        <CardFooter>
            <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>32</strong> products
            </div>
        </CardFooter>
    </Card>
);

export default CollectionsList;
