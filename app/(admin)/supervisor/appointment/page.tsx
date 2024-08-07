"use client"
import { ResponsiveDrawerDialog } from '@/app/components/modals/responsivedrawer'
import React, { useEffect, useState } from 'react'
import AppointmentForm from './form';
import { Button } from '@/components/ui/button';
import { useAppointments } from './context';
import { useAuthContext } from '@/app/(auth)/context';

export default function Page() {
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const { getAppointments, appointments, deleteAppointment } = useAppointments()
    useEffect(() => {
        getAppointments("2023-2024");

    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString();
    };

    const handleDelete = (appointmentId: string) => {

        deleteAppointment({ appointmentId });
    };



    const handleClose = () => {
        setDrawerOpen(false)
    }

    const handleOpen = () => {
        setDrawerOpen(true)
    }


    return (
        <div>
            <Button onClick={handleOpen} className="pb-2">Schedule Appointment</Button>

            <div>
                {appointments && appointments.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
                        {appointments.map((m) => (
                            <div key={m._id} className="border border-gray-300 p-4 rounded-lg shadow-md">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="text-lg font-semibold">{m.agenda}</h4>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-gray-600">Date:</span>
                                    <span className="text-sm text-gray-800">{formatDate(m.date)}</span>
                                </div>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-sm font-medium text-gray-600">Time:</span>
                                    <span className="text-sm text-gray-800">{formatTime(m.date)}</span>
                                </div>
                                <div className="flex justify-between mt-4">
                                    {/* <Button variant="outline" className="mr-2">Edit</Button> */}
                                    <Button variant="destructive"
                                        onClick={() =>
                                            handleDelete(m?._id as any)}>Delete</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center p-4">
                        <p className="text-gray-600">No appointments available</p>
                    </div>
                )}
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
