
"use client"
import { UploodModel } from '@/constant/models';
import React, { useEffect, useState } from 'react'
import { columns } from "./column";
import { TableComponent } from './table/datatable';
import CardComponent from '@/app/components/card/index';
import { UsersRound } from 'lucide-react';
import { ValidationRequest, useValidationRequests } from './context';
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



    const handleView = (value: ValidationRequest) => {
        return value?._id
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
            <div>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-5">
                    <CardComponent
                        title="Validation Requests"
                        total={validationRequests.length}
                        subtitle="Total number of all Researcher"
                        icon={<UsersRound className="h-5 w-5" />}
                    />





                </div>

            </div>
            <div className="py-10">
                <TableComponent
                    columns={createColumns}
                    data={validationRequests}
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
