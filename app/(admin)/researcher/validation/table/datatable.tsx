"use client";

import React, { useState } from "react";
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
import { DataTablePagination } from "@/app/components/table/tableItems/paginations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import { ResponsiveDrawerDialog } from "../../../../components/modals/responsivedrawer";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    onDismiss: () => void;
    onView: (value: any) => void;
    onEdit: (value: any) => void;
    onDelete: (value: any) => void;
    handleViewDismiss: (value: any) => void;
    onOpen: () => void;
    modelOpen: boolean;
    selected: boolean;
    open: boolean;
    children: React.ReactNode;
    title: any;
    description: string;
}

export function TableComponent<TData, TValue>({
    columns,
    data,
    onDismiss,
    modelOpen,
    selected,
    handleViewDismiss,
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


            {selected && (
                <ResponsiveDrawerDialog
                    title="Comments"
                    description="Comments for the selected document"
                    isOpen={modelOpen}
                    onClose={handleViewDismiss as any}

                >
                    <div>
                        {(selected as any).comments && (selected as any).comments.length > 0 ? (
                            (selected as any).comments.map((comment: any, index: number) => (
                                <div key={index} className="flex justify-between">
                                    <p>{comment?.comment}</p>
                                    <p className="bg-slate-300 rounded font-semibold px-2 my-2">{comment?.status}</p>

                                </div>

                            ))
                        ) : (
                            <p>No comments available.</p>
                        )}
                    </div>
                </ResponsiveDrawerDialog>
            )}
        </div>
    );
}
