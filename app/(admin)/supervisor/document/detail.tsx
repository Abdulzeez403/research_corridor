
"use client"
import { UploodModel } from '@/constant/models';
import React, { useEffect, useState } from 'react'
import { columns } from "./column";
import { TableComponent } from './table/datatable';
import CardComponent from '@/app/components/card/index';
import { UsersRound, MessageCircleMore, BookCheck } from 'lucide-react';
import { useSupervisorDocuments } from './context';
import { useAuthContext } from '@/app/(auth)/context';



export function Detail() {
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const { getDocuments, documents } = useSupervisorDocuments();
    const { seasons } = useAuthContext()

    const [seletedSeason, setSelectedSeason] = useState('2023-2024')


    useEffect(() => {
        getDocuments(seletedSeason)
        console.log(documents)
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
                        title="Uploaded Document"
                        total={documents?.length}
                        subtitle="Total number of all Researcher"
                        icon={<UsersRound className="h-5 w-5" />}
                    />





                </div>

            </div>
            <div className="py-10">
                <TableComponent
                    columns={createColumns}
                    data={documents}
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
