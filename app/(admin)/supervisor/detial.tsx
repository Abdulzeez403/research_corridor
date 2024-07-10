import React from 'react'
import { useSupervisorProfile } from './context'

export const SupervisorDashboard = () => {
    const { profile } = useSupervisorProfile()
    return (
        <div>{profile?.role}</div>
    )
}
