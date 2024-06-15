// components/columns.ts
import { DataTableColumnHeader } from "@/app/components/table/tableItems/column";
import { Checkbox } from "@/components/ui/checkbox";
import { UploodModel } from "@/constant/models";
import { ColumnDef } from "@tanstack/react-table";
import DataTableRowActions from "./table/dataRowAction";



interface IProps {
    onEdit: (user: UploodModel) => void;
    onDelete: (user: UploodModel) => void;
}


export const columns = ({ onEdit, onDelete }: IProps): ColumnDef<UploodModel, unknown>[] => [

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
    //     accessorKey: "email",
    //     header: ({ column }) => (
    //         <DataTableColumnHeader column={column} title="Email" />
    //     ),

    // },
    {
        accessorKey: "time",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Time" />
        ),

    },

    {
        accessorKey: "date",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Date" />
        ),

    },




    // {
    //     accessorKey: "status",
    //     header: ({ column }) => (
    //         <DataTableColumnHeader column={column} title="status" />
    //     ),
    //     cell: ({ row }) => {
    //         const status = row.original.status;
    //         return (
    //             <div className="flex items-center">
    //                 <span
    //                     className={`px-2 py-1 rounded-full  ${status === "active" ? "text-green-500" : "text-red-500"
    //                         }`}
    //                 >
    //                     {status.toUpperCase()}
    //                 </span>
    //                 <FaLink className=" bg-green-600 p-2 rounded-full text-white" size={30} color="white" />
    //             </div>
    //         );
    //     },
    // },

    {
        id: 'actions',
        cell: ({ row }) => <DataTableRowActions row={row as any} onEdit={onEdit} onDelete={onDelete} />,
        size: 50
    },
];
