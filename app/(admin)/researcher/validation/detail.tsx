"use client"
import React, { useEffect, useState } from 'react'
import { TableComponent } from './table/datatable'
import { useUploadTopic } from './context'
import ValidateTopicForm from './form';
import { columns } from "./column";
import CardComponent from '@/app/components/card';
import { UsersRound } from 'lucide-react';


export const Detail = () => {

    const { getTopic, topics } = useUploadTopic();
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        getTopic()
    }, [])


    const handleUpdate = (user: any) => {
        setDrawerOpen(!isDrawerOpen);
    };


    const handleView = (value: any) => {
        return value?.id
    };

    const handleClose = () => {
        setDrawerOpen(false)
    }

    const handleCreateNewMember = () => {
        setDrawerOpen(true)
    }



    const createColumns = columns({ onView: handleView });

    return (


        <div>
            <div className="grid gap-4 grid-cols-3 pt-5">
                <CardComponent
                    title="Topic Validations"
                    total={topics?.length}
                    subtitle="Total number of all Researcher"
                    icon={<UsersRound className="h-5 w-5" />}
                />





            </div>
            <TableComponent
                columns={createColumns}
                data={topics}
                onView={handleView}
                open={isDrawerOpen}
                onDismiss={handleClose}
                onOpen={handleCreateNewMember}
                title="Upload Research Document"
                description="This support Doc / Pft / Image / sheet and others!">
                <ValidateTopicForm />
            </TableComponent>
        </div>


    )
}
