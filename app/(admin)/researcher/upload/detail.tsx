
"use client"
import { UploodModel } from '@/constant/models';
import React, { useEffect, useState } from 'react'
import { columns } from "./column";
import { TableComponent } from './table/datatable';
import CardComponent from '@/app/components/card/index';
import { UsersRound, MessageCircleMore, BookCheck } from 'lucide-react';
import FileUploadForm from './form/index';
import { useDocumentContext } from './context';


function UploadDocumentDetail() {
    // const [datas, setDatas] = useState<UploodModel[]>([])
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const { fetchDocuments, documents, deleteDoc } = useDocumentContext();


    useEffect(() => {
        fetchDocuments();
        console.log(documents)
    }, [])

    const handleUpdate = (user: UploodModel) => {
        setDrawerOpen(!isDrawerOpen);

    };

    const handleDelete = (value: any) => {
        deleteDoc(value?._id)
        console.log(value?._id, "delete!")

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
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3  pt-5 pb-4">
                    <CardComponent
                        title="Uploaded Document"
                        total={documents.length}
                        subtitle="Total number of all document"
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
                    <FileUploadForm />
                </TableComponent>
            </div>
        </div>
    )
}

export default UploadDocumentDetail