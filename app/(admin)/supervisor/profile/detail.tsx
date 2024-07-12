"use client"

import React, { useEffect, useState } from 'react'
import Image from "next/image"
import User from "../../../../public/user.png"
import { Button } from '@/components/ui/button'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useSupervisorProfile } from '../context'
import { ResponsiveDrawerDialog } from '@/app/components/modals/responsivedrawer'
import SupervisorUpdateForm from './form/supervisor'

export const ProfileDetail = () => {

    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const handleClose = () => {
        setDrawerOpen(false)
    }

    const handleOpen = () => {
        setDrawerOpen(true)
    }
    const { profile: user } = useSupervisorProfile()



    return (
        <div>

            <div className="block md:flex md:gap-x-10 lg:flex lg:gap-x-10">
                <div className="border-2 p-4 w-full md:w-80 lg:w-80">
                    <div className='flex justify-center mx-0 border-2-b'>
                        <Image src={User} alt="user" width={100} height={100} />
                    </div>
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

                    <Button
                        onClick={handleOpen}
                        className="w-full mt-4 bg-customPrimary text-customSecondary hover:bg-slate-300" >
                        Update Supervisor/Profile
                    </Button>
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
                                    <div className="font-medium">Username:</div>
                                </TableCell>
                                <TableCell>
                                    <div className="font-medium">{user?.name}</div>
                                </TableCell>
                            </TableRow >


                            <TableRow>
                                <TableCell>
                                    <div className="font-medium">Role:</div>
                                </TableCell>
                                <TableCell>
                                    <div className="font-medium">{user?.role}</div>
                                </TableCell>
                            </TableRow >

                            <TableRow>
                                <TableCell>
                                    <div className="font-medium">Department:</div>
                                </TableCell>
                                <TableCell>
                                    <div className="font-medium">{user?.department}</div>
                                </TableCell>
                            </TableRow >

                            <TableRow>
                                <TableCell>
                                    <div className="font-medium">Phone:</div>
                                </TableCell>
                                <TableCell>
                                    <div className="font-medium">{user?.phone ? (<h4>{user?.phone}</h4>) : (<h4>09194838493</h4>)}</div>
                                </TableCell>
                            </TableRow >

                        </TableBody>
                    </Table>
                </div>
            </div>
            <ResponsiveDrawerDialog
                title="Update Profile"
                description="updating supervisor or profile"
                isOpen={isDrawerOpen}
                onClose={handleClose}
            >

                <SupervisorUpdateForm />
            </ResponsiveDrawerDialog>
        </div>
    )
};