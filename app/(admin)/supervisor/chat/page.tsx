"use client"
import React, { useEffect } from 'react'
import ChatList from './chatlist'
import AddMessageForm from './addmessage'
import { useSupervisorProfile } from '../context'

export default function Page() {
    const { fetchProfile, profile } = useSupervisorProfile();
    useEffect(() => {
        fetchProfile()

    }, [])
    return (
        <div>
            <ChatList supervisorId={profile?._id as any} season='2023-2024' />
            <AddMessageForm supervisorId={profile?._id as any} season='2023-2024' />
        </div>
    )
}
