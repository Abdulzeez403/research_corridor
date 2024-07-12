"use client"
import React, { useEffect } from 'react'
import { SupervisorDashboard } from './detial'
import { SupervisorProfileProvider, useSupervisorProfile } from './context'
import { AssignedResearchersProvider } from './researcher/context';

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
