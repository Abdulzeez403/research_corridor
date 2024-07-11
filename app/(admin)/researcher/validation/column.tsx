import { DataTableColumnHeader } from "@/app/components/table/tableItems/column";
import { Checkbox } from "@/components/ui/checkbox";
import { ISupervisor, ITopicModel, UploodModel } from "@/constant/models";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface IProps {
    onView: (value: ISupervisor) => void;
}

export const columns = ({ onView }: IProps): ColumnDef<ITopicModel, unknown>[] => [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value: any) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "title",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Title" />
        ),
    },

    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Date" />
        ),
        cell: ({ row }) => {
            const createdAt = row.original.createdAt;
            const date = new Date(createdAt);

            const formattedDate = date.toLocaleDateString();

            return (
                <div>
                    <div>{formattedDate}</div>
                </div>
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Time" />
        ),
        cell: ({ row }) => {
            const createdAt = row.original.createdAt;
            const date = new Date(createdAt);


            const formattedTime = date.toLocaleTimeString();

            return (
                <div>
                    <div>{formattedTime}</div>
                </div>
            );
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <div>
                <Button onClick={() => onView(row.original._id as any)}>
                    View Status
                </Button>

            </div>
        ),
        size: 50,
    },
];
