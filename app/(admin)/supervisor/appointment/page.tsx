"use client"
import { ResponsiveDrawerDialog } from '@/app/components/modals/responsivedrawer'
import React, { useState } from 'react'
import AppointmentForm from './form';
import { Button } from '@/components/ui/button';

export default function Page() {
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const handleClose = () => {
        setDrawerOpen(false)
    }

    const handleOpen = () => {
        setDrawerOpen(true)
    }

    const meetings = [
        {
            id: 1,
            agenda: "The meeting",
            date: "20-10-200",
            time: "12:00"
        },
        {
            id: 2,
            agenda: "The meeting",
            date: "20-10-200",
            time: "12:00"
        },
        {
            id: 3,
            agenda: "The meeting",
            date: "20-10-200",
            time: "12:00"
        }
    ]
    return (
        <div>
            <Button onClick={handleOpen} className="pb-2">Schedule Appointment</Button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {meetings.map((m) => (
                    <div key={m?.id} className="border border-gray-300 p-4 rounded-lg shadow-md">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-lg font-semibold">{m.agenda}</h4>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-600">Date:</span>
                            <span className="text-sm text-gray-800">{m.date}</span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm font-medium text-gray-600">Time:</span>
                            <span className="text-sm text-gray-800">{m.time}</span>
                        </div>
                        <div className="flex justify-between mt-4">
                            <Button variant="outline" className="mr-2">Edit</Button>
                            <Button variant="destructive">Delete</Button>
                        </div>
                    </div>
                ))}
            </div>

            <ResponsiveDrawerDialog
                title="Create Appointment"
                description="book an appiontment with research"
                isOpen={isDrawerOpen}
                onClose={handleClose}
            >

                <AppointmentForm />
            </ResponsiveDrawerDialog>
        </div>
    )
}
