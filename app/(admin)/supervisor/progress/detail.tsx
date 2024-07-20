"use client";
import React, { useEffect } from 'react';
import { useProgress } from './context';
import { TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Table } from 'lucide-react';

const headers = ['Comment', 'Date', 'Time'];


export const ProgressDetail = () => {
    const { allProgress, getAllProgress } = useProgress();

    useEffect(() => {
        getAllProgress('2023-2024');
        console.log(allProgress);
    }, []);


    const formatDate = (dateTime: string) => {
        const date = new Date(dateTime);
        return date.toLocaleDateString();
    };

    const formatTime = (dateTime: string) => {
        const date = new Date(dateTime);
        return date.toLocaleTimeString();
    };

    return (
        <Table className="border-2 rounded-lg p-2 my-6">
            <TableHeader>
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
                {allProgress && allProgress.length > 0 ? (
                    allProgress.map((item: any, index: number) => (
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
                )}
            </TableBody>
        </Table>
    );
};
