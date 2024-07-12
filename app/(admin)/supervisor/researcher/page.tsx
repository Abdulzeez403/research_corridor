"use client"
import React, { useEffect, useState } from 'react'
import { TableComponent } from './table/datatable'
import { useResearchers } from './context';
import { columns } from './column';



export default function Page() {

    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const { researchers, getResearchers } = useResearchers()

    useEffect(() => {
        getResearchers()
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
            data={researchers}
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
