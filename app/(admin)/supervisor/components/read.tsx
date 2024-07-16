import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React from 'react';

interface ValidationRequest {
    matric: string;
    topic: string;
    progress: number;
}

interface IProps {
    validationRequests: ValidationRequest[];
}

const headers = ['Matric', 'Topic', 'Progress'];

const getColorForProgress = (progress: number): string => {
    if (progress >= 80) {
        return 'bg-green-500';
    } else if (progress >= 50) {
        return 'bg-yellow-500';
    } else {
        return 'bg-red-500';
    }
};

export const ReatTableComponent: React.FC<IProps> = ({ validationRequests }) => {
    return (
        <Table className='border-2 rounded-lg p-2 my-6'>
            <TableHeader>
                <TableRow>
                    {headers.map((header, index) => (
                        <TableHead
                            key={index}
                            className={`${header === 'Progress' ? 'text-right' : ''} bg-customPrimary text-white`}
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
                    validationRequests.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <div className="font-medium">{item.matric}</div>
                            </TableCell>
                            <TableCell>{item.topic}</TableCell>
                            <TableCell className="text-right w-10">
                                <Progress value={item.progress} className={getColorForProgress(item.progress)} />
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
};
