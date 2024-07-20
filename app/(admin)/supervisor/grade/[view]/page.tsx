"use client"
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'


import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useGrades } from '../context';
import AddGradeForm from '../form';
import { ResponsiveDrawerDialog } from '@/app/components/modals/responsivedrawer';


function ViewPage() {
    const urlPath = usePathname();
    const id = urlPath.split('/')[3];

    const { fetchSingleGrade, singleGrade } = useGrades();
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const handleClose = () => {
        setDrawerOpen(false)
    }

    const handleOpen = () => {
        setDrawerOpen(true)
    }

    useEffect(() => {
        fetchSingleGrade(id);
        console.log(singleGrade, "the grade!")
    }, [])



    return (
        <div className="px-20">

            <div className="block md:flex md:gap-x-10 lg:flex lg:gap-x-10">
                <div className="border-2 p-4 w-full md:w-80 lg:w-80">
                    {/* <div className='flex justify-center mx-0 border-2-b'>
                        <Image src={User} alt="user" width={100} height={100} />
                    </div> */}
                    <div className="flex justify-center m-0 bg-customSecondary rounded-md">
                        <div className='flex justify-between align-center p-2 pb-3 bg-customSecondary rounded-md '>
                            <div className="block justify-center py-2 ">
                                <h4 className='text-white text-sm py-2'>{singleGrade?.researcherId?.name}</h4>
                            </div>
                        </div>


                    </div>
                    <div className='pt-2 flex justify-center mx-0'>
                        <div className='flex gap-x-4'>


                            <div className="text-center">
                                <h4>{singleGrade?.researcherId?.name}</h4>
                                <h4>{singleGrade?.researcherId?.matric}</h4>

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
                                    <div className="font-medium">{singleGrade?.name}</div>
                                </TableCell>
                            </TableRow >

                            <TableRow>
                                <TableCell>
                                    <div className="font-medium">Matric:</div>
                                </TableCell>
                                <TableCell>
                                    <div className="font-medium">
                                        {singleGrade?.researcherId?.matric}</div>
                                </TableCell>
                            </TableRow >
                            <TableRow >
                                <TableCell className="flex justify-center m-0">

                                    <Button
                                        onClick={handleOpen}
                                        className="w-full bg-customPrimary text-customSecondary hover:bg-slate-300" >
                                        Update Grade
                                    </Button>
                                </TableCell>



                            </TableRow >


                        </TableBody>
                    </Table>
                </div>
            </div>


            <div className="w-full">
                <Table className='border-2'>
                    <TableBody>
                        <TableRow>
                            <TableCell className="border-2">
                                <div className="font-medium">Introudction</div>
                            </TableCell>
                            <TableCell>
                                <div className="font-medium">{singleGrade?.introduction}</div>
                            </TableCell>
                        </TableRow >

                        <TableRow>
                            <TableCell className="border-2">
                                <div className="font-medium">ResearchMethod</div>
                            </TableCell>
                            <TableCell>
                                <div className="font-medium">{singleGrade?.researchMethod}</div>
                            </TableCell>
                        </TableRow >

                        <TableRow>
                            <TableCell className="border-2">
                                <div className="font-medium">DataAnalysis</div>
                            </TableCell>
                            <TableCell>
                                <div className="font-medium">{singleGrade?.dataAnalysis}</div>
                            </TableCell>
                        </TableRow >

                        <TableRow>
                            <TableCell className="border-2">
                                <div className="font-medium">Discussion</div>
                            </TableCell>
                            <TableCell>
                                <div className="font-medium">{singleGrade?.discussion}</div>
                            </TableCell>
                        </TableRow >

                        <TableRow>
                            <TableCell className="border-2">
                                <div className="font-medium">Language</div>
                            </TableCell>
                            <TableCell>
                                <div className="font-medium">{singleGrade?.language}</div>
                            </TableCell>
                        </TableRow >

                        <TableRow>
                            <TableCell className="border-2">
                                <div className="font-medium">Reference</div>
                            </TableCell>
                            <TableCell>
                                <div className="font-medium">{singleGrade?.reference}</div>
                            </TableCell>
                        </TableRow >

                        <TableRow>
                            <TableCell className="border-2">
                                <div className="font-medium">Formart</div>
                            </TableCell>
                            <TableCell>
                                <div className="font-medium">{singleGrade?.formart}</div>
                            </TableCell>
                        </TableRow >

                        <TableRow>
                            <TableCell className="border-2">
                                <div className="font-medium">reviewLit</div>
                            </TableCell>
                            <TableCell>
                                <div className="font-medium">{singleGrade?.reviewLit}</div>
                            </TableCell>
                        </TableRow >

                        <TableRow>
                            <TableCell className="border-2" >
                                <div className="font-medium">Total</div>
                            </TableCell>
                            <TableCell>
                                <div className="font-medium">{singleGrade?.total}</div>
                            </TableCell>
                        </TableRow >

                    </TableBody>
                </Table>
            </div>

            <ResponsiveDrawerDialog
                title="Grading"
                description="grading researchers"
                isOpen={isDrawerOpen}
                onClose={handleClose}
            >

                <AddGradeForm gradeId={singleGrade?._id} />

            </ResponsiveDrawerDialog>
        </div>
    )
}

export default ViewPage;
