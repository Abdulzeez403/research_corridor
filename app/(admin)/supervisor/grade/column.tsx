import { DataTableColumnHeader } from "@/app/components/table/tableItems/column";
import { Checkbox } from "@/components/ui/checkbox";
import { ISupervisor, ITopicModel, UploodModel } from "@/constant/models";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface IProps {
    onView: (value: ISupervisor) => void;
}

export const columns = ({ onView }: IProps): ColumnDef<any, unknown>[] => [
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
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
    },

    {
        accessorKey: "matric",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Matric" />
        ),
    },

    // {
    //     accessorKey: "progress.progressPercent",
    //     header: ({ column }) => (
    //         <DataTableColumnHeader column={column} title="Progress" />
    //     ),
    // },



    {
        id: 'actions',
        cell: ({ row }) => (
            <Link href={`/supervisor/grade/${(row.original as any).id}`}>
                <Button>
                    View
                </Button>

            </Link>
        ),
        size: 50,
    },
];
