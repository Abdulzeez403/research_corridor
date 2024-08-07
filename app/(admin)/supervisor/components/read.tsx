import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React from 'react';
import { ValidationRequest } from '../validation/context';
import Link from 'next/link';
import { Button } from '@/components/ui/button';



interface IProps {
    validationRequests: ValidationRequest[];
}

const headers = ['Matric', 'Topic', 'Date', "Action"];



export const ReatTableComponent: React.FC<IProps> = ({ validationRequests }) => {
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
                {validationRequests.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={headers.length} className='text-center p-4'>
                            No validation requests found.
                        </TableCell>
                    </TableRow>
                ) : (
                    validationRequests?.slice(0, 5).map((item: ValidationRequest, index: number) => (

                        <TableRow key={index}>
                            <TableCell>
                                <div className="font-medium">{item.matric}</div>
                            </TableCell>
                            <TableCell>{item.topic}</TableCell>
                            <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>

                            <TableCell>
                                <Link
                                    href={`/supervisor/validation`}>
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
