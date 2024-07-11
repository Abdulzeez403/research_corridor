"use client";
import React, { useState } from "react";
import { DataTableViewOptions } from "@/app/components/table/tableItems/filter";
import { DataTablePagination } from "@/app/components/table/tableItems/paginations";
import { StatusFilter } from "@/app/components/table/tableItems/statusfilter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ResponsiveDrawerDialog } from "../../../../components/modals/responsivedrawer";
import { CloudUpload } from 'lucide-react';

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    onDismiss: () => void;
    onView: (value: any) => void;
    onOpen: () => void;
    open: boolean;
    children: React.ReactNode;
    title: any;
    description: string;
}

export function TableComponent<TData, TValue>({
    columns,
    data,
    onDismiss,
    onView,
    onOpen,
    open,
    children,
    title,
    description,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

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
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
    });

    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState<TData | null>(null);

    const handleView = (rowId: string) => {
        const selected = data.find((row) => (row as any)._id === rowId);
        setSelectedRow(selected || null);
        setModalOpen(true);
    };


    return (
        <div className="border-2 rounded-lg p-4">
            <div className="flex justify-between items-center ">
                <div className="flex items-center gap-x-2">
                    <div className="flex items-center py-4">
                        <Input
                            placeholder="Search name"
                            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                            onChange={(event: any) =>
                                table.getColumn("title")?.setFilterValue(event.target.value)
                            }
                            className="max-w-sm"
                        />
                    </div>

                </div>
                <div className=" flex items-center">
                    <div>
                        {/* <DataTableViewOptions table={table} /> */}
                    </div>
                    <Button className="ml-4" onClick={onOpen}>
                        <h4 className="pr-2">Validation</h4>
                    </Button>
                </div>
            </div>
            <Table className="border-2 rounded-lg border-customPrimary">
                <TableHeader className=" bg-customPrimary  ">
                    {table.getHeaderGroups().map((headerGroup: any) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header: any) => {
                                return (
                                    <TableHead key={header.id} className="text-white font-bold p-2">
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                );
                            })}

                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody className=" border-2 border-customPrimary">
                    {table.getRowModel().rows && table.getRowModel().rows.length > 0 ? (
                        table.getRowModel().rows?.map((row: any) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                className="cursor-pointer"
                                onClick={() => handleView(row.original)}
                            >
                                {row.getVisibleCells().map((cell: any) => (
                                    <TableCell key={cell.id} className="">
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


            <DataTablePagination table={table} />
            <ResponsiveDrawerDialog
                title={title}
                description={description}
                isOpen={open}
                onClose={onDismiss}
            >
                <div>{children}</div>
            </ResponsiveDrawerDialog>
            {selectedRow && (
                <ResponsiveDrawerDialog
                    title={title}
                    description={description}
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                >
                    <div>ththhe</div>
                </ResponsiveDrawerDialog>
            )}
        </div>
    );
}
