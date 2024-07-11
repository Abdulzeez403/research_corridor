"use client"
import React, { useEffect, useState } from 'react'
import { TableComponent } from './table/datatable'
import { useUploadTopic } from './context'
import ValidateTopicForm from './form';
import { columns } from "./column";


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


    )
}
