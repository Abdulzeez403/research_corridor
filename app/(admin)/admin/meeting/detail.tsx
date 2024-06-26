"use client"
import React, { useEffect } from 'react'
import { useAppointments } from './context'

export const MeetingDetail = () => {
    const { getAppointments, appointments } = useAppointments()
    useEffect(() => {
        getAppointments();
        console.log(appointments)

    }, [])
    return (
        <div>Appointment</div>
    )
}
