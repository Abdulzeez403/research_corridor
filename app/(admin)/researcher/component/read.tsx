import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';



interface IProps {
    topics: any[];
}

const headers = ['Topic', 'Date', "Action"];



export const ReatTableComponent: React.FC<IProps> = ({ topics }) => {
    return (
        <Table className='border-2 rounded-lg p-2 my-6'>
            <TableHeader>
                <TableRow>
                    {headers.map((header, index) => (
                        <TableHead
                            key={index}
                            className={` bg-customPrimary text-white`}
                        >
                            {header}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {topics && topics.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={headers.length} className='text-center p-4'>
                            No validation requests found.
                        </TableCell>
                    </TableRow>
                ) : (
                    topics?.map((item: any, index: number) => (

                        <TableRow key={index}>

                            <TableCell>{item?.title}</TableCell>
                            <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>

                            <TableCell>
                                <Link
                                    href={`/researcher/validation`}>
                                    <Button>View</Button>
                                </Link>
                            </TableCell>


                        </TableRow>

                    ))
                )}
            </TableBody>
        </Table>
    );
};
