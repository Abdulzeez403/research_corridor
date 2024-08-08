import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React from 'react';
import { useValidationRequests } from '../validation/context';
import { useSupervisorDocuments } from './context';
import { Button } from '@/components/ui/button';

interface IProps {
    comments: any[];
    doc: any
}

const headers = ['Comment', 'Date', 'Time', 'Actions'];

export const CommentTableComponent = ({ comments, doc }: IProps) => {


    const formatDate = (dateTime: string) => {
        const date = new Date(dateTime);
        return date.toLocaleDateString(); // Format as needed
    };

    const formatTime = (dateTime: string) => {
        const date = new Date(dateTime);
        return date.toLocaleTimeString(); // Format as needed
    };

    const { commentDelete } = useSupervisorDocuments()

    return (
        <Table className="border-2 rounded-lg p-2 my-6">
            <TableHeader className="">
                <TableRow className="bg-customPrimary">
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
                                <TableCell>{formatDate(item.reviewedDate)}</TableCell>
                                <TableCell>{formatTime(item.reviewedDate)}</TableCell>
                                <TableCell>
                                    <Button onClick={() =>
                                        commentDelete(doc, item?._id)}>Delete</Button>
                                </TableCell>
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
