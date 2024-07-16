"use client"
import React, { useEffect, useState } from 'react'
import { TableComponent } from './table/datatable'
import { columns } from './column';
import { useResearchers } from '../researcher/context';
import { useGrades } from './context';



export default function Page() {

    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const { fetchAllGrades, grades } = useGrades()

    useEffect(() => {

        fetchAllGrades('2023-2024');
        console.log(grades)


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
            data={grades}
            onView={handleView}
            open={isDrawerOpen}
            onDismiss={handleClose}
            onOpen={handleCreateNewMember}
            title="Upload Research Document"
            description="This support Doc / Pft / Image / sheet and others!">
            <div>
                research infor..
            </div>
        </TableComponent>


    )
}
