// components/columns.ts
import { DataTableColumnHeader } from "@/app/components/table/tableItems/column";
import { Checkbox } from "@/components/ui/checkbox";
import { UploodModel } from "@/constant/models";
import { ColumnDef } from "@tanstack/react-table";
import DataTableRowActions from "./table/dataRowAction";
import Image from "next/image";
import doc from "../../../../public/doc.jpg"
import pdf from "../../../../public/pdf.jpg"
import image from "../../../../public/img.jpg"
import Link from "next/link";
import { Button } from "@/components/ui/button";


interface IProps {
    onEdit: (value: UploodModel) => void;
    onDelete: (value: UploodModel) => void;
    onView: (value: UploodModel) => void;
}


export const columns = ({ onEdit, onDelete, onView }: IProps): ColumnDef<any, unknown>[] => [

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
        accessorKey: "document",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Document Type" />
        ),
        cell: ({ row }) => {
            const filePath = row.original.document;
            const fileExtension = filePath.split('.').pop();
            let imgSrc;
            let bgColor;

            switch (fileExtension) {
                case 'doc':
                case 'docx':
                    imgSrc = doc;
                    bgColor = 'bg-blue-200';
                    break;
                case 'pdf':
                    imgSrc = pdf;
                    bgColor = 'bg-red-200';
                    break;
                case 'jpg':
                case 'jpeg':
                case 'png':
                    imgSrc = image; // Assuming 'image' is the image source for image files
                    bgColor = 'bg-green-200';
                    break;
                default:
                    imgSrc = image; // Default image source
                    bgColor = 'bg-gray-200';
            }

            return (
                <div className={`flex justify-center rounded-lg ${bgColor} w-20 h-20 p-4`}>
                    <Image src={imgSrc} alt="image" width={30} height={30} />
                </div>
            );
        },
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
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const status = row.original.status;
            let bgColor;
            let textColor;

            switch (status) {
                case 'active':
                    bgColor = 'bg-green-100';
                    textColor = 'text-green-700';
                    break;
                case 'inactive':
                    bgColor = 'bg-red-100';
                    textColor = 'text-red-700';
                    break;
                case 'pending':
                    bgColor = 'bg-yellow-100';
                    textColor = 'text-yellow-700';
                    break;
                default:
                    bgColor = 'bg-gray-100';
                    textColor = 'text-gray-700';
            }
            return (
                <div className={`flex items-center justify-center px-2 py-1 rounded-full ${bgColor}`}>
                    <span className={`font-semibold ${textColor}`}>
                        {status}
                    </span>
                </div>
            );
        },
    },

    // {
    //     id: 'actions',
    //     cell: ({ row }) => <DataTableRowActions row={row as any} onEdit={onEdit} onDelete={onDelete} onView={onView} />,
    //     size: 50
    // },


    {
        accessorKey: 'Actions',
        cell: ({ row }) => {
            return (
                <Link href={`/supervisor/document/${(row.original as any)._id}`}>
                    <Button>View</Button>
                </Link>
            );
        },
        size: 50,
    },
];
