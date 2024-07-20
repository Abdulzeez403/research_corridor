"use client"
import React, { useEffect } from 'react'
import { SupervisorDashboard } from './detial'
import { useSupervisorProfile } from './context'

export default function SupervisorPage() {

    const { profile } = useSupervisorProfile();

    useEffect(() => {
        console.log(profile)
    }, [])
    return (
        <div>
            <SupervisorDashboard />

        </div>
    )
}
