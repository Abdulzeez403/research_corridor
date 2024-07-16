"use client"

import CardComponent from '@/app/components/card/index'
import React, { useEffect, useState } from 'react'
import { UsersRound, MessageCircleMore, BookCheck, ChevronRight, Activity, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image'
import User from "../../../public/student.jpg"
import { useSupervisorProfile } from './context';
import { useSupervisorDocuments } from './document/context';
import { useResearchers } from './researcher/context';
import { useValidationRequests } from './validation/context';
import { useNotifications } from '../researcher/notificaton/context';
import { ReatTableComponent } from './components/read';






interface INotification {
    // title: string,
    description: string
}

export const SupervisorDashboard = () => {

    const { getDocuments, documents } = useSupervisorDocuments();
    const { getResearchers, researchers } = useResearchers()
    const { fetchProfile, profile } = useSupervisorProfile();
    const { fetchAllValidationRequests, validationRequests } = useValidationRequests();

    const { getNotifications, notifications } = useNotifications();

    useEffect(() => {
        fetchProfile()
        getResearchers();
        getDocuments()
        fetchAllValidationRequests()
        getNotifications()
    }, [])

    const NotificationItem = ({ description }: INotification) => (
        <div className=" flex justify-between my-4 ">
            <div className='flex gap-x-2 items-center'>
                <div className="bg-green-400 rounded-md p-2">
                    <BookCheck className="text-white" />
                </div>
                <div>
                    {/* <h4 className="text-sm font-semibold">{title}</h4> */}
                    <p className="text-xs">{description}</p>
                </div>
            </div>

            <ChevronRight />
        </div>
    );





    return (




        <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex flex-col w-full lg:w-3/4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 pt-5">
                    <CardComponent
                        title="Researchers"
                        total={researchers.length}
                        subtitle="Total Researcher"
                        icon={<UsersRound className="h-5 w-5" />}
                    />
                    <CardComponent
                        title="Documents"
                        total={documents?.length}
                        subtitle="Total Document"
                        icon={<BookCheck className="h-5 w-5" />}
                    />
                    <CardComponent
                        title="Topic Validations"
                        total={validationRequests.length}
                        subtitle="Total Topic validation"
                        icon={<BookCheck className="h-5 w-5" />}
                    />
                </div>
                <div className="mt-6">
                    <ReatTableComponent validationRequests={validationRequests as any} />
                </div>
            </div>
            <div className="flex flex-col w-full lg:w-1/4">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="text-2xl text-customPrimary">Notification</CardTitle>
                        <CardDescription>Recent activities from researchers and supervisors.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="pb-6">
                            <div className="flex justify-between">
                                <h4 className="font-bold">Messages</h4>
                                <Mail className="h-5 w-5" />
                            </div>
                            <div>
                                <div className="flex gap-x-2 items-center py-2">
                                    <Image src={User} alt="image" width={50} height={70} className="rounded-full" />
                                    <div>
                                        <h4 className="text-sm font-semibold">Abdulazeez Sodiq</h4>
                                        <p className="text-xs">The topic has been validated!</p>
                                    </div>
                                </div>
                                <div className="flex gap-x-2 items-center py-2">
                                    <Image src={User} alt="image" width={50} height={70} className="rounded-full" />
                                    <div>
                                        <h4 className="text-sm font-semibold">Abdulazeez Sodiq</h4>
                                        <p className="text-xs">The topic has been validated!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between">
                                <h4 className="font-bold">Activities</h4>
                                <Activity className="h-5 w-5" />
                            </div>
                            {notifications.map((notification, index) => (
                                <NotificationItem key={index} description={notification.message} />
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>

    )
}

