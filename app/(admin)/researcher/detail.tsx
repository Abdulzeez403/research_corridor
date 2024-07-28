"use client"

import CardComponent from '@/app/components/card/index'
import React, { useEffect, useState } from 'react'
import { UsersRound, MessageCircleMore, BookCheck, ChevronRight, Activity, Mail } from 'lucide-react';
// import { ReatTableComponent } from '@/app/components/table/read';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image'
import User from "../../../public/student.jpg"
import { useUploadTopic } from './validation/context';
import { useResearcherProfile } from './profile/context';
import { useDocumentContext } from './upload/context';
import { useNotifications } from './notificaton/context';
import { ReatTableComponent } from './component/read';






interface INotification {
    // title: string,
    description: string
}

export const ResearcherDashboard = () => {

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


    const { getTopic, topics } = useUploadTopic();
    const { fetchProfile, profile } = useResearcherProfile()
    const { documents, fetchDocuments } = useDocumentContext()
    const { notifications, getNotifications, loading, error } = useNotifications()


    useEffect(() => {
        getTopic()
        fetchProfile()
        fetchDocuments()
        getNotifications()
    }, [])




    return (



        <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex flex-col w-full lg:w-3/4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 pt-5">

                    <CardComponent
                        title="Documents"
                        total={documents?.length}
                        subtitle="Total Document"
                        icon={<BookCheck className="h-5 w-5" />}
                    />
                    <CardComponent
                        title="Topic Validations"
                        total={topics.length}
                        subtitle="Total Topic validation"
                        icon={<BookCheck className="h-5 w-5" />}
                    />
                </div>
                <div className="mt-6">
                    <ReatTableComponent topics={topics} />
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
                            {/* <div>
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
                            </div> */}

                            <h4 className='text-center pt-10'>Coming Soon!</h4>

                        </div>
                        <div>
                            <div className="flex justify-between">
                                <h4 className="font-bold">Activities</h4>
                                <Activity className="h-5 w-5" />
                            </div>
                            <div>
                                <div>
                                    {Array.isArray(notifications) && notifications.length > 0 ? (
                                        notifications.slice(0, 4).map((notification, index) => (
                                            <NotificationItem key={index} description={notification.message} />
                                        ))
                                    ) : (
                                        <p>No notifications available.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                    </CardContent>
                </Card>
            </div>
        </div>

    )
}

