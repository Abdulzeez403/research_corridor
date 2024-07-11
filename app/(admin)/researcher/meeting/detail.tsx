"use client"
import React, { useEffect } from 'react'
import { useAppointments } from './context'
import { Button } from '@/components/ui/button'

export const MeetingDetail = () => {
    const { getAppointments, appointments } = useAppointments()
    useEffect(() => {
        getAppointments();
        console.log(appointments)

    }, []);

    const meetings = [
        {
            id: 1,
            agende: "The meeting",
            date: "20-10-200",
            time: "12:00"
        },
        {
            id: 2,
            agende: "The meeting",
            date: "20-10-200",
            time: "12:00"
        },
        {
            id: 3,
            agende: "The meeting",
            date: "20-10-200",
            time: "12:00"
        }
    ]
    return (
        <div className='flex gap-2'>
            {
                meetings.map((m) => (
                    <div key={m?.id} className='border-2  p-4  w-60'>
                        <h4>{m.agende}</h4>
                        <h4>{m.date}</h4>
                        <h4>{m.time}</h4>

                        <Button>Delete</Button>
                        <Button>Edit</Button>

                    </div>
                ))
            }

        </div>
    )
}
