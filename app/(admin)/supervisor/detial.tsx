"use client"

import CardComponent from '@/app/components/card/index'
import React, { useEffect, useState } from 'react'
import { UsersRound, MessageCircleMore, BookCheck, ChevronRight, Activity, Mail } from 'lucide-react';
import { ReatTableComponent } from '@/app/components/table/read';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image'
import User from "../../../public/student.jpg"
import { useSupervisorProfile } from './context';



const notifications = [
    { title: 'New Meeting Scheduled', description: 'Lorem ipsum dolor sit, amet consectetur' },
    { title: 'Task Completed', description: 'Your recent task has been marked as complete' },
    { title: 'New Message', description: 'You have received a new message from John' },
    { title: 'Update Available', description: 'A new update is available for your application' },
    { title: 'Reminder', description: 'Don\'t forget about your upcoming appointment' },
    { title: 'Alert', description: 'Your account password will expire in 3 days' },
];


interface INotification {
    title: string,
    description: string
}

export const SupervisorDashboard = () => {

    const NotificationItem = ({ title, description }: INotification) => (
        <div className=" flex justify-between my-4 ">
            <div className='flex gap-x-2 items-center'>
                <div className="bg-green-400 rounded-md p-2">
                    <BookCheck className="text-white" />
                </div>
                <div>
                    <h4 className="text-sm font-semibold">{title}</h4>
                    <p className="text-xs">{description}</p>
                </div>
            </div>

            <ChevronRight />
        </div>
    );


    const { fetchProfile, profile } = useSupervisorProfile()


    useEffect(() => {
        fetchProfile()

    }, [])


    return (



        <div className='flex gap-x-6'>

            <div>
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 pt-5">
                    <CardComponent
                        title="Researchers"
                        total="20"
                        subtitle="Total number of all Researcher"
                        icon={<UsersRound className="h-5 w-5" />}
                    />
                    <CardComponent
                        title="Pending validations"
                        total="10"
                        subtitle="Total number of all Researcher"
                        icon={<MessageCircleMore className="h-5 w-5" />}
                    />

                    <CardComponent
                        title="Validated"
                        total="30"
                        subtitle="Total number of all Researcher"
                        icon={<BookCheck className="h-5 w-5" />}
                    />

                    <CardComponent
                        title="Meetings"
                        total="30"
                        subtitle="Total number of all Researcher"
                        icon={<BookCheck className="h-5 w-5" />}
                    />


                </div>

                <div>
                    <ReatTableComponent />
                </div>
            </div>

            <div className='hidden md:flex lg:flex'>
                <Card className="w-[400px]">
                    <CardHeader>
                        <CardTitle className='text-2x1 text-customPrimary'>Notification</CardTitle>
                        <CardDescription>Recent activites from researcher ans superviors.</CardDescription>
                    </CardHeader>
                    <CardContent>


                        <div className='pb-6'>
                            <div className="flex justify-between">
                                <h4 className='font-bold'>Messages</h4>
                                <Mail className="h-5 w-5" />
                            </div>

                            <div>
                                <div className='flex gap-x-2 items-center'>
                                    <div className=" py-2">
                                        <Image
                                            src={User}
                                            alt="image"
                                            width={50}
                                            height={70} className="rounded-full" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold">Abdulazeez Sodiq</h4>
                                        <p className="text-xs">The topic has been validated!</p>
                                    </div>
                                </div>

                                <div className='flex gap-x-2 items-center'>
                                    <div className=" py-2">
                                        <Image
                                            src={User}
                                            alt="image"
                                            width={50}
                                            height={70} className="rounded-full" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold">Abdulazeez Sodiq</h4>
                                        <p className="text-xs">The topic has been validated!</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between">
                                <h4 className='font-bold'>Activities</h4>
                                <Activity className="h-5 w-5" />
                            </div>
                            {notifications.map((notification, index) => (
                                <NotificationItem
                                    key={index}
                                    title={notification.title}
                                    description={notification.description}
                                />
                            ))}
                        </div>


                    </CardContent>
                    {/* <CardFooter className="flex justify-between">
                        <Button variant="outline">Cancel</Button>
                        <Button>Deploy</Button>
                    </CardFooter> */}
                </Card>

            </div>

        </div>

    )
}

