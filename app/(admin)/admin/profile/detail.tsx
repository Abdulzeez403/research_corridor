"use client"

import React, { useEffect, useState } from 'react'
import Image from "next/image"
import User from "../../../../public/student.jpg"
import { useResearcherProfile } from './context'
import { ResponsiveDrawerDialog } from '@/app/components/modals/responsivedrawer'
import SupervisorUpdateForm from './form/researcher'
import { Button } from '@/components/ui/button'

export const ProfileDetail = () => {

    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const handleClose = () => {
        setDrawerOpen(false)
    }

    const handleOpen = () => {
        setDrawerOpen(true)
    }
    const { fetchProfile, profile } = useResearcherProfile()

    useEffect(() => {
        fetchProfile()
    }, [])

    return (
        <div>
            <div className="flex gap-x-10">
                <Image src={User} alt="UserImage" width={300} height={300} className="rounded-lg" />

                <Button onClick={handleOpen}>Update Profile</Button>
                <div >
                    <h4 className="font-bold border-b-2 border-customPrimary pb-4">Personal Information</h4>


                    <div className='flex gap-x-30'>
                        <h4 className="font-bold text-md">Name: <span>{profile?.name}</span> (Researcher)</h4>
                        <h4>PhoneNumber: <span>{profile?.phone as any}</span></h4>
                    </div>

                    <div>

                    </div>
                </div>

            </div>

            <ResponsiveDrawerDialog
                title="Validate Your Topic"
                description="Validate Your Topic"
                isOpen={isDrawerOpen}
                onClose={handleClose}
            >
                <div>
                    <SupervisorUpdateForm />
                </div>


            </ResponsiveDrawerDialog>

        </div >
    )
};