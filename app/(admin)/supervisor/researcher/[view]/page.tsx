"use client";
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useProgress } from '../../progress/context';
import { Button } from '@/components/ui/button';
import ProgressBar from "@ramonak/react-progress-bar";
import { ResponsiveDrawerDialog } from '@/app/components/modals/responsivedrawer';
import ProgressForm from '../../progress/form';

function ViewPage() {
    const urlPath = usePathname();
    const id = urlPath.split('/')[3];

    const { allProgress, getAllProgress, getSingleProgress, singleProgress } = useProgress();
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        getAllProgress('2023-2024');
        getSingleProgress(id)
        console.log(singleProgress)
    }, []);

    const formatDate = (dateTime: string) => {
        const date = new Date(dateTime);
        return date.toLocaleDateString();
    };

    const formatTime = (dateTime: string) => {
        const date = new Date(dateTime);
        return date.toLocaleTimeString();
    };

    const handleClose = () => {
        setDrawerOpen(false);
    };

    const handleOpen = () => {
        setDrawerOpen(true);
    };

    const headers = ['Comment', 'Date', 'Time'];

    return (
        <div>
            <div className="block md:flex md:gap-x-10 lg:flex lg:gap-x-10">
                <div className="border-2 p-4 w-full md:w-80 lg:w-80">
                    <div className="flex justify-center m-0 bg-customSecondary rounded-md">
                        <div className='flex justify-between align-center p-2 pb-3 bg-customSecondary rounded-md '>
                            <div className="block justify-center py-2 ">
                                <h4 className='text-white text-sm py-2'>{singleProgress?.researcherId?.name as any}</h4>
                            </div>
                        </div>
                    </div>
                    <div className='pt-2 flex justify-center mx-0'>
                        <div className='flex gap-x-4'>
                            <div className="text-center">
                                <h4>{singleProgress?.researcherId?.name}</h4>
                                {/* <h4>{allProgress?.[0]?.role}</h4> */}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <Table className='border-2'>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <div className="font-medium">Name:</div>
                                </TableCell>
                                <TableCell>
                                    <div className="font-medium">{singleProgress?.researcherId?.name}</div>
                                </TableCell>
                            </TableRow>
                            {/* <TableRow>
                                <TableCell>
                                    <div className="font-medium">Email:</div>
                                </TableCell>
                                <TableCell>
                                    <div className="font-medium">{allProgress?.[0]?.email}</div>
                                </TableCell>
                            </TableRow> */}
                            <TableRow>
                                <TableCell>
                                    <div className="font-medium">Matric:</div>
                                </TableCell>
                                <TableCell>
                                    <div className="font-medium">{singleProgress?.researcherId?.matric}</div>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>
                                    <div className="font-medium">Topic</div>
                                </TableCell>
                                <TableCell>
                                    <div className="font-medium">{singleProgress?.researcherId?.topic ? singleProgress?.researcherId?.topic : "N/L"}</div>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <div className="font-medium">Phone:</div>
                                </TableCell>
                                <TableCell>
                                    <div className="font-medium">081948594854</div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>

            <div className="pt-8">
                <h4 className='font-semibold text-lg'> Researcher Progress</h4>
                <ProgressBar
                    completed={singleProgress?.progressPercent || 0}
                    labelColor="#E5B671"
                />
            </div>

            <Button onClick={handleOpen} className='my-2'>Update Progress</Button>

            <div className="w-full">
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
                        {singleProgress && singleProgress?.comments?.length > 0 ? (
                            singleProgress?.comments.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.comment}</TableCell>
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
            </div>

            <ResponsiveDrawerDialog
                title="Researcher Progressing"
                description="Researcher progressing!"
                isOpen={isDrawerOpen}
                onClose={handleClose}
            >
                <ProgressForm progressId={singleProgress?._id} />
            </ResponsiveDrawerDialog>
        </div>
    );
}

export default ViewPage;
