import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React from 'react';

interface IProps {
    comments: any[];
}

const headers = ['Comment', 'Date', 'Time'];

export const CommentTableComponent = ({ comments }: IProps) => {
    const formatDate = (dateTime: string) => {
        const date = new Date(dateTime);
        return date.toLocaleDateString(); // Format as needed
    };

    const formatTime = (dateTime: string) => {
        const date = new Date(dateTime);
        return date.toLocaleTimeString(); // Format as needed
    };

    return (
        <Table className="border-2 rounded-lg p-2 my-6">
            <TableHeader className="">
                <TableRow>
                    {headers.map((header, index) => (
                        <TableHead
                            key={index}
                            className="bg-customPrimary text-white"
                        >
                            {header}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {comments?.length > 0 ?
                    (
                        comments.map((item: any, index: number) => (
                            <TableRow key={index}>
                                <TableCell>{item.message}</TableCell>
                                <TableCell>{formatDate(item.createdAt)}</TableCell>
                                <TableCell>{formatTime(item.createdAt)}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={headers.length} className="text-center">
                                No comments available.
                            </TableCell>
                        </TableRow>
                    )

                }
            </TableBody>
        </Table>
    );
};
