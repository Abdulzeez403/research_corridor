'use client'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import FileImage from "../../../../../public/pdf.jpg"
import Image from 'next/image'
import { Button } from '@/components/ui/button';
import { X } from "lucide-react"
import { useValidationRequests } from '../context';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';
import { ResponsiveDrawerDialog } from '@/app/components/modals/responsivedrawer';
import CommentForm from '../commentForm';


function VeiwPage() {
    const urlPath = usePathname();
    const id = urlPath.split('/')[3];
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const handleClose = () => setDrawerOpen(false);
    const handleOpen = () => setDrawerOpen(true);


    const { fetchValidationRequestById, validationRequest,
    } = useValidationRequests()

    useEffect(() => {
        fetchValidationRequestById(id)

    }, [])


    const [viewdoc, setViewdoc] = useState(false);
    const documents = validationRequest?.document ? [{ uri: validationRequest.document }] : [];
    return (

        <div>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/researcher/upload">Validation</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/components">Document</BreadcrumbLink>
                    </BreadcrumbItem>

                </BreadcrumbList>
            </Breadcrumb>


            <div>

                <Button onClick={() => handleOpen()} className='flex justify-end'>Comment</Button>
                <div style={{ height: '100vh', width: '100%', padding: '20px', boxSizing: 'border-box' }}>
                    <DocViewer
                        documents={documents}
                        pluginRenderers={DocViewerRenderers}
                        style={{ width: '100%', height: '100%' }}
                    />
                </div>

            </div>

            <ResponsiveDrawerDialog
                title="Create a Comment"
                description="Comment on the progress of the work"
                isOpen={isDrawerOpen}
                onClose={handleClose}
            >
                <CommentForm />
            </ResponsiveDrawerDialog>


        </div>
    )

}

export default VeiwPage; 