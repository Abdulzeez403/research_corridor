'use client'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import FileImage from "../../../../../public/pdf.jpg"
import Image from 'next/image'
import PdfViewer from './pdfView';
import { Button } from '@/components/ui/button';
import DocViewerComponent from '@/app/components/docView';
import { X } from "lucide-react"
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';
import { useDocumentContext } from '../context';
import { useResearcherProfile } from '../../profile/context';
import Link from 'next/link';
import { CommentTableComponent } from './commets';


function VeiwPage() {
    const urlPath = usePathname();
    const id = urlPath.split('/')[3];

    const { getResearch, document } = useDocumentContext();
    const { profile } = useResearcherProfile();
    useEffect(() => {
        getResearch(id)
        console.log(id)
    }, [])


    const isPDF = document?.document?.endsWith('.pdf');


    const [viewdoc, setViewdoc] = useState(false);
    const documents = document?.document ? [{ uri: document.document }] : [];
    return (

        <div>


            {
                viewdoc ? (
                    <div>
                        {/* <PdfViewer fileUrl={fileUrl} /> */}
                        <div className="flex-end bg-red-400 border-2 rounded-lg w-6 h-6 " onClick={() => setViewdoc(false)}>
                            <h4 className="text-center">X</h4>
                        </div>

                        {/* <DocViewerComponent /> */}

                        <div style={{ height: '100vh', width: '100%', padding: '20px', boxSizing: 'border-box' }}>
                            <DocViewer
                                documents={documents}
                                pluginRenderers={DocViewerRenderers}
                                style={{ width: '100%', height: '100%' }}
                            />
                        </div>

                    </div>

                ) : (
                    <div className='flex justify-between pt-5'>
                        <div className="flex gap-x-10">
                            <Image src={FileImage}
                                alt="UserImage"
                                width={300} height={300}
                                className="rounded-lg border-2" />
                            <div >

                                <div className=''>
                                    <h4 >
                                        <span className="font-bold text-md">File Name:</span>{document?.title}</h4>
                                    <h4 >
                                        <span className="font-bold text-md">Supervisor:</span> {profile?.supervisor}</h4>
                                    <h4 >
                                        <span className="font-bold text-md">Status</span> {document?.status} </h4>

                                    <h4 >
                                        <span className="font-bold text-md ">Comments</span>5</h4>
                                </div>

                                <div>

                                </div>
                            </div>

                        </div>

                        <div className="flex gap-x-4">
                            <div>
                                {isPDF ? (
                                    <Button className="bg-red-400">
                                        <Link href={document?.document as any}>
                                            View
                                        </Link>
                                    </Button>
                                ) : (
                                    <Button className="bg-red-400"
                                        onClick={() => setViewdoc(true)}
                                    >
                                        View
                                    </Button>
                                )}
                            </div>

                        </div>


                    </div>)
            }
            <CommentTableComponent comments={document.comments} />
        </div>
    )

}

export default VeiwPage; 