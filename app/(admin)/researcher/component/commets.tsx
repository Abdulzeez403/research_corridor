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
                                <TableCell>
                                    <ul>
                                        {item.comments?.map((comment: string, commentIndex: number) => (
                                            <li key={commentIndex}>{comment}</li>
                                        ))}
                                    </ul>
                                </TableCell>
                                <TableCell>
                                    <ul>
                                        {item.comments?.map((_: string, commentIndex: number) => (
                                            <li key={commentIndex}>{formatDate(item.createdAt)}</li>
                                        ))}
                                    </ul>
                                </TableCell>
                                <TableCell>
                                    <ul>
                                        {item.comments?.map((_: string, commentIndex: number) => (
                                            <li key={commentIndex}>{formatTime(item.createdAt)}</li>
                                        ))}
                                    </ul>
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
