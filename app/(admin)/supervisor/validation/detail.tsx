
"use client"
import { UploodModel } from '@/constant/models';
import React, { useEffect, useState } from 'react'
import { columns } from "./column";
import { TableComponent } from './table/datatable';
import CardComponent from '@/app/components/card/index';
import { UsersRound, MessageCircleMore, BookCheck } from 'lucide-react';
import { useValidationRequests } from './context';
import { useAuthContext } from '@/app/(auth)/context';



export function Detail() {
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const { fetchAllValidationRequests, validationRequests } = useValidationRequests()
    const { seasons } = useAuthContext()

    const [selectedSeason, getSelectedSeason] = useState("2023-2024");


    useEffect(() => {
        fetchAllValidationRequests("2023-2024");
        console.log(validationRequests, "the topic")
    }, [])

    const handleUpdate = (user: UploodModel) => {
        setDrawerOpen(!isDrawerOpen);

    };

    const handleDelete = (user: UploodModel) => {
        alert("Deleted Successfully!")

    };

    const handleView = (value: UploodModel) => {
        return value?.id
    };

    const handleClose = () => {
        setDrawerOpen(false)
    }

    const handleCreateNewMember = () => {
        setDrawerOpen(true)
    }



    const createColumns = columns({ onEdit: handleUpdate, onDelete: handleDelete, onView: handleView });



    return (
        <div>
            <div>
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 pt-5">
                    <CardComponent
                        title="Approved Request"
                        total="20"
                        subtitle="Total number of all Researcher"
                        icon={<UsersRound className="h-5 w-5" />}
                    />
                    <CardComponent
                        title="Pending Requests"
                        total="10"
                        subtitle="Total number of all Researcher"
                        icon={<MessageCircleMore className="h-5 w-5" />}
                    />




                </div>

            </div>
            <div className="py-10">
                <TableComponent
                    columns={createColumns}
                    data={validationRequests}
                    onEdit={handleUpdate}
                    onDelete={handleDelete}
                    onView={handleView}
                    open={isDrawerOpen}
                    onDismiss={handleClose}
                    onOpen={handleCreateNewMember}
                    title="Upload Research Document
                    "
                    description="This support Doc / Pft / Image / sheet and others!">
                    <h4>hdhhdh</h4>

                </TableComponent>
            </div>
        </div>
    )
}
