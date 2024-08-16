'use client';

import { ChangeEvent, useState } from 'react';

import { ChevronDownIcon } from '@radix-ui/react-icons';
import { IconFilter } from '@tabler/icons-react';
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from '@tanstack/react-table';

import { Button } from '~/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Input } from '~/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';

import { SelectData } from '../organisms/layout/navigation';

const DataTable = <D, K extends string>({
    data,
    columns,
    filterPlaceholder,
    filterKey,
    filterFn,
    filterBy,
}: {
    data: D[];
    columns: ColumnDef<D>[];
    filterPlaceholder?: string;
    filterKey?: K;
    filterFn?: (e: ChangeEvent<HTMLInputElement>, filterBy: string[]) => void;
    filterBy?: SelectData[];
}) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const [filterText, setFilterText] = useState('');
    const [queryBy, setQueryBy] = useState<string[]>([]);

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    const handleFilterFn = (e: ChangeEvent<HTMLInputElement>) => {
        if (filterFn) {
            if (filterBy) {
                filterFn(e, queryBy.length ? queryBy : filterBy.map(d => d.value));
                setFilterText(e.target.value);
            } else {
                throw new Error('You have provided filter function so provide the filter by fields.');
            }
        }
    };
    return (
        <div className="w-full">
            <div className="flex items-center py-4 gap-4">
                <Input
                    placeholder={`Filter ${filterPlaceholder || filterKey?.fromCamelToSpaceSeparated()}...`}
                    value={(filterKey && (table.getColumn(filterKey)?.getFilterValue() as string)) ?? filterText}
                    onChange={event =>
                        filterKey ? table.getColumn(filterKey)?.setFilterValue(event.target.value) : handleFilterFn(event)
                    }
                    className="max-w-sm"
                />
                {filterBy && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="w-56 justify-between" variant="outline">
                                Query by
                                <IconFilter className="w-4 h-4 ml-2" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            {filterBy.map(d => (
                                <DropdownMenuCheckboxItem
                                    key={d.value}
                                    checked={queryBy?.includes(d.value)}
                                    onCheckedChange={e =>
                                        setQueryBy(prev => (e ? [...prev, d.value] : prev?.filter(v => v !== d.value)))
                                    }
                                >
                                    {d.label}
                                </DropdownMenuCheckboxItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter(column => column.getCanHide())
                            .map(column => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={value => column.toggleVisibility(!!value)}
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map(row => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map(cell => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
                    selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DataTable;
