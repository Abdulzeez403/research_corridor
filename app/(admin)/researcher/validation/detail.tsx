"use client"
import React, { useEffect, useState } from 'react'
import { TableComponent } from './table/datatable'
import { useUploadTopic } from './context'
import ValidateTopicForm from './form';
import { columns } from "./column";
import CardComponent from '@/app/components/card';
import { UsersRound } from 'lucide-react';


export const Detail = () => {

    const { getTopic, topics, deleteTopic } = useUploadTopic();
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        getTopic()
    }, [])


    const handleUpdate = () => {
        setDrawerOpen(!isDrawerOpen);
    };

    const handleDelete = (value: any) => {
        deleteTopic(value?._id)
        console.log(value?._id, "delete!")

    };


    const handleClose = () => {
        setDrawerOpen(false)
    }

    const handleCreateNewMember = () => {
        setDrawerOpen(true)
    }

    const [isModalOpen, setModalOpen] = useState<any | null>(null);
    const [selectedRow, setSelectedRow] = useState<any | null>(null);

    const handleView = (row: any) => {
        setSelectedRow(row);
        setModalOpen(true);
    };

    const handleViewDismiss = () => {
        setModalOpen(false);

    }


    const createColumns = columns({ onEdit: handleUpdate, onDelete: handleDelete, onView: handleView, });

    return (


        <div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-3 pt-5 pb-4">
                <CardComponent
                    title="Topic Validations"
                    total={topics?.length}
                    subtitle="Total number of all Researcher"
                    icon={<UsersRound className="h-5 w-5" />}
                />

            </div>
            <TableComponent
                columns={createColumns as any}
                modelOpen={isModalOpen}
                selected={selectedRow}
                handleViewDismiss={handleViewDismiss}
                data={topics}
                onView={handleView}
                onEdit={handleUpdate}
                onDelete={handleDelete}
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
