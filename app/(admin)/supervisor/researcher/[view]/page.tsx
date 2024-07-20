"use client"
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useResearchers } from '../context';
import { Button } from '@/components/ui/button';
import ProgressBar from "@ramonak/react-progress-bar";
import { ResponsiveDrawerDialog } from '@/app/components/modals/responsivedrawer';
import ProgressForm from '../../progress/form';
import { ProgressDetail } from '../../progress/detail';

function ViewPage() {
    const urlPath = usePathname();
    const id = urlPath.split('/')[3];

    const { getResearcherById, researcher: user } = useResearchers();

    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const handleClose = () => {
        setDrawerOpen(false)
    }

    const handleOpen = () => {
        setDrawerOpen(true)
    }


    useEffect(() => {
        getResearcherById(id)
    }, [])

    return (
        <div>

            <div className="block md:flex md:gap-x-10 lg:flex lg:gap-x-10">
                <div className="border-2 p-4 w-full md:w-80 lg:w-80">
                    {/* <div className='flex justify-center mx-0 border-2-b'>
                        <Image src={User} alt="user" width={100} height={100} />
                    </div> */}
                    <div className="flex justify-center m-0 bg-customSecondary rounded-md">
                        <div className='flex justify-between align-center p-2 pb-3 bg-customSecondary rounded-md '>
                            <div className="block justify-center py-2 ">
                                <h4 className='text-white text-sm py-2'>{user?.name}</h4>
                            </div>
                        </div>


                    </div>
                    <div className='pt-2 flex justify-center mx-0'>
                        <div className='flex gap-x-4'>


                            <div className="text-center">
                                <h4>{user?.name}</h4>
                                <h4>{user?.role}</h4>

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
                                    <div className="font-medium">{user?.name}</div>
                                </TableCell>
                            </TableRow >
                            <TableRow>

                                <TableCell>
                                    <div className="font-medium">Email:</div>
                                </TableCell>
                                <TableCell>
                                    <div className="font-medium">{user?.email}</div>
                                </TableCell>
                            </TableRow >
                            <TableRow>
                                <TableCell>
                                    <div className="font-medium">Matric:</div>
                                </TableCell>
                                <TableCell>
                                    <div className="font-medium">{user?.matric}</div>
                                </TableCell>
                            </TableRow >





                            <TableRow>
                                <TableCell>
                                    <div className="font-medium">Phone:</div>
                                </TableCell>
                                <TableCell>
                                    <div className="font-medium">{user?.phone}</div>
                                </TableCell>
                            </TableRow >

                        </TableBody>
                    </Table>
                </div>
            </div>

            <div className="pt-8">
                <h4 className='font-semibold text-lg'> Researcher Progress</h4>
                <ProgressBar
                    completed={user?.progress?.progressPercent as any}
                    labelColor="#e80909"
                />
            </div>

            <Button onClick={() => handleOpen()} className='my-2'>Update Progress</Button>

            <div className="w-full">
                <ProgressDetail />
            </div>

            <ResponsiveDrawerDialog
                title="Researcher Progressing"
                description="Researcher progressing!"
                isOpen={isDrawerOpen}
                onClose={handleClose}
            >
                <ProgressForm />
            </ResponsiveDrawerDialog>

        </div >
    )
}

export default ViewPage;
