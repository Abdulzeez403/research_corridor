// components/columns.ts
import { DataTableColumnHeader } from "@/app/components/table/tableItems/column";
import { Checkbox } from "@/components/ui/checkbox";
import { ISupervisor, UploodModel } from "@/constant/models";
import { ColumnDef } from "@tanstack/react-table";



interface IProps {
    onView: (value: ISupervisor) => void;
}


export const columns = ({ onView }: IProps): ColumnDef<UploodModel, unknown>[] => [

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





    // {
    //     id: 'actions',
    //     cell: ({ row }) => <DataTableRowActions row={row as any} onView={onView} />,
    //     size: 50
    // },
];
