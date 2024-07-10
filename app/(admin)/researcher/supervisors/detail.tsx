
"use client"
import { ISupervisor, UploodModel } from '@/constant/models';
import React, { useEffect, useState } from 'react'
import { columns } from "./column";
import { TableComponent } from './table/datatable';
import CardComponent from '@/app/components/card/index';
import { UsersRound, MessageCircleMore, BookCheck } from 'lucide-react';
import { useAuthContext } from '@/app/(auth)/context';
import { ResponsiveDrawerDialog } from '@/app/components/modals/responsivedrawer';



export const Detail = () => {
    // const [datas, setDatas] = useState<UploodModel[]>([])
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const { getSupervisors, supervisors } = useAuthContext()


    useEffect(() => {
        getSupervisors("Educational Technology")
        console.log(supervisors)

    }, [])

    const handleUpdate = (user: UploodModel) => {
        setDrawerOpen(!isDrawerOpen);

    };

    const handleDelete = (user: UploodModel) => {
        alert("Deleted Successfully!")

    };

    const handleView = (value: any) => {
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

            {/* <div className="py-10">
                <TableComponent
                    columns={createColumns}
                    data={supervisors}
                    onEdit={handleUpdate}
                    onDelete={handleDelete}
                    onView={handleView}
                    open={isDrawerOpen}
                    onDismiss={handleClose}
                    onOpen={handleCreateNewMember}
                    title="Upload Research Document
                    "
                    description="This support Doc / Pft / Image / sheet and others!">
                    <div>
                        <h4> Supervisor Name:</h4>
                    </div>
                </TableComponent>
            </div> */}

            jjj
        </div>
    )
}
