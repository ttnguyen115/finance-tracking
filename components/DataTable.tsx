"use client";

import { useState } from "react";

// libs
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnDef,
    type ColumnFiltersState,
    type Row,
    type SortingState,
} from "@tanstack/react-table";

// hooks
import { useConfirm } from "@/hooks";

// components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Trash } from "lucide-react";

function DataTable<TData, TValue>({
    columns,
    data,
    filterKey,
    onDelete,
    disabled,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = useState({});

    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to perform a bulk delete."
    );

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            rowSelection,
        },
    });

    const renderFilterInput = () => {
        const tableRows = table.getFilteredSelectedRowModel().rows;
        const tableRowCount = tableRows.length;

        const handleClickDelete = async () => {
            const ok = await confirm();
            if (ok) {
                onDelete(tableRows);
                table.resetRowSelection();
            }
        };

        return (
            <div className="flex items-center py-4">
                <Input
                    placeholder={`Filter ${filterKey}... `}
                    value={(table.getColumn(filterKey)?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn(filterKey)?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                {tableRowCount > 0 && (
                    <Button
                        disabled={disabled}
                        size="sm"
                        variant="outline"
                        className="ml-auto font-normal text-xs"
                        onClick={handleClickDelete}
                    >
                        <Trash className="size-4 mr-2" />
                        Delete ({tableRows.length})
                    </Button>
                )}
            </div>
        );
    };

    const renderTablePagination = () => (
        <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <Button
                variant="outline"
                size="sm"
                onClick={table.previousPage}
                disabled={!table.getCanPreviousPage()}
            >
                Previous
            </Button>
            <Button
                variant="outline"
                size="sm"
                onClick={table.nextPage}
                disabled={!table.getCanNextPage()}
            >
                Next
            </Button>
        </div>
    );

    return (
        <div>
            <ConfirmDialog />
            {renderFilterInput()}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef.header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
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
            {renderTablePagination()}
        </div>
    );
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    filterKey: string;
    onDelete: (rows: Row<TData>[]) => void;
    disabled?: boolean;
}

export default DataTable;
